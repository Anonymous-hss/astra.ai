import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { module, plan } = await request.json();

    // Validate module
    const validModules = [
      "kundli",
      "relationship",
      "career",
      "compatibility",
      "business",
      "gemstone",
      "all",
    ];
    if (!validModules.includes(module)) {
      return NextResponse.json({ error: "Invalid module" }, { status: 400 });
    }

    // Determine amount based on plan
    let amount = 499; // Default for single module

    if (plan === "premium") {
      amount = 499; // Monthly subscription
    } else if (plan === "annual") {
      amount = 4999; // Annual subscription
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Save payment record
    await db.insert(payments).values({
      userId: user.id,
      module,
      amount,
      status: "created",
      paymentId: order.id,
      paymentDetails: order,
    });

    return NextResponse.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating payment order:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
