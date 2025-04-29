import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      await request.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Find and update payment record
    const payment = await prisma.payment.findFirst({
      where: {
        userId: user.id,
        paymentId: razorpay_order_id,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "captured",
        paymentId: razorpay_payment_id,
        paymentDetails: {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      },
    });

    // Use a transaction for updating subscription or module questions
    await prisma.$transaction(async (tx) => {
      if (payment.module === "all") {
        // Update subscription status
        const plan = payment.amount === 4999 ? "annual" : "premium";
        const endDate = new Date();

        if (plan === "annual") {
          endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
          endDate.setMonth(endDate.getMonth() + 1);
        }

        await tx.subscription.upsert({
          where: { userId: user.id },
          update: {
            plan,
            startDate: new Date(),
            endDate,
            isActive: true,
          },
          create: {
            userId: user.id,
            plan,
            startDate: new Date(),
            endDate,
            isActive: true,
          },
        });
      } else {
        // Update specific module premium status
        await tx.moduleQuestion.update({
          where: {
            userId_module: {
              userId: user.id,
              module: payment.module,
            },
          },
          data: {
            questionsRemaining: 999, // Effectively unlimited
            isPremium: true,
          },
        });
      }
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
