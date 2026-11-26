import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { getDb, type UserRow } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/passwords";

export const SESSION_COOKIE = "nexus_session";
const SESSION_DAYS = 14;

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  plan: string;
};

export type AuthProviderName = "password" | "google" | "github";

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("base64url");
}

function sessionSecretPepper() {
  return process.env.SESSION_SECRET || "dev-only-change-me";
}

export function toPublicUser(user: UserRow): PublicUser {
  return { id: user.id, email: user.email, name: user.name, plan: user.plan };
}

export async function createUser(input: { email: string; password: string; name: string }) {
  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(input.email.toLowerCase());
  if (existing) return { error: "email_taken" as const };
  const id = randomUUID();
  const passwordHash = await hashPassword(input.password);
  db.prepare(
    `INSERT INTO users (id, email, password_hash, name, provider, provider_id, plan, created_at)
     VALUES (?, ?, ?, ?, 'password', NULL, 'starter', ?)`,
  ).run(id, input.email.toLowerCase(), passwordHash, input.name, Date.now());
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow;
  return { user };
}

export async function authenticatePassword(email: string, password: string) {
  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase()) as UserRow | undefined;
  const stored = user?.password_hash;
  const valid = stored ? await verifyPassword(password, stored) : await verifyPassword(password, await hashPassword("not-a-user"));
  if (!user || !user.password_hash || !valid) return null;
  return user;
}

export function createSession(userId: string) {
  const db = getDb();
  const raw = randomBytes(32).toString("base64url");
  const id = randomUUID();
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  db.prepare(
    "INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)",
  ).run(id, userId, tokenHash(`${sessionSecretPepper()}:${raw}`), expires, Date.now());
  return { token: raw, expires };
}

export function readSession(token: string | undefined | null) {
  if (!token) return null;
  const db = getDb();
  const row = db
    .prepare(
      `SELECT users.* FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = ? AND sessions.expires_at > ?`,
    )
    .get(tokenHash(`${sessionSecretPepper()}:${token}`), Date.now()) as UserRow | undefined;
  return row ?? null;
}

export function destroySession(token: string | undefined | null) {
  if (!token) return;
  getDb().prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(`${sessionSecretPepper()}:${token}`));
}

export function sessionCookieOptions(expires: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expires),
  };
}

export async function getSessionUser() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = readSession(token);
  return user ? toPublicUser(user) : null;
}
