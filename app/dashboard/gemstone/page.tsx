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
  GemstoneIcon,
} from "@/components/ui/cosmic-elements";
import { Gem, Shield, Sparkles, Zap, Heart } from "lucide-react";

const gemstoneSchema = z.object({
  birthDate: z.string().min(1, {
    message: "Birth date is required.",
  }),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  purpose: z.string().min(1, {
    message: "Purpose is required",
  }),
  question: z.string().optional(),
});

export default function GemstonePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("recommend");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(3);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedGemstones, setRecommendedGemstones] = useState<any[]>([]);

  // Fetch user's module questions status
  useEffect(() => {
    async function fetchQuestionsStatus() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/questions");

        if (response.ok) {
          const data = await response.json();
          const moduleStatus = data.modules?.gemstone;

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

  const form = useForm<z.infer<typeof gemstoneSchema>>({
    resolver: zodResolver(gemstoneSchema),
    defaultValues: {
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      purpose: "",
      question: "",
    },
  });

  const onSubmit = (values: z.infer<typeof gemstoneSchema>) => {
    // Simulate API call to get gemstone recommendations
    setIsLoading(true);

    // Mock data for demonstration
    setTimeout(() => {
      const mockGemstones = [
        {
          name: "Ruby",
          planet: "Sun",
          benefits: "Enhances leadership qualities, vitality, and confidence",
          color: "Red",
          wearing: "Ring on ring finger of right hand, set in gold",
          image: "/gemstones/ruby.jpg",
        },
        {
          name: "Pearl",
          planet: "Moon",
          benefits: "Promotes emotional balance, intuition, and mental peace",
          color: "White",
          wearing: "Pendant or ring on little finger, set in silver",
          image: "/gemstones/pearl.jpg",
        },
        {
          name: "Emerald",
          planet: "Mercury",
          benefits:
            "Enhances intelligence, communication skills, and business acumen",
          color: "Green",
          wearing: "Ring on little finger of right hand, set in gold",
          image: "/gemstones/emerald.jpg",
        },
      ];

      setRecommendedGemstones(mockGemstones);
      setActiveTab("results");
      setIsLoading(false);
    }, 1500);
  };

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

  const gemstoneCards = [
    {
      name: "Ruby",
      planet: "Sun",
      color: "Red",
      benefits: "Enhances leadership qualities, vitality, and confidence",
      icon: Sparkles,
      bgClass: "from-red-900/20 to-red-950/20 border-red-800/30",
      textClass: "text-red-400",
    },
    {
      name: "Pearl",
      planet: "Moon",
      color: "White",
      benefits: "Promotes emotional balance, intuition, and mental peace",
      icon: Heart,
      bgClass: "from-slate-300/20 to-slate-400/20 border-slate-300/30",
      textClass: "text-slate-300",
    },
    {
      name: "Yellow Sapphire",
      planet: "Jupiter",
      color: "Yellow",
      benefits: "Brings wisdom, prosperity, and good fortune",
      icon: Zap,
      bgClass: "from-yellow-800/20 to-yellow-900/20 border-yellow-700/30",
      textClass: "text-yellow-400",
    },
    {
      name: "Blue Sapphire",
      planet: "Saturn",
      color: "Blue",
      benefits: "Provides protection, discipline, and career advancement",
      icon: Shield,
      bgClass: "from-blue-900/20 to-blue-950/20 border-blue-800/30",
      textClass: "text-blue-400",
    },
  ];

  if (isLoading && activeTab !== "guide") {
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
            <GemstoneIcon className="w-8 h-8 mr-2" />
            Gemstone Guruji
          </h2>
          <p className="text-slate-300">
            Discover the perfect gemstones to enhance your life based on your
            unique astrological profile.
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
        <TabsList className="grid w-full grid-cols-3 bg-cosmic-dark-300/50 p-1">
          <TabsTrigger
            value="recommend"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-cosmic-primary-200 text-slate-300"
          >
            Get Recommendations
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-cosmic-primary-200 text-slate-300"
            disabled={recommendedGemstones.length === 0}
          >
            Your Gemstones
          </TabsTrigger>
          <TabsTrigger
            value="guide"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-cosmic-primary-200 text-slate-300"
          >
            Gemstone Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommend" className="space-y-4 mt-6">
          <Card className="cosmic-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cosmic-primary-900/30 to-cosmic-dark-300/30 border-b border-cosmic-primary-700/20">
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <GemstoneIcon className="w-5 h-5 mr-2" />
                Gemstone Recommendation
              </CardTitle>
              <CardDescription className="text-slate-400">
                Enter your details to receive personalized gemstone
                recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Birth Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="cosmic-input text-slate-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Birth Time (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              {...field}
                              className="cosmic-input text-slate-300"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            For more accurate results.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthPlace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Birth Place (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City, Country"
                              {...field}
                              className="cosmic-input text-slate-300"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            For more accurate results.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Primary Purpose
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="cosmic-input text-slate-300">
                              <SelectValue placeholder="Select your primary goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="cosmic-glass">
                            <SelectItem
                              value="health"
                              className="text-slate-300"
                            >
                              Health & Vitality
                            </SelectItem>
                            <SelectItem
                              value="wealth"
                              className="text-slate-300"
                            >
                              Wealth & Prosperity
                            </SelectItem>
                            <SelectItem
                              value="career"
                              className="text-slate-300"
                            >
                              Career Success
                            </SelectItem>
                            <SelectItem
                              value="relationship"
                              className="text-slate-300"
                            >
                              Relationships & Marriage
                            </SelectItem>
                            <SelectItem
                              value="spiritual"
                              className="text-slate-300"
                            >
                              Spiritual Growth
                            </SelectItem>
                            <SelectItem
                              value="protection"
                              className="text-slate-300"
                            >
                              Protection & Stability
                            </SelectItem>
                            <SelectItem
                              value="general"
                              className="text-slate-300"
                            >
                              General Wellbeing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-slate-400">
                          Select what you primarily want to enhance or improve.
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
                          Specific Question (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific concerns or questions about gemstones?"
                            {...field}
                            className="cosmic-input text-slate-300 min-h-[100px]"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Add any specific questions or concerns you have.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-slate-400">
                      {isPremium ||
                      questionsRemaining === Number.POSITIVE_INFINITY
                        ? "You have unlimited recommendations."
                        : `${questionsRemaining} free recommendations remaining.`}
                    </div>
                    <Button type="submit" className="cosmic-button">
                      Get Recommendations
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
                  Popular Gemstone Questions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Common questions our users ask about gemstones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Which gemstone is best for my zodiac sign?",
                  "How should I wear my recommended gemstones?",
                  "Can I wear multiple gemstones together?",
                  "How can I tell if a gemstone is authentic?",
                  "What are the best days to start wearing a new gemstone?",
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

        <TabsContent value="results" className="space-y-6 mt-6">
          {recommendedGemstones.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="cosmic-card">
                  <CardHeader className="bg-gradient-to-r from-cosmic-primary-900/30 to-cosmic-dark-300/30 border-b border-cosmic-primary-700/20">
                    <CardTitle className="font-cosmic text-slate-200">
                      Your Recommended Gemstones
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Based on your birth details and requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {recommendedGemstones.map((gemstone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-4 border border-cosmic-primary-700/30 rounded-lg bg-cosmic-primary-900/10"
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/4 flex justify-center">
                              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-primary-800/30 to-cosmic-dark-400/30 border border-cosmic-primary-700/30 flex items-center justify-center">
                                <Gem className="h-12 w-12 text-cosmic-primary-400" />
                              </div>
                            </div>
                            <div className="w-full md:w-3/4">
                              <h3 className="text-xl font-cosmic text-cosmic-primary-300 mb-2">
                                {gemstone.name}
                              </h3>
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div>
                                  <p className="text-xs text-slate-400">
                                    Planet
                                  </p>
                                  <p className="text-sm text-slate-300">
                                    {gemstone.planet}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400">
                                    Color
                                  </p>
                                  <p className="text-sm text-slate-300">
                                    {gemstone.color}
                                  </p>
                                </div>
                              </div>
                              <div className="mb-3">
                                <p className="text-xs text-slate-400">
                                  Benefits
                                </p>
                                <p className="text-sm text-slate-300">
                                  {gemstone.benefits}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400">
                                  How to Wear
                                </p>
                                <p className="text-sm text-slate-300">
                                  {gemstone.wearing}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 border border-cosmic-primary-700/30 rounded-lg bg-cosmic-primary-900/10">
                      <h3 className="text-lg font-cosmic text-cosmic-primary-300 mb-2">
                        Important Notes
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li>
                          • Always consult with a qualified astrologer before
                          wearing any gemstone.
                        </li>
                        <li>
                          • Gemstones should be of high quality and natural (not
                          synthetic).
                        </li>
                        <li>
                          • The recommended gemstones should be worn according
                          to the specific instructions.
                        </li>
                        <li>
                          • Some gemstones may need to be energized or purified
                          before wearing.
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button
                        className="cosmic-button"
                        onClick={() =>
                          handleAskQuestion(
                            "Can you provide more details about how these gemstones will benefit me specifically?"
                          )
                        }
                      >
                        Ask for More Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </TabsContent>

        <TabsContent value="guide" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {gemstoneCards.map((gemstone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`cosmic-card h-full bg-gradient-to-br ${gemstone.bgClass}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-cosmic-primary-900/30 border border-cosmic-primary-700/30">
                        <gemstone.icon
                          className={`h-5 w-5 ${gemstone.textClass}`}
                        />
                      </div>
                      <CardTitle
                        className={`font-cosmic text-lg ${gemstone.textClass}`}
                      >
                        {gemstone.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-slate-400">Planet</p>
                        <p className={`text-sm ${gemstone.textClass}`}>
                          {gemstone.planet}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Color</p>
                        <p className={`text-sm ${gemstone.textClass}`}>
                          {gemstone.color}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300">
                      {gemstone.benefits}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full cosmic-button"
                      onClick={() =>
                        handleAskQuestion(
                          `Tell me more about ${gemstone.name} and its benefits`
                        )
                      }
                    >
                      Learn More
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
          >
            <Card className="cosmic-card">
              <CardHeader className="bg-gradient-to-r from-cosmic-primary-900/30 to-cosmic-dark-300/30 border-b border-cosmic-primary-700/20">
                <CardTitle className="font-cosmic text-slate-200">
                  Gemstone Wearing Guide
                </CardTitle>
                <CardDescription className="text-slate-400">
                  How to properly wear and care for your gemstones
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="p-4 border border-cosmic-primary-700/30 rounded-lg bg-cosmic-primary-900/10">
                  <h3 className="text-lg font-cosmic text-cosmic-primary-300 mb-2">
                    Proper Wearing Methods
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>
                      • Most gemstones should be worn on specific fingers based
                      on the planet they represent.
                    </li>
                    <li>
                      • Gemstones should touch your skin to transfer their
                      energy effectively.
                    </li>
                    <li>
                      • The metal setting should be compatible with the
                      gemstone's planetary energy.
                    </li>
                    <li>
                      • Wear new gemstones on auspicious days and times for
                      maximum benefit.
                    </li>
                  </ul>
                </div>

                <div className="p-4 border border-cosmic-primary-700/30 rounded-lg bg-cosmic-primary-900/10">
                  <h3 className="text-lg font-cosmic text-cosmic-primary-300 mb-2">
                    Gemstone Care
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Clean your gemstones regularly with a soft cloth.</li>
                    <li>
                      • Avoid exposing gemstones to harsh chemicals or extreme
                      temperatures.
                    </li>
                    <li>
                      • Remove gemstone jewelry before swimming or bathing.
                    </li>
                    <li>
                      • Recharge your gemstones periodically by placing them in
                      sunlight or moonlight.
                    </li>
                  </ul>
                </div>

                <div className="p-4 border border-cosmic-primary-700/30 rounded-lg bg-cosmic-primary-900/10">
                  <h3 className="text-lg font-cosmic text-cosmic-primary-300 mb-2">
                    Authenticity Check
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>
                      • Natural gemstones have slight imperfections and
                      inclusions.
                    </li>
                    <li>• Check for color consistency and transparency.</li>
                    <li>
                      • Purchase from reputable dealers with proper
                      certification.
                    </li>
                    <li>
                      • Authentic gemstones have specific gravity and hardness
                      properties.
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    className="cosmic-button"
                    onClick={() =>
                      handleAskQuestion(
                        "How can I verify the authenticity of my gemstones?"
                      )
                    }
                  >
                    Ask About Gemstone Authentication
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
        moduleTitle="Gemstone Guruji"
        moduleId="gemstone"
        initialQuestion={selectedQuestion}
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        moduleTitle="Gemstone Guruji"
        moduleId="gemstone"
      />
    </div>
  );
}
