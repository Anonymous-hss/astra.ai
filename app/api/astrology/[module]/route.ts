import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { moduleQuestions, chats, subscriptions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { generateAstrologyResponse } from "@/lib/ai";

export async function POST(
  request: NextRequest,
  { params }: { params: { module: string } }
) {
  try {
    const { module } = params;

    // Validate module
    const validModules = [
      "kundli",
      "relationship",
      "career",
      "compatibility",
      "business",
      "gemstone",
    ];
    if (!validModules.includes(module)) {
      return NextResponse.json({ error: "Invalid module" }, { status: 400 });
    }

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, birthDetails } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Check if user has a premium subscription
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id));

    const isPremium =
      subscription &&
      (subscription.plan === "premium" || subscription.plan === "annual");

    // If not premium, check if user has questions remaining
    if (!isPremium) {
      const [moduleQuestion] = await db
        .select()
        .from(moduleQuestions)
        .where(
          and(
            eq(moduleQuestions.userId, user.id),
            eq(moduleQuestions.module, module)
          )
        );

      if (!moduleQuestion || moduleQuestion.questionsRemaining <= 0) {
        return NextResponse.json(
          {
            error: "No questions remaining",
            paymentRequired: true,
          },
          { status: 402 }
        );
      }

      // Decrement questions remaining
      await db
        .update(moduleQuestions)
        .set({
          questionsRemaining: moduleQuestion.questionsRemaining - 1,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(moduleQuestions.userId, user.id),
            eq(moduleQuestions.module, module)
          )
        );
    }

    // Generate AI response
    const userBirthDetails = {
      name: user.name,
      birthDate: birthDetails?.dateOfBirth || user.birthDate,
      birthTime: birthDetails?.timeOfBirth || user.birthTime,
      birthPlace: birthDetails?.placeOfBirth || user.birthPlace,
      gender: birthDetails?.gender || user.gender,
    };

    const aiResponse = await generateAstrologyResponse(
      module,
      question,
      userBirthDetails
    );

    // Save chat
    await db.insert(chats).values({
      userId: user.id,
      module,
      question,
      answer: aiResponse,
    });

    // Get updated questions remaining
    const [updatedModuleQuestion] = await db
      .select()
      .from(moduleQuestions)
      .where(
        and(
          eq(moduleQuestions.userId, user.id),
          eq(moduleQuestions.module, module)
        )
      );

    return NextResponse.json({
      success: true,
      response: aiResponse,
      questionsRemaining: isPremium
        ? "unlimited"
        : updatedModuleQuestion.questionsRemaining,
    });
  } catch (error) {
    console.error("Error processing astrology question:", error);
    return NextResponse.json(
      { error: "Failed to process question" },
      { status: 500 }
    );
  }
}
