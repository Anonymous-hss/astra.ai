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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChatModal } from "@/components/dashboard/chat-modal";
import { PaymentModal } from "@/components/dashboard/payment-modal";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  CosmicOrb,
  CosmicRing,
  CareerIcon,
} from "@/components/ui/cosmic-elements";
import { BarChart3, CalendarDays, Star, TrendingUp } from "lucide-react";

const careerSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
  careerField: z.string().min(1, {
    message: "Career field is required",
  }),
  currentSituation: z.string().optional(),
});

export default function CareerPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("consult");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(3);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  // Fetch user's module questions status
  useEffect(() => {
    async function fetchQuestionsStatus() {
      try {
        const response = await fetch("/api/user/questions");

        if (response.ok) {
          const data = await response.json();
          const moduleStatus = data.modules?.career;

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

  const form = useForm<z.infer<typeof careerSchema>>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      question: "",
      careerField: "",
      currentSituation: "",
    },
  });

  const handleAskQuestion = (predefinedQuestion?: string) => {
    if (predefinedQuestion) {
      setSelectedQuestion(predefinedQuestion);
    }

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
    setSelectedQuestion("");

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

  const careerAnalysisCards = [
    {
      title: "Planetary Strengths",
      icon: Star,
      description:
        "Discover which planets in your birth chart support career success and which areas they influence.",
      buttonText: "Analyze My Planets",
      question:
        "Which planets in my chart support my career growth and how can I leverage them?",
    },
    {
      title: "Career Timeline",
      icon: CalendarDays,
      description:
        "See potential career milestones and important timing for major career decisions based on planetary transits.",
      buttonText: "View My Timeline",
      question:
        "What does my career timeline look like for the next 2 years based on planetary transits?",
    },
    {
      title: "Growth Opportunities",
      icon: TrendingUp,
      description:
        "Identify areas of potential career advancement and the skills you should develop according to your chart.",
      buttonText: "Find Opportunities",
      question:
        "What career growth opportunities should I focus on according to my astrological chart?",
    },
    {
      title: "Career Compatibility",
      icon: BarChart3,
      description:
        "Learn which career fields and work environments are most aligned with your astrological profile.",
      buttonText: "Check Compatibility",
      question:
        "Which career fields and work environments are most compatible with my astrological profile?",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h2 className="text-2xl font-cosmic tracking-wide gradient-text flex items-center">
            <CareerIcon className="w-8 h-8 mr-2" />
            Career Guruji
          </h2>
          <p className="text-slate-300">
            Navigate your professional path with celestial guidance and discover
            your cosmic career potential.
          </p>
        </motion.div>
        <div className="absolute top-0 right-0 -translate-y-1/4 opacity-30 pointer-events-none">
          <CosmicOrb size={120} color="blue" />
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10"
      >
        <TabsList className="grid w-full grid-cols-2 bg-indigo-950/50 p-1">
          <TabsTrigger
            value="consult"
            className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-200 text-slate-300"
          >
            Career Consultation
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-blue-900/50 data-[state=active]:text-blue-200 text-slate-300"
          >
            Career Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consult" className="space-y-4 mt-6">
          <Card className="cosmic-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-b border-blue-700/20">
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <CareerIcon className="w-5 h-5 mr-2" />
                Career Consultation
              </CardTitle>
              <CardDescription className="text-slate-400">
                Seek guidance about your professional life, career transitions,
                and work challenges.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="careerField"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Current or Desired Career Field
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="cosmic-input text-slate-300">
                              <SelectValue placeholder="Select career field" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="cosmic-glass">
                            <SelectItem
                              value="technology"
                              className="text-slate-300"
                            >
                              Technology
                            </SelectItem>
                            <SelectItem
                              value="healthcare"
                              className="text-slate-300"
                            >
                              Healthcare
                            </SelectItem>
                            <SelectItem
                              value="finance"
                              className="text-slate-300"
                            >
                              Finance
                            </SelectItem>
                            <SelectItem
                              value="education"
                              className="text-slate-300"
                            >
                              Education
                            </SelectItem>
                            <SelectItem
                              value="creative"
                              className="text-slate-300"
                            >
                              Creative Arts
                            </SelectItem>
                            <SelectItem
                              value="business"
                              className="text-slate-300"
                            >
                              Business
                            </SelectItem>
                            <SelectItem
                              value="science"
                              className="text-slate-300"
                            >
                              Science & Research
                            </SelectItem>
                            <SelectItem
                              value="service"
                              className="text-slate-300"
                            >
                              Service Industry
                            </SelectItem>
                            <SelectItem
                              value="other"
                              className="text-slate-300"
                            >
                              Other
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-slate-400">
                          Select your current field or area you're interested
                          in.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentSituation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Current Situation (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g., job hunting, considering promotion, career change..."
                            {...field}
                            className="cosmic-input text-slate-300"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Briefly describe your current career situation or
                          challenge.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Your Career Question
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your career-related question here..."
                            {...field}
                            className="cosmic-input text-slate-300 min-h-[100px]"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Be specific about what you'd like to know about your
                          career path.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-slate-400">
                      {isPremium ||
                      questionsRemaining === Number.POSITIVE_INFINITY
                        ? "You have unlimited questions."
                        : `${questionsRemaining} free questions remaining.`}
                    </div>
                    <Button
                      type="button"
                      onClick={() =>
                        handleAskQuestion(form.getValues().question)
                      }
                      className="cosmic-button"
                    >
                      Submit Question
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="relative overflow-hidden">
            <Card className="cosmic-card">
              <CardHeader>
                <CardTitle className="font-cosmic text-slate-200 text-lg">
                  Popular Career Questions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Common questions our users ask about their professional
                  journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "When is the best time for a career change according to my chart?",
                  "Which career path aligns best with my planetary positions?",
                  "How can I improve my work relationships based on my birth chart?",
                  "What skills should I develop according to my astrological profile?",
                  "Is my current career path aligned with my soul's purpose?",
                ].map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-slate-300 hover:text-blue-300 hover:bg-blue-900/20"
                      onClick={() => handleAskQuestion(question)}
                    >
                      <span className="line-clamp-1">{question}</span>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
            <div className="absolute -bottom-16 -right-16 opacity-20 pointer-events-none">
              <CosmicRing size={180} color="blue" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {careerAnalysisCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="cosmic-card h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-blue-900/30 border border-blue-700/30">
                        <card.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <CardTitle className="font-cosmic text-slate-200 text-lg">
                        {card.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-slate-300 text-sm">{card.description}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      className="w-full cosmic-button bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800"
                      onClick={() => handleAskQuestion(card.question)}
                    >
                      {card.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6"
          >
            <Card className="cosmic-card">
              <CardHeader className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-b border-blue-700/20">
                <CardTitle className="font-cosmic text-slate-200">
                  Celestial Career Insight
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Planetary influences on different career aspects
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 border border-blue-800/30 rounded-lg bg-blue-950/20">
                      <div className="text-xs text-slate-400">Mercury</div>
                      <div className="font-cosmic text-blue-300 text-lg">
                        Communication
                      </div>
                    </div>
                    <div className="p-3 border border-indigo-800/30 rounded-lg bg-indigo-950/20">
                      <div className="text-xs text-slate-400">Jupiter</div>
                      <div className="font-cosmic text-indigo-300 text-lg">
                        Expansion
                      </div>
                    </div>
                    <div className="p-3 border border-purple-800/30 rounded-lg bg-purple-950/20">
                      <div className="text-xs text-slate-400">Saturn</div>
                      <div className="font-cosmic text-purple-300 text-lg">
                        Structure
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300">
                    Your career is influenced by multiple planetary energies.
                    Mercury governs communication and intellectual skills,
                    Jupiter expands opportunities and growth, while Saturn
                    provides discipline and long-term success. Understanding
                    these influences can help you navigate your professional
                    path more effectively.
                  </p>

                  <Button
                    className="w-full cosmic-button"
                    onClick={() =>
                      handleAskQuestion(
                        "How are Mercury, Jupiter, and Saturn currently influencing my career path?"
                      )
                    }
                  >
                    Get My Personal Career Reading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <ChatModal
        open={isChatModalOpen}
        onOpenChange={setIsChatModalOpen}
        onSubmit={handleQuestionSubmitted}
        moduleTitle="Career Guruji"
        moduleId="career"
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        moduleTitle="Career Guruji"
        moduleId="career"
      />
    </div>
  );
}
