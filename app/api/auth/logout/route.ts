import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, destroySession, sessionCookieOptions } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  destroySession(request.cookies.get(SESSION_COOKIE)?.value);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(Date.now()), expires: new Date(0) });
  return response;
}
