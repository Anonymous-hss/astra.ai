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
import { Textarea } from "@/components/ui/textarea";
import { ChatModal } from "@/components/dashboard/chat-modal";
import { PaymentModal } from "@/components/dashboard/payment-modal";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  CosmicOrb,
  RelationshipIcon,
  ZodiacWheel,
} from "@/components/ui/cosmic-elements";

const relationshipSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
  relationshipType: z.string().min(1, {
    message: "Relationship type is required.",
  }),
  partnerDetails: z.string().optional(),
});

export default function RelationshipPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ask");
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
          const moduleStatus = data.modules?.relationship;

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

  const form = useForm<z.infer<typeof relationshipSchema>>({
    resolver: zodResolver(relationshipSchema),
    defaultValues: {
      question: "",
      relationshipType: "",
      partnerDetails: "",
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

  const predefinedQuestions = [
    "How can I improve communication in my relationship?",
    "What planetary influences are affecting my love life right now?",
    "How compatible am I with my partner based on our birth charts?",
    "When is the most auspicious time for marriage according to my chart?",
    "What karmic patterns might be affecting my relationships?",
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
            <RelationshipIcon className="w-8 h-8 mr-2" />
            Relationship Guruji
          </h2>
          <p className="text-slate-300">
            Discover how planetary positions influence your relationships and
            receive cosmic guidance for harmony.
          </p>
        </motion.div>
        <div className="absolute top-0 right-0 -translate-y-1/4 opacity-30 pointer-events-none">
          <CosmicOrb size={120} color="pink" />
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10"
      >
        <TabsList className="grid w-full grid-cols-2 bg-indigo-950/50 p-1">
          <TabsTrigger
            value="ask"
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-200 text-slate-300"
          >
            Ask Relationship Guruji
          </TabsTrigger>
          <TabsTrigger
            value="guidance"
            className="data-[state=active]:bg-purple-900/50 data-[state=active]:text-purple-200 text-slate-300"
          >
            Relationship Guidance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ask" className="space-y-4 mt-6">
          <Card className="cosmic-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-b border-pink-700/20">
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <RelationshipIcon className="w-5 h-5 mr-2" />
                Ask Your Question
              </CardTitle>
              <CardDescription className="text-slate-400">
                Seek guidance about your relationships, marriage, or romantic
                prospects.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              <Form {...form}>
                <form className="space-y-6">
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
                              value="marriage"
                              className="text-slate-300"
                            >
                              Marriage
                            </SelectItem>
                            <SelectItem
                              value="family"
                              className="text-slate-300"
                            >
                              Family
                            </SelectItem>
                            <SelectItem
                              value="friendship"
                              className="text-slate-300"
                            >
                              Friendship
                            </SelectItem>
                            <SelectItem
                              value="professional"
                              className="text-slate-300"
                            >
                              Professional
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-slate-400">
                          Select the type of relationship you'd like guidance
                          on.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="partnerDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Partner Details (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Birth date, time, or zodiac sign of your partner"
                            {...field}
                            className="cosmic-input text-slate-300"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Adding partner details can provide more accurate
                          compatibility insights.
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
                          Your Question
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your relationship question here..."
                            {...field}
                            className="cosmic-input text-slate-300 min-h-[100px]"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Be specific about what you'd like to know about your
                          relationship.
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="cosmic-card h-full">
              <CardHeader>
                <CardTitle className="font-cosmic text-slate-200 text-lg">
                  Popular Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {predefinedQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-slate-300 hover:text-pink-300 hover:bg-pink-900/20"
                      onClick={() => handleAskQuestion(question)}
                    >
                      <span className="line-clamp-1">{question}</span>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="cosmic-card h-full">
              <CardHeader>
                <CardTitle className="font-cosmic text-slate-200 text-lg">
                  Planetary Influences
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-48 h-48">
                  <ZodiacWheel size={190} />
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <p className="text-xs text-slate-300 max-w-32">
                      Current planetary positions may influence your
                      relationship dynamics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="guidance" className="space-y-6 mt-6">
          <Card className="cosmic-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-b border-pink-700/20">
              <CardTitle className="font-cosmic text-slate-200">
                Celestial Relationship Wisdom
              </CardTitle>
              <CardDescription className="text-slate-400">
                General guidance from the stars about nurturing harmonious
                relationships.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <motion.div
                className="border border-pink-800/30 rounded-lg p-4 bg-pink-950/10"
                initial={{ opacity: 0.0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-cosmic text-pink-300 mb-2">
                  Venus Influences
                </h3>
                <p className="text-slate-300 text-sm">
                  Venus, the planet of love and harmony, guides our relationship
                  patterns. When Venus is well-placed in your birth chart,
                  relationships tend to flow with ease and beauty. Practice
                  expressing appreciation and cultivate beauty in your
                  partnership to enhance Venus energy.
                </p>
              </motion.div>

              <motion.div
                className="border border-purple-800/30 rounded-lg p-4 bg-purple-950/10"
                initial={{ opacity: 0.0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-lg font-cosmic text-purple-300 mb-2">
                  Moon Connections
                </h3>
                <p className="text-slate-300 text-sm">
                  The Moon represents our emotional nature and needs. Moon
                  compatibility between partners indicates emotional resonance
                  and understanding. Nurturing emotional safety and creating
                  rituals together can strengthen your Moon connection and
                  deepen intimacy.
                </p>
              </motion.div>

              <motion.div
                className="border border-indigo-800/30 rounded-lg p-4 bg-indigo-950/10"
                initial={{ opacity: 0.0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-cosmic text-indigo-300 mb-2">
                  Saturn Lessons
                </h3>
                <p className="text-slate-300 text-sm">
                  Saturn represents commitment, responsibility, and longevity in
                  relationships. While Saturn transits may bring challenges,
                  they also strengthen bonds that are meant to last. Patience,
                  reliability, and clear boundaries honor Saturn's energy in
                  relationships.
                </p>
              </motion.div>

              <div className="pt-2">
                <Button
                  onClick={() =>
                    handleAskQuestion(
                      "How can I apply this celestial wisdom to my current relationship?"
                    )
                  }
                  className="w-full cosmic-button"
                >
                  Ask for Personalized Guidance
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
        moduleTitle="Relationship Guruji"
        moduleId="relationship"
      />

      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
        moduleTitle="Relationship Guruji"
        moduleId="relationship"
      />
    </div>
  );
}
