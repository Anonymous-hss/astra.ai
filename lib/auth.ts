import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession, setSession, deleteSession } from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// Session cookie name
const SESSION_COOKIE_NAME = "jyotish_session";

// Create a new session for a user
export async function createSession(userId: number) {
  const sessionId = uuidv4();
  await setSession(userId, sessionId);

  // Set session cookie
  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return sessionId;
}

// Get the current user from the session
export async function getCurrentUser() {
  const sessionId = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const userId = await getSession(sessionId);

  if (!userId) {
    return null;
  }

  const [user] = await db.select().from(users).where(eq(users.id, userId));

  if (!user) {
    return null;
  }

  // Don't return the password
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

// Sign out the current user
export async function signOut() {
  const sessionId = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (sessionId) {
    await deleteSession(sessionId);
  }

  cookies().delete(SESSION_COOKIE_NAME);
}

// Hash a password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Compare a password with a hash
export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// Authentication middleware
export async function authMiddleware(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = await getSession(sessionId);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // No error, proceed
}
