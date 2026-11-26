import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/workspace", "/en/workspace"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const guarded = PROTECTED.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  if (!guarded) return NextResponse.next();
  if (request.cookies.get("nexus_session")?.value) return NextResponse.next();

  const login = pathname.startsWith("/en") ? "/en/login" : "/login";
  const url = request.nextUrl.clone();
  url.pathname = login;
  url.search = `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/workspace", "/workspace/:path*", "/en/workspace", "/en/workspace/:path*"],
};
