"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChatModal } from "@/components/dashboard/chat-modal";
import { PaymentModal } from "@/components/dashboard/payment-modal";
import { useToast } from "@/hooks/use-toast";

const birthDetailsSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  dateOfBirth: z.string().min(1, {
    message: "Date of birth is required.",
  }),
  timeOfBirth: z.string().min(1, {
    message: "Time of birth is required.",
  }),
  placeOfBirth: z.string().min(2, {
    message: "Place of birth is required.",
  }),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
});

export default function KundliPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("birth-details");
  const [birthDetailsSubmitted, setBirthDetailsSubmitted] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(3);
  const [isPremium, setIsPremium] = useState(false);

  // Fetch user's module questions status
  useEffect(() => {
    async function fetchQuestionsStatus() {
      try {
        const response = await fetch("/api/user/questions");

        if (response.ok) {
          const data = await response.json();
          const moduleStatus = data.modules?.kundli;

          if (moduleStatus) {
            setQuestionsRemaining(
              moduleStatus.questionsRemaining === "unlimited"
                ? Number.POSITIVE_INFINITY
                : moduleStatus.questionsRemaining
            );
            setIsPremium(moduleStatus.isPremium);
          }
        }
      } catch (error) {
        console.error("Error fetching questions status:", error);
      }
    }

    fetchQuestionsStatus();
  }, []);

  const form = useForm<z.infer<typeof birthDetailsSchema>>({
    resolver: zodResolver(birthDetailsSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      timeOfBirth: "",
      placeOfBirth: "",
      gender: "",
    },
  });

  async function onSubmit(values: z.infer<typeof birthDetailsSchema>) {
    try {
      // Update user profile with birth details
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthDate: values.dateOfBirth,
          birthTime: values.timeOfBirth,
          birthPlace: values.placeOfBirth,
          gender: values.gender,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save birth details");
      }

      setBirthDetailsSubmitted(true);
      setActiveTab("kundli-chart");

      toast({
        title: "Birth details saved",
        description: "Your birth details have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving birth details",
        description: error.message,
      });
    }
  }

  const handleAskQuestion = () => {
    if (questionsRemaining <= 0 && !isPremium) {
      setIsPaymentModalOpen(true);
    } else {
      setIsChatModalOpen(true);
    }
  };

  const handleQuestionSubmitted = () => {
    if (!isPremium && questionsRemaining !== Number.POSITIVE_INFINITY) {
      setQuestionsRemaining((prev) => prev - 1);
    }

    setIsChatModalOpen(false);

    toast({
      title: "Question submitted",
      description:
        isPremium || questionsRemaining === Number.POSITIVE_INFINITY
          ? "You have unlimited questions remaining."
          : `You have ${questionsRemaining - 1} free questions remaining.`,
    });
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsPremium(true);
    setQuestionsRemaining(Number.POSITIVE_INFINITY);
    setIsChatModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Kundli Maker Guruji
        </h2>
        <p className="text-muted-foreground">
          Generate your detailed birth chart and get personalized astrological
          readings.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="birth-details">Birth Details</TabsTrigger>
          <TabsTrigger value="kundli-chart" disabled={!birthDetailsSubmitted}>
            Kundli Chart
          </TabsTrigger>
        </TabsList>
        <TabsContent value="birth-details">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Birth Details</CardTitle>
              <CardDescription>
                Provide accurate birth information for precise astrological
                readings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timeOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time of Birth</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter time in 24-hour format if known.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="placeOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Place of Birth</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, State, Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Generate Kundli
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="kundli-chart">
          <Card>
            <CardHeader>
              <CardTitle>Your Kundli Chart</CardTitle>
              <CardDescription>
                Based on your birth details, here is your personalized Kundli
                chart.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                <div className="relative aspect-square w-full max-w-md border border-amber-200 rounded-lg p-4 bg-amber-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        Your Kundli chart will appear here
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-4">
                  <h3 className="text-lg font-medium">Ask Kundli Guruji</h3>
                  <p className="text-sm text-muted-foreground">
                    {isPremium ||
                    questionsRemaining === Number.POSITIVE_INFINITY
                      ? "You have unlimited questions. Ask about your birth chart, planetary positions, or get personalized astrological guidance."
                      : `You have ${questionsRemaining} free questions remaining. Ask about your birth chart, planetary positions, or get personalized astrological guidance.`}
                  </p>
                  <Button onClick={handleAskQuestion} className="w-full">
                    Ask a Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ChatModal
        open={isChatModalOpen}
        onOpenChange={setIsChatModalOpen}
        onSubmit={handleQuestionSubmitted}
        moduleTitle="Kundli Maker Guruji"
        moduleId="kundli"
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        moduleTitle="Kundli Maker Guruji"
        moduleId="kundli"
      />
    </div>
  );
}
