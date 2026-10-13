import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LICENSE_COOKIE = "zdr_license";
const ADMIN_SESSION_COOKIE = "zdr_admin_session";
const USER_SESSION_COOKIE = "zdr_session";
const BYPASS_PATHS = [
  "/admin/login",
  "/api/admin/login",
  "/api/admin/logout",
  "/api/auth/login",
  "/api/auth/logout",
  "/license-check",
  "/api/license/check",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/instagram",
  // Statik medya varlıkları: Next image optimizer kaynak görseli sunucu-içi
  // cookie'siz çeker; duvara takılırsa optimizer 500 döner ve görseller kırık
  // görünür. Bu alt dizinler yalnızca medya içerir, korumalı HTML sayfası değil.
  "/images/",
  "/uploads/",
  "/videos/",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass paths
  if (BYPASS_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check license cookie OR admin session cookie OR user session cookie
  const licenseCookie = request.cookies.get(LICENSE_COOKIE);
  const adminSessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);
  const userSessionCookie = request.cookies.get(USER_SESSION_COOKIE);
  if ((!licenseCookie || !licenseCookie.value) && 
      (!adminSessionCookie || !adminSessionCookie.value) && 
      (!userSessionCookie || !userSessionCookie.value)) {
    return NextResponse.redirect(new URL("/license-check", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - but we handle license check API specifically above
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
