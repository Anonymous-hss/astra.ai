"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CreditCard, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleFlow, CosmicCard } from "@/components/ui/cosmic-elements";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  moduleTitle: string;
  moduleId: string;
}

export function PaymentModal({
  open,
  onOpenChange,
  onSuccess,
  moduleTitle,
  moduleId,
}: PaymentModalProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    "select" | "processing" | "success"
  >("select");

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStep("processing");

    try {
      // Create order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module: moduleId, plan: "single" }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      // In a real app, you would integrate with Razorpay here
      // For now, we'll simulate a successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Verify payment
      const verifyResponse = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id:
            "pay_" + Math.random().toString(36).substring(2, 15),
          razorpay_order_id: orderData.order.id,
          razorpay_signature:
            "signature_" + Math.random().toString(36).substring(2, 15),
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || "Failed to verify payment");
      }

      setPaymentStep("success");

      // Show success animation before closing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Payment successful",
        description: "You now have unlimited questions for this module.",
      });

      onSuccess();
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        variant: "destructive",
        title: "Payment failed",
        description:
          error.message ||
          "There was an error processing your payment. Please try again.",
      });
      setPaymentStep("select");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] cosmic-glass">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <ParticleFlow className="opacity-20" />
        </div>
        <DialogHeader className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="font-cosmic gradient-text flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-400 animate-twinkling" />
              Unlock Celestial Insights
            </DialogTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <DialogDescription className="text-slate-300">
              You've used all your free questions for {moduleTitle}. Upgrade to
              continue your cosmic journey.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <div className="space-y-4 relative z-10">
          <AnimatePresence mode="wait">
            {paymentStep === "select" && (
              <motion.div
                key="payment-select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <CosmicCard className="border-purple-600/20 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                  <CardHeader className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-b border-purple-700/20">
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-purple-400 animate-twinkling" />
                      <CardTitle className="font-cosmic gradient-text">
                        Premium Access
                      </CardTitle>
                    </div>
                    <CardDescription className="text-slate-300">
                      Unlimited cosmic guidance for {moduleTitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="mr-2 h-5 w-5 rounded-full bg-purple-900/50 flex items-center justify-center">
                          <Check className="h-3 w-3 text-purple-400" />
                        </div>
                        <span className="text-sm text-slate-300">
                          Unlimited celestial questions
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-2 h-5 w-5 rounded-full bg-purple-900/50 flex items-center justify-center">
                          <Check className="h-3 w-3 text-purple-400" />
                        </div>
                        <span className="text-sm text-slate-300">
                          Detailed astrological insights
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-2 h-5 w-5 rounded-full bg-purple-900/50 flex items-center justify-center">
                          <Check className="h-3 w-3 text-purple-400" />
                        </div>
                        <span className="text-sm text-slate-300">
                          Personalized cosmic recommendations
                        </span>
                      </li>
                      <li className="flex items-center">
                        <div className="mr-2 h-5 w-5 rounded-full bg-purple-900/50 flex items-center justify-center">
                          <Check className="h-3 w-3 text-purple-400" />
                        </div>
                        <span className="text-sm text-slate-300">
                          Access to premium planetary content
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-indigo-950/50 border-t border-indigo-800/30">
                    <div className="text-2xl font-cosmic gradient-text">
                      ₹499
                    </div>
                    <div className="text-sm text-slate-400">
                      One-time payment
                    </div>
                  </CardFooter>
                </CosmicCard>
              </motion.div>
            )}

            {paymentStep === "processing" && (
              <motion.div
                key="payment-processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-ping"></div>
                  <Loader2 className="h-12 w-12 animate-spin text-purple-400 relative z-10" />
                </div>
                <h3 className="text-xl font-cosmic gradient-text mb-2">
                  Processing Payment
                </h3>
                <p className="text-slate-300 text-center">
                  Please wait while we connect with the cosmic energies...
                </p>
              </motion.div>
            )}

            {paymentStep === "success" && (
              <motion.div
                key="payment-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  className="relative mb-4 h-16 w-16 rounded-full bg-purple-900/30 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-purple-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Check className="h-8 w-8 text-purple-400 stroke-[3]" />
                  </motion.div>
                </motion.div>
                <motion.h3
                  className="text-xl font-cosmic gradient-text mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  Payment Successful
                </motion.h3>
                <motion.p
                  className="text-slate-300 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  Your cosmic journey has been upgraded!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="relative z-10">
          {paymentStep === "select" && (
            <>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-purple-900/30 text-slate-300 hover:bg-purple-900/20 hover:text-purple-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="cosmic-button"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₹499
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
