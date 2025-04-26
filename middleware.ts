import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/redis";

// Session cookie name
const SESSION_COOKIE_NAME = "jyotish_session";

// Paths that don't require authentication
const publicPaths = ["/", "/auth/signin", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    )
  ) {
    return NextResponse.next();
  }

  // Check if the path is an API route
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Get session ID from cookie
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // If no session ID, redirect to sign in
  if (!sessionId) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Verify session
  const userId = await getSession(sessionId);

  // If session is invalid, redirect to sign in
  if (!userId) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
