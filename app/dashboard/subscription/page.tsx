"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  Star,
  Clock,
  Calendar,
  ArrowRight,
  Shield,
} from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface UserSubscription {
  plan: string;
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export default function SubscriptionPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userSubscription, setUserSubscription] =
    useState<UserSubscription | null>(null);

  // Fetch user subscription data
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setUserSubscription({
        plan: "free",
        status: "active",
        currentPeriodEnd: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        cancelAtPeriodEnd: false,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "",
      description: "Start your astrological journey",
      features: [
        "3 free questions per module",
        "Basic birth chart analysis",
        "Access to all modules",
        "24/7 availability",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹499",
      period: "per month",
      description: "Comprehensive astrological guidance",
      features: [
        "Unlimited questions across all modules",
        "Detailed birth chart analysis",
        "Personalized remedies and suggestions",
        "Priority support",
        "Custom question support",
        "Downloadable reports",
      ],
      popular: true,
    },
    {
      id: "annual",
      name: "Annual",
      price: "₹4,999",
      period: "per year",
      description: "Save ₹1,989 with annual billing",
      features: [
        "All Premium features",
        "Yearly forecast reports",
        "Muhurat timing recommendations",
        "Exclusive webinars and content",
        "Family chart analysis (up to 3 members)",
      ],
      popular: false,
    },
  ];

  const handleUpgrade = (planId: string) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription updated",
        description: `You have successfully upgraded to the ${planId} plan.`,
      });
      setUserSubscription({
        plan: planId,
        status: "active",
        currentPeriodEnd: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        cancelAtPeriodEnd: false,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleCancelSubscription = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription cancelled",
        description:
          "Your subscription will end at the current billing period.",
      });
      setUserSubscription({
        ...userSubscription!,
        cancelAtPeriodEnd: true,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleResumeSubscription = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription resumed",
        description:
          "Your subscription will continue after the current billing period.",
      });
      setUserSubscription({
        ...userSubscription!,
        cancelAtPeriodEnd: false,
      });
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cosmic-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-50"></div>
          </div>
          <p className="mt-4 text-cosmic-primary-400">
            Loading Subscription...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-cosmic tracking-wide gradient-text flex items-center">
          <CreditCard className="w-6 h-6 mr-2" />
          Subscription
        </h2>
        <p className="text-slate-300">
          Manage your subscription plan and billing information.
        </p>
      </motion.div>

      {userSubscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="cosmic-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-cosmic text-slate-200">
                  Current Plan
                </CardTitle>
                <Badge
                  variant={
                    userSubscription.plan === "free" ? "outline" : "default"
                  }
                  className={
                    userSubscription.plan === "free"
                      ? "border-cosmic-primary-500 text-cosmic-primary-400"
                      : "bg-cosmic-primary-600 text-white"
                  }
                >
                  {userSubscription.plan.charAt(0).toUpperCase() +
                    userSubscription.plan.slice(1)}
                </Badge>
              </div>
              <CardDescription className="text-slate-400">
                Your current subscription details and status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border border-cosmic-primary-700/20 rounded-lg bg-cosmic-dark-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-cosmic-primary-400" />
                    <h4 className="text-slate-200 font-medium">Plan</h4>
                  </div>
                  <p className="text-slate-300">
                    {userSubscription.plan === "free"
                      ? "Free Plan"
                      : userSubscription.plan === "premium"
                      ? "Premium Monthly"
                      : "Premium Annual"}
                  </p>
                </div>

                <div className="p-4 border border-cosmic-primary-700/20 rounded-lg bg-cosmic-dark-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-cosmic-primary-400" />
                    <h4 className="text-slate-200 font-medium">Status</h4>
                  </div>
                  <p className="text-slate-300">
                    {userSubscription.status.charAt(0).toUpperCase() +
                      userSubscription.status.slice(1)}
                    {userSubscription.cancelAtPeriodEnd && " (Cancels soon)"}
                  </p>
                </div>

                <div className="p-4 border border-cosmic-primary-700/20 rounded-lg bg-cosmic-dark-200/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-cosmic-primary-400" />
                    <h4 className="text-slate-200 font-medium">Next Billing</h4>
                  </div>
                  <p className="text-slate-300">
                    {userSubscription.plan === "free"
                      ? "Not applicable"
                      : new Date(
                          userSubscription.currentPeriodEnd
                        ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {userSubscription.plan !== "free" && (
                <div className="pt-4">
                  {userSubscription.cancelAtPeriodEnd ? (
                    <div className="flex flex-col space-y-4">
                      <div className="p-4 border border-cosmic-primary-700/20 rounded-lg bg-cosmic-dark-200/50">
                        <p className="text-slate-300 mb-2">
                          Your subscription will end on{" "}
                          {new Date(
                            userSubscription.currentPeriodEnd
                          ).toLocaleDateString()}
                          .
                        </p>
                        <Button
                          onClick={handleResumeSubscription}
                          className="cosmic-button"
                          disabled={isLoading}
                        >
                          Resume Subscription
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={handleCancelSubscription}
                        className="border-cosmic-primary-700/20 text-slate-300"
                        disabled={isLoading}
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="pt-4">
        <h3 className="text-xl font-cosmic text-cosmic-primary-400 mb-4">
          Available Plans
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 z-10">
                  <Badge className="bg-cosmic-primary-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card
                className={`cosmic-card h-full flex flex-col ${
                  plan.popular ? "border-cosmic-primary-500/50" : ""
                } ${
                  userSubscription?.plan === plan.id
                    ? "ring-2 ring-cosmic-primary-500"
                    : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="font-cosmic text-slate-200">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-cosmic-primary-400">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-1 text-sm text-slate-400">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-slate-400">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-cosmic-primary-400 mr-2 shrink-0" />
                        <span className="text-sm text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {userSubscription?.plan === plan.id ? (
                    <Button
                      className="w-full border-cosmic-primary-700/20 text-slate-300"
                      variant="outline"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "cosmic-button"
                          : "border-cosmic-primary-700/20 text-slate-300 hover:bg-cosmic-primary-700/20 hover:text-cosmic-primary-300"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isLoading}
                    >
                      {plan.id === "free"
                        ? "Current Plan"
                        : userSubscription?.plan === "free"
                        ? `Upgrade to ${plan.name}`
                        : `Switch to ${plan.name}`}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="cosmic-card mt-8">
          <CardHeader>
            <CardTitle className="font-cosmic text-slate-200 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-cosmic-primary-400" />
              Payment Security
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your payment information is secure and encrypted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cosmic-primary-700/20">
                  <Shield className="h-6 w-6 text-cosmic-primary-400" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">
                    Secure Payments
                  </h4>
                  <p className="text-sm text-slate-400">
                    All payments are processed securely through our payment
                    provider.
                  </p>
                </div>
              </div>

              <div className="cosmic-divider" />

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cosmic-primary-700/20">
                  <CreditCard className="h-6 w-6 text-cosmic-primary-400" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">
                    Payment Methods
                  </h4>
                  <p className="text-sm text-slate-400">
                    We accept all major credit cards, debit cards, and UPI
                    payments.
                  </p>
                </div>
              </div>

              <div className="cosmic-divider" />

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cosmic-primary-700/20">
                  <ArrowRight className="h-6 w-6 text-cosmic-primary-400" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">Refund Policy</h4>
                  <p className="text-sm text-slate-400">
                    If you're not satisfied with your subscription, contact us
                    within 7 days for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
