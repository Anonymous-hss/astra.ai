import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session
    await createSession(user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
