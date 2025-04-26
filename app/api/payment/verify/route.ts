import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { payments, moduleQuestions, subscriptions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
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

    // Update payment record
    const [payment] = await db
      .update(payments)
      .set({
        status: "captured",
        paymentId: razorpay_payment_id,
        paymentDetails: {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      })
      .where(
        and(
          eq(payments.paymentId, razorpay_order_id),
          eq(payments.userId, user.id)
        )
      )
      .returning();

    if (!payment) {
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }

    if (payment.module === "all") {
      // Update subscription status
      const plan = payment.amount === 4999 ? "annual" : "premium";
      const endDate = new Date();

      if (plan === "annual") {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }

      await db
        .update(subscriptions)
        .set({
          plan,
          startDate: new Date(),
          endDate,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.userId, user.id));
    } else {
      // Reset questions for specific module
      await db
        .update(moduleQuestions)
        .set({
          questionsRemaining: 999, // Effectively unlimited
          isPremium: true,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(moduleQuestions.userId, user.id),
            eq(moduleQuestions.module, payment.module)
          )
        );
    }

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
