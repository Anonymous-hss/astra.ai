import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createSession } from "@/lib/auth";
import { moduleQuestions, subscriptions } from "@/lib/db/schema";

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
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id });

    // Initialize module questions (3 free questions per module)
    const modules = [
      "kundli",
      "relationship",
      "career",
      "compatibility",
      "business",
      "gemstone",
    ];

    for (const module of modules) {
      await db.insert(moduleQuestions).values({
        userId: newUser.id,
        module,
        questionsRemaining: 3,
      });
    }

    // Create free subscription
    await db.insert(subscriptions).values({
      userId: newUser.id,
      plan: "free",
      isActive: true,
    });

    // Create session
    await createSession(newUser.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
