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
  BusinessIcon,
} from "@/components/ui/cosmic-elements";
import {
  Building2,
  TrendingUp,
  BarChart3,
  Users,
  Calendar,
} from "lucide-react";

const businessSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessType: z.string().min(1, {
    message: "Business type is required",
  }),
  foundingDate: z.string().optional(),
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
});

export default function BusinessPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("consult");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(3);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's module questions status
  useEffect(() => {
    async function fetchQuestionsStatus() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/questions");

        if (response.ok) {
          const data = await response.json();
          const moduleStatus = data.modules?.business;

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
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestionsStatus();
  }, []);

  const form = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      foundingDate: "",
      question: "",
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

  const businessAnalysisCards = [
    {
      title: "Business Muhurat",
      icon: Calendar,
      description:
        "Find the most auspicious dates and times for important business decisions and launches.",
      buttonText: "Get Muhurat",
      question:
        "What are the most auspicious dates in the next month for launching a new product or service?",
    },
    {
      title: "Growth Forecast",
      icon: TrendingUp,
      description:
        "Discover potential growth periods and challenges for your business based on planetary positions.",
      buttonText: "View Forecast",
      question:
        "What does the astrological forecast predict for my business growth in the next quarter?",
    },
    {
      title: "Partnership Analysis",
      icon: Users,
      description:
        "Analyze compatibility with potential business partners or investors based on astrological factors.",
      buttonText: "Analyze Partnerships",
      question:
        "How can I identify compatible business partners based on astrological factors?",
    },
    {
      title: "Financial Timing",
      icon: BarChart3,
      description:
        "Identify favorable periods for investments, fundraising, and major financial decisions.",
      buttonText: "Check Timing",
      question:
        "When is the most favorable time in the next six months for seeking investment or funding?",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-cosmic-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-cosmic-primary-400">Loading...</p>
        </div>
      </div>
    );
  }

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
            <BusinessIcon className="w-8 h-8 mr-2" />
            Business Guruji
          </h2>
          <p className="text-slate-300">
            Navigate your business decisions with cosmic guidance and discover
            auspicious timings for success.
          </p>
        </motion.div>
        <div className="absolute top-0 right-0 -translate-y-1/4 opacity-30 pointer-events-none">
          <CosmicOrb size={120} color="primary" />
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10"
      >
        <TabsList className="grid w-full grid-cols-2 bg-cosmic-dark-300/50 p-1">
          <TabsTrigger
            value="consult"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-cosmic-primary-200 text-slate-300"
          >
            Business Consultation
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-cosmic-primary-200 text-slate-300"
          >
            Business Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consult" className="space-y-4 mt-6">
          <Card className="cosmic-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cosmic-primary-900/30 to-cosmic-dark-300/30 border-b border-cosmic-primary-700/20">
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <BusinessIcon className="w-5 h-5 mr-2" />
                Business Consultation
              </CardTitle>
              <CardDescription className="text-slate-400">
                Seek guidance about your business ventures, decisions, and
                growth strategies.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Business Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your business name"
                            {...field}
                            className="cosmic-input text-slate-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Business Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="cosmic-input text-slate-300">
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="cosmic-glass">
                              <SelectItem
                                value="retail"
                                className="text-slate-300"
                              >
                                Retail
                              </SelectItem>
                              <SelectItem
                                value="service"
                                className="text-slate-300"
                              >
                                Service
                              </SelectItem>
                              <SelectItem
                                value="manufacturing"
                                className="text-slate-300"
                              >
                                Manufacturing
                              </SelectItem>
                              <SelectItem
                                value="technology"
                                className="text-slate-300"
                              >
                                Technology
                              </SelectItem>
                              <SelectItem
                                value="finance"
                                className="text-slate-300"
                              >
                                Finance
                              </SelectItem>
                              <SelectItem
                                value="healthcare"
                                className="text-slate-300"
                              >
                                Healthcare
                              </SelectItem>
                              <SelectItem
                                value="education"
                                className="text-slate-300"
                              >
                                Education
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
                            Select the type that best describes your business.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="foundingDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Founding Date (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="cosmic-input text-slate-300"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            The date your business was established.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Your Business Question
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your business-related question here..."
                            {...field}
                            className="cosmic-input text-slate-300 min-h-[100px]"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Be specific about what you'd like to know about your
                          business.
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
                  Popular Business Questions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Common questions our users ask about their business ventures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "What is the most auspicious time to launch my new business?",
                  "How can I improve the financial prospects of my business?",
                  "What business partnerships would be most beneficial according to my chart?",
                  "When should I plan for expansion or major changes in my business?",
                  "How can I overcome current business challenges based on astrological guidance?",
                ].map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-slate-300 hover:text-cosmic-primary-300 hover:bg-cosmic-primary-900/20"
                      onClick={() => handleAskQuestion(question)}
                    >
                      <span className="line-clamp-1">{question}</span>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
            <div className="absolute -bottom-16 -right-16 opacity-20 pointer-events-none">
              <CosmicRing size={180} color="primary" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {businessAnalysisCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="cosmic-card h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-cosmic-primary-900/30 border border-cosmic-primary-700/30">
                        <card.icon className="h-5 w-5 text-cosmic-primary-400" />
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
                      className="w-full cosmic-button"
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
              <CardHeader className="bg-gradient-to-r from-cosmic-primary-900/30 to-cosmic-dark-300/30 border-b border-cosmic-primary-700/20">
                <CardTitle className="font-cosmic text-slate-200">
                  Planetary Business Influences
                </CardTitle>
                <CardDescription className="text-slate-400">
                  How celestial bodies affect different aspects of business
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 border border-cosmic-primary-800/30 rounded-lg bg-cosmic-primary-950/20">
                      <div className="text-xs text-slate-400">Jupiter</div>
                      <div className="font-cosmic text-cosmic-primary-300 text-lg">
                        Expansion
                      </div>
                    </div>
                    <div className="p-3 border border-cosmic-primary-800/30 rounded-lg bg-cosmic-primary-950/20">
                      <div className="text-xs text-slate-400">Saturn</div>
                      <div className="font-cosmic text-cosmic-primary-300 text-lg">
                        Structure
                      </div>
                    </div>
                    <div className="p-3 border border-cosmic-primary-800/30 rounded-lg bg-cosmic-primary-950/20">
                      <div className="text-xs text-slate-400">Mercury</div>
                      <div className="font-cosmic text-cosmic-primary-300 text-lg">
                        Communication
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300">
                    Your business is influenced by multiple planetary energies.
                    Jupiter governs expansion and growth opportunities, Saturn
                    provides structure and long-term stability, while Mercury
                    influences communication and negotiations. Understanding
                    these influences can help you make strategic business
                    decisions.
                  </p>

                  <Button
                    className="w-full cosmic-button"
                    onClick={() =>
                      handleAskQuestion(
                        "How are Jupiter, Saturn, and Mercury currently influencing my business prospects?"
                      )
                    }
                  >
                    Get My Business Reading
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
        moduleTitle="Business Guruji"
        moduleId="business"
        initialQuestion={selectedQuestion}
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        moduleTitle="Business Guruji"
        moduleId="business"
      />
    </div>
  );
}
