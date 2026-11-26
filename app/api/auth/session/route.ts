import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSession, toPublicUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = readSession(request.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ user: user ? toPublicUser(user) : null });
}
