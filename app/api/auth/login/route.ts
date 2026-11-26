import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, authenticatePassword, createSession, sessionCookieOptions, toPublicUser } from "@/lib/auth";
import { clientIp, jsonError, readJson } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { asObject, cleanString, isEmail, safeNextPath } from "@/lib/validation";

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
  const next = safeNextPath(body?.next, "/workspace");

  if (!isEmail(email) || password.length < 8 || password.length > 200) {
    return jsonError(400, "invalid_input", "Enter the email and password for your account.");
  }

  const user = await authenticatePassword(email, password);
  if (!user) return jsonError(401, "invalid_credentials", "Email or password is incorrect.");

  const session = createSession(user.id);
  const response = NextResponse.json({ user: toPublicUser(user), next });
  response.cookies.set(SESSION_COOKIE, session.token, sessionCookieOptions(session.expires));
  return response;
}
