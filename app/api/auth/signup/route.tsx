import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with transaction to ensure all related records are created
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // Initialize module questions (3 free questions per module)
      const modules = [
        "kundli",
        "relationship",
        "career",
        "compatibility",
        "business",
        "gemstone",
      ];

      await Promise.all(
        modules.map((module) =>
          tx.moduleQuestion.create({
            data: {
              userId: newUser.id,
              module,
              questionsRemaining: 3,
            },
          })
        )
      );

      // Create free subscription
      await tx.subscription.create({
        data: {
          userId: newUser.id,
          plan: "free",
          isActive: true,
        },
      });

      return newUser;
    });

    // Create session
    await createSession(user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
