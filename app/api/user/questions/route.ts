import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    const isPremium =
      subscription &&
      (subscription.plan === "premium" || subscription.plan === "annual");

    // Get questions remaining for each module
    const questions = await prisma.moduleQuestion.findMany({
      where: { userId: user.id },
    });

    // Format response
    const moduleStatus = questions.reduce((acc, question) => {
      acc[question.module] = {
        questionsRemaining: isPremium
          ? "unlimited"
          : question.questionsRemaining,
        isPremium: isPremium || question.isPremium,
      };
      return acc;
    }, {} as Record<string, { questionsRemaining: number | "unlimited"; isPremium: boolean }>);

    return NextResponse.json({
      subscription: {
        plan: subscription?.plan || "free",
        isActive: subscription?.isActive || false,
        endDate: subscription?.endDate,
      },
      modules: moduleStatus,
    });
  } catch (error) {
    console.error("Error fetching questions status:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions status" },
      { status: 500 }
    );
  }
}
