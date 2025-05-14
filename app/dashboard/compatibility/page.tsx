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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatModal } from "@/components/dashboard/chat-modal";
import { PaymentModal } from "@/components/dashboard/payment-modal";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  CosmicOrb,
  CosmicRing,
  CompatibilityIcon,
} from "@/components/ui/cosmic-elements";
import { Heart, BarChart3, Star, Shield } from "lucide-react";

const compatibilitySchema = z.object({
  partnerOneName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  partnerOneBirthDate: z.string().min(1, {
    message: "Birth date is required.",
  }),
  partnerTwoName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  partnerTwoBirthDate: z.string().min(1, {
    message: "Birth date is required.",
  }),
  relationshipType: z.string().min(1, {
    message: "Relationship type is required.",
  }),
  question: z.string().optional(),
});

export default function CompatibilityPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("match");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(3);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [compatibilityScore, setCompatibilityScore] = useState<
    Record<string, number>
  >({
    overall: 0,
    emotional: 0,
    intellectual: 0,
    spiritual: 0,
  });

  // Fetch user's module questions status
  useEffect(() => {
    async function fetchQuestionsStatus() {
      try {
        const response = await fetch("/api/user/questions");

        if (response.ok) {
          const data = await response.json();
          const moduleStatus = data.modules?.compatibility;

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

  const form = useForm<z.infer<typeof compatibilitySchema>>({
    resolver: zodResolver(compatibilitySchema),
    defaultValues: {
      partnerOneName: "",
      partnerOneBirthDate: "",
      partnerTwoName: "",
      partnerTwoBirthDate: "",
      relationshipType: "",
      question: "",
    },
  });

  const onSubmit = (values: z.infer<typeof compatibilitySchema>) => {
    // Generate pseudo-random compatibility scores based on input
    // In a real app, this would come from the actual astrological calculations
    const seed = values.partnerOneName.length + values.partnerTwoName.length;

    setCompatibilityScore({
      overall: Math.min(85, 50 + (seed % 35)),
      emotional: Math.min(90, 40 + ((seed * 2) % 50)),
      intellectual: Math.min(95, 45 + ((seed * 3) % 50)),
      spiritual: Math.min(85, 50 + ((seed * 4) % 35)),
    });

    setHasSubmitted(true);
    setActiveTab("results");
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

  const zodiacCompatibility = [
    {
      sign1: "Aries",
      sign2: "Leo",
      compatibility: "High",
      description: "Fire signs with passionate energy",
    },
    {
      sign1: "Taurus",
      sign2: "Virgo",
      compatibility: "High",
      description: "Earth signs with practical approach",
    },
    {
      sign1: "Gemini",
      sign2: "Libra",
      compatibility: "High",
      description: "Air signs with intellectual connection",
    },
    {
      sign1: "Cancer",
      sign2: "Pisces",
      compatibility: "High",
      description: "Water signs with emotional depth",
    },
    {
      sign1: "Leo",
      sign2: "Sagittarius",
      compatibility: "High",
      description: "Fire signs with adventurous spirit",
    },
    {
      sign1: "Virgo",
      sign2: "Capricorn",
      compatibility: "High",
      description: "Earth signs with disciplined nature",
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
            <CompatibilityIcon className="w-8 h-8 mr-2" />
            Compatibility Guruji
          </h2>
          <p className="text-slate-300">
            Discover how well you and your partner's stars align and the cosmic
            nature of your relationship.
          </p>
        </motion.div>
        <div className="absolute top-0 right-0 -translate-y-1/4 opacity-30 pointer-events-none">
          <CosmicOrb size={120} color="purple" />
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10"
      >
        <TabsList className="grid w-full grid-cols-3 bg-indigo-950/50 p-1">
          <TabsTrigger
            value="match"
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-200 text-slate-300"
          >
            Match Analysis
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-200 text-slate-300"
            disabled={!hasSubmitted}
          >
            Results
          </TabsTrigger>
          <TabsTrigger
            value="guide"
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-200 text-slate-300"
          >
            Compatibility Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="match" className="space-y-4 mt-6">
          <Card className="cosmic-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-b border-purple-700/20">
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <CompatibilityIcon className="w-5 h-5 mr-2" />
                Match Analysis
              </CardTitle>
              <CardDescription className="text-slate-400">
                Enter details to analyze the astrological compatibility between
                two people.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-cosmic text-purple-300">
                        First Person
                      </h3>

                      <FormField
                        control={form.control}
                        name="partnerOneName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter name"
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
                        name="partnerOneBirthDate"
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
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-cosmic text-purple-300">
                        Second Person
                      </h3>

                      <FormField
                        control={form.control}
                        name="partnerTwoName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter name"
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
                        name="partnerTwoBirthDate"
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
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="relationshipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Relationship Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="cosmic-input text-slate-300">
                              <SelectValue placeholder="Select relationship type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="cosmic-glass">
                            <SelectItem
                              value="romantic"
                              className="text-slate-300"
                            >
                              Romantic
                            </SelectItem>
                            <SelectItem
                              value="friendship"
                              className="text-slate-300"
                            >
                              Friendship
                            </SelectItem>
                            <SelectItem
                              value="business"
                              className="text-slate-300"
                            >
                              Business
                            </SelectItem>
                            <SelectItem
                              value="family"
                              className="text-slate-300"
                            >
                              Family
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-slate-400">
                          Select the type of relationship you want to analyze.
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
                            placeholder="Any specific aspect of the relationship you want to analyze?"
                            {...field}
                            className="cosmic-input text-slate-300 min-h-[100px]"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Add a specific question or leave blank for a general
                          compatibility reading.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-slate-400">
                      {isPremium ||
                      questionsRemaining === Number.POSITIVE_INFINITY
                        ? "You have unlimited analyses."
                        : `${questionsRemaining} free analyses remaining.`}
                    </div>
                    <Button type="submit" className="cosmic-button">
                      Analyze Compatibility
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6 mt-6">
          {hasSubmitted && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="cosmic-card overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-b border-purple-700/20">
                    <CardTitle className="font-cosmic text-slate-200">
                      Compatibility Analysis Results
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {form.watch("partnerOneName")} &{" "}
                      {form.watch("partnerTwoName")} •{" "}
                      {form.watch("relationshipType")} Compatibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="text-center">
                            <div className="text-6xl font-cosmic text-purple-300">
                              {compatibilityScore.overall}%
                            </div>
                            <div className="text-sm text-slate-400 mt-1">
                              Overall Compatibility
                            </div>
                          </div>
                          <div className="absolute inset-0 -z-10">
                            <CosmicRing size={150} color="purple" />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center p-3 border border-purple-800/30 rounded-lg bg-purple-950/20">
                          <div className="text-2xl font-cosmic text-purple-300">
                            {compatibilityScore.emotional}%
                          </div>
                          <div className="text-sm text-slate-400">
                            Emotional
                          </div>
                        </div>
                        <div className="text-center p-3 border border-indigo-800/30 rounded-lg bg-indigo-950/20">
                          <div className="text-2xl font-cosmic text-indigo-300">
                            {compatibilityScore.intellectual}%
                          </div>
                          <div className="text-sm text-slate-400">
                            Intellectual
                          </div>
                        </div>
                        <div className="text-center p-3 border border-blue-800/30 rounded-lg bg-blue-950/20">
                          <div className="text-2xl font-cosmic text-blue-300">
                            {compatibilityScore.spiritual}%
                          </div>
                          <div className="text-sm text-slate-400">
                            Spiritual
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-cosmic text-purple-300">
                          Summary
                        </h3>
                        <p className="text-slate-300 text-sm">
                          This relationship shows{" "}
                          {compatibilityScore.overall >= 70
                            ? "strong"
                            : compatibilityScore.overall >= 50
                            ? "moderate"
                            : "challenging"}{" "}
                          compatibility overall. The emotional connection is{" "}
                          {compatibilityScore.emotional >= 70
                            ? "deeply resonant"
                            : compatibilityScore.emotional >= 50
                            ? "moderately aligned"
                            : "an area that needs attention"}
                          . Intellectually, you{" "}
                          {compatibilityScore.intellectual >= 70
                            ? "connect exceptionally well"
                            : compatibilityScore.intellectual >= 50
                            ? "have a good understanding"
                            : "may face communication challenges"}
                          . On the spiritual level, there is{" "}
                          {compatibilityScore.spiritual >= 70
                            ? "a profound connection"
                            : compatibilityScore.spiritual >= 50
                            ? "meaningful alignment"
                            : "opportunity for growth"}
                          .
                        </p>
                      </div>

                      <div className="pt-2">
                        <Button
                          className="w-full cosmic-button"
                          onClick={() =>
                            handleAskQuestion(
                              `Please provide more detailed insights about the compatibility between ${form.watch(
                                "partnerOneName"
                              )} and ${form.watch(
                                "partnerTwoName"
                              )} for a ${form.watch(
                                "relationshipType"
                              )} relationship.`
                            )
                          }
                        >
                          Get Detailed Reading
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="cosmic-card">
                  <CardHeader>
                    <CardTitle className="font-cosmic text-slate-200 text-lg">
                      Planetary Influences
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Key celestial aspects affecting this relationship
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="p-3 border border-purple-800/30 rounded-lg bg-purple-950/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className="h-4 w-4 text-pink-400" />
                          <div className="font-cosmic text-pink-300 text-sm">
                            Venus Aspects
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          Venus influences harmony and affection. Your Venus
                          placements suggest
                          {compatibilityScore.emotional >= 70
                            ? " a naturally harmonious connection"
                            : compatibilityScore.emotional >= 50
                            ? " moderate romantic compatibility"
                            : " areas for growth in expressing affection"}
                          .
                        </p>
                      </div>

                      <div className="p-3 border border-indigo-800/30 rounded-lg bg-indigo-950/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <div className="font-cosmic text-yellow-300 text-sm">
                            Sun Aspects
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          Sun represents ego and core identity. Your Sun signs
                          are
                          {compatibilityScore.intellectual >= 70
                            ? " highly complementary"
                            : compatibilityScore.intellectual >= 50
                            ? " moderately aligned"
                            : " presenting some challenges in mutual understanding"}
                          .
                        </p>
                      </div>

                      <div className="p-3 border border-blue-800/30 rounded-lg bg-blue-950/10">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart3 className="h-4 w-4 text-blue-400" />
                          <div className="font-cosmic text-blue-300 text-sm">
                            Mercury Aspects
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          Mercury governs communication. Your Mercury placements
                          indicate
                          {compatibilityScore.intellectual >= 70
                            ? " excellent communication flow"
                            : compatibilityScore.intellectual >= 50
                            ? " generally effective communication"
                            : " potential misunderstandings that require attention"}
                          .
                        </p>
                      </div>

                      <div className="p-3 border border-violet-800/30 rounded-lg bg-violet-950/10">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="h-4 w-4 text-violet-400" />
                          <div className="font-cosmic text-violet-300 text-sm">
                            Moon Aspects
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          Moon reflects emotional needs. Your Moon signs suggest
                          {compatibilityScore.emotional >= 70
                            ? " deep emotional understanding"
                            : compatibilityScore.emotional >= 50
                            ? " moderate emotional resonance"
                            : " differences in emotional expression that need bridging"}
                          .
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </TabsContent>

        <TabsContent value="guide" className="space-y-6 mt-6">
          <Card className="cosmic-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-b border-purple-700/20">
              <CardTitle className="font-cosmic text-slate-200">
                Zodiac Compatibility Guide
              </CardTitle>
              <CardDescription className="text-slate-400">
                Learn about natural compatibility between different zodiac signs
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-3 md:grid-cols-3">
                {zodiacCompatibility.map((pair, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-3 border border-purple-800/30 rounded-lg bg-purple-950/10"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-cosmic text-purple-300">
                        {pair.sign1} & {pair.sign2}
                      </div>
                      <div className="text-xs px-2 py-0.5 rounded bg-purple-800/30 text-purple-300">
                        {pair.compatibility}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">{pair.description}</p>
                  </motion.div>
                ))}
              </div>

              <Card className="border-indigo-800/30 bg-indigo-950/20">
                <CardHeader className="pb-2">
                  <CardTitle className="font-cosmic text-slate-200 text-lg">
                    Element Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-300">
                      <span className="font-cosmic text-red-300">
                        Fire Signs
                      </span>{" "}
                      (Aries, Leo, Sagittarius) harmonize well with
                      <span className="font-cosmic text-blue-300">
                        {" "}
                        Air Signs
                      </span>{" "}
                      (Gemini, Libra, Aquarius) as air fuels fire.
                    </p>
                    <p className="text-sm text-slate-300">
                      <span className="font-cosmic text-amber-300">
                        Earth Signs
                      </span>{" "}
                      (Taurus, Virgo, Capricorn) connect well with
                      <span className="font-cosmic text-teal-300">
                        {" "}
                        Water Signs
                      </span>{" "}
                      (Cancer, Scorpio, Pisces) as water nourishes earth.
                    </p>
                    <p className="text-sm text-slate-300">
                      Signs of the same element often share deep understanding,
                      while opposing elements can create either dynamic tension
                      or balance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="pt-2">
                <Button
                  className="w-full cosmic-button"
                  onClick={() =>
                    handleAskQuestion(
                      "What factors beyond zodiac signs influence relationship compatibility in Vedic astrology?"
                    )
                  }
                >
                  Ask About Your Specific Compatibility
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ChatModal
        open={isChatModalOpen}
        onOpenChange={setIsChatModalOpen}
        onSubmit={handleQuestionSubmitted}
        moduleTitle="Compatibility Guruji"
        moduleId="compatibility"
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        moduleTitle="Compatibility Guruji"
        moduleId="compatibility"
      />
    </div>
  );
}
