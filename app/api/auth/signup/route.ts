import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, createSession, createUser, sessionCookieOptions, toPublicUser } from "@/lib/auth";
import { jsonError, readJson } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { asObject, cleanString, isEmail, safeNextPath } from "@/lib/validation";
import { clientIp } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const limited = rateLimit(`auth:${clientIp(request)}`, 10);
  if (!limited.ok) {
    return jsonError(429, "rate_limited", "Too many attempts. Try again shortly.", {
      retryAfter: limited.retryAfter,
    });
  }

  const body = asObject(await readJson(request));
  const email = cleanString(body?.email, 254).toLowerCase();
  const password = typeof body?.password === "string" ? body.password : "";
  const name = cleanString(body?.name, 80);
  const next = safeNextPath(body?.next, "/workspace");

  if (!name || !isEmail(email) || password.length < 8 || password.length > 200) {
    return jsonError(400, "invalid_input", "Name, a valid email, and a password of at least 8 characters are required.");
  }

  const created = await createUser({ email, password, name });
  if ("error" in created) {
    return jsonError(409, "email_taken", "An account with this email already exists.");
  }

  const session = createSession(created.user.id);
  const response = NextResponse.json({ user: toPublicUser(created.user), next });
  response.cookies.set(SESSION_COOKIE, session.token, sessionCookieOptions(session.expires));
  return response;
}
