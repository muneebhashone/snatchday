// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")?.value;
  const pathname = request.nextUrl.pathname;

  let userData = null;
  if (userCookie) {
    try {
      userData = JSON.parse(userCookie);
    } catch {}
  }

  if (userData) {
    if (userData.role === "admin" && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (userData.role === "user" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    const publicPaths = ["/admin/login", "/forgot-password"];
    if (pathname.startsWith("/admin") && !publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
