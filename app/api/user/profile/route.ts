import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, birthDate, birthTime, birthPlace, gender } =
      await request.json();

    // Update user
    const [updatedUser] = await db
      .update(users)
      .set({
        name: name || user.name,
        birthDate: birthDate || user.birthDate,
        birthTime: birthTime || user.birthTime,
        birthPlace: birthPlace || user.birthPlace,
        gender: gender || user.gender,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    // Don't return the password
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
