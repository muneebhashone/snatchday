import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const Cookies = request?.cookies?.get("userData")?.value;
  const CookiesId = request?.cookies?.get("connect.sid")?.value;

  console.log(request.cookies, "Cookies");


  const pathname = request.nextUrl.pathname;

  let role = null;
  const isLoggedIn = CookiesId ? true : false;


  if (isLoggedIn) {
    try {
      role = JSON.parse(Cookies)?.role;
    } catch (err) {
      console.error("Failed to parse userData cookie:", err);
    }
  }

  const isLoginPage = pathname === "/login";
  const isAdminRoute = pathname.startsWith("/admin");

  // 1. Redirect logged-in admin away from login page
  if (isLoginPage && isLoggedIn && role === "admin") {
    return NextResponse.redirect(new URL("/admin/overview", request.url));
  }

  // 2. Redirect logged-in user away from login page
  if (isLoginPage && isLoggedIn && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Not logged in trying to access protected routes (except public routes)
//   if (!isLoggedIn && !isLoginPage) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

  // 4. Non-admin trying to access /admin
  if (role !== "admin" && isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
