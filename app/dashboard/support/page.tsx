"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Search,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

const supportSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function SupportPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm<z.infer<typeof supportSchema>>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof supportSchema>) {
    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Support request submitted",
        description: "We'll get back to you as soon as possible.",
      });

      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting request",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const faqs = [
    {
      question: "How accurate are the AI-generated astrological readings?",
      answer:
        "Our AI is trained on traditional Vedic astrology principles and modern astrological techniques. While no astrological reading can be 100% accurate, our system provides insights that many users find helpful and relevant to their situations.",
    },
    {
      question: "What information do I need to provide for a reading?",
      answer:
        "For most accurate readings, you'll need to provide your name, date of birth, time of birth, and place of birth. Gender information is also helpful for certain types of readings.",
    },
    {
      question: "How many free questions do I get?",
      answer:
        "You get 3 free questions in each module (Kundli, Relationship, Career, Partner Compatibility, Business, and Gemstone). After that, you'll need to subscribe to continue asking questions.",
    },
    {
      question: "Can I use the service on mobile devices?",
      answer:
        "Yes, our platform is fully responsive and works on smartphones, tablets, and desktop computers.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take privacy seriously. Your personal information is encrypted and securely stored. We do not share your data with third parties without your consent.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and UPI payments.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, if you're not satisfied with your subscription, contact us within 7 days of purchase for a full refund.",
    },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-cosmic tracking-wide gradient-text flex items-center">
          <HelpCircle className="w-6 h-6 mr-2" />
          Help & Support
        </h2>
        <p className="text-slate-300">
          Get help with your account, subscription, or astrological readings.
        </p>
      </motion.div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10"
      >
        <TabsList className="grid w-full grid-cols-3 bg-cosmic-dark-200 p-1">
          <TabsTrigger
            value="contact"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            Contact Us
          </TabsTrigger>
          <TabsTrigger
            value="faq"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            FAQ
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Contact Support
              </CardTitle>
              <CardDescription className="text-slate-400">
                Fill out the form below to get in touch with our support team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email"
                              {...field}
                              className="cosmic-input text-slate-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Subject of your inquiry"
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
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="cosmic-input text-slate-300">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="cosmic-glass">
                              <SelectItem
                                value="account"
                                className="text-slate-300"
                              >
                                Account Issues
                              </SelectItem>
                              <SelectItem
                                value="billing"
                                className="text-slate-300"
                              >
                                Billing & Subscription
                              </SelectItem>
                              <SelectItem
                                value="technical"
                                className="text-slate-300"
                              >
                                Technical Support
                              </SelectItem>
                              <SelectItem
                                value="readings"
                                className="text-slate-300"
                              >
                                Astrological Readings
                              </SelectItem>
                              <SelectItem
                                value="feedback"
                                className="text-slate-300"
                              >
                                Feedback & Suggestions
                              </SelectItem>
                              <SelectItem
                                value="other"
                                className="text-slate-300"
                              >
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your issue or question in detail"
                            {...field}
                            className="cosmic-input text-slate-300 min-h-[150px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="cosmic-button"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cosmic-card">
              <CardHeader className="pb-2">
                <CardTitle className="font-cosmic text-slate-200 flex items-center text-lg">
                  <Mail className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  For general inquiries and non-urgent issues, email us at:
                </p>
                <p className="text-cosmic-primary-400 font-medium">
                  support@jyotishguru.com
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Response time: 24-48 hours
                </p>
              </CardContent>
            </Card>

            <Card className="cosmic-card">
              <CardHeader className="pb-2">
                <CardTitle className="font-cosmic text-slate-200 flex items-center text-lg">
                  <Phone className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  For urgent issues, call our customer support line:
                </p>
                <p className="text-cosmic-primary-400 font-medium">
                  +91 1234 567 890
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Available: Mon-Fri, 9 AM - 6 PM IST
                </p>
              </CardContent>
            </Card>

            <Card className="cosmic-card">
              <CardHeader className="pb-2">
                <CardTitle className="font-cosmic text-slate-200 flex items-center text-lg">
                  <MessageSquare className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Chat with our support team in real-time:
                </p>
                <Button className="cosmic-button w-full">
                  Start Live Chat
                </Button>
                <p className="text-slate-400 text-sm mt-2">
                  Available: 24/7 for Premium users
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-slate-400">
                Find answers to common questions about our services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="cosmic-input text-slate-300 pl-10"
                />
              </div>

              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="border-cosmic-primary-700/20"
                      >
                        <AccordionTrigger className="text-slate-200 hover:text-cosmic-primary-400">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400">
                    No FAQs found matching your search.
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Try a different search term or browse all FAQs.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Helpful Resources
              </CardTitle>
              <CardDescription className="text-slate-400">
                Guides, tutorials, and resources to help you get the most out of
                Jyotish Guru.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Getting Started Guide",
                    description:
                      "Learn the basics of using Jyotish Guru and setting up your profile.",
                    icon: FileText,
                  },
                  {
                    title: "Understanding Your Birth Chart",
                    description:
                      "A comprehensive guide to interpreting your astrological birth chart.",
                    icon: FileText,
                  },
                  {
                    title: "Compatibility Analysis Guide",
                    description:
                      "Learn how to use our compatibility tools effectively.",
                    icon: FileText,
                  },
                  {
                    title: "Career Guidance Tutorial",
                    description:
                      "How to get the most accurate career insights from your chart.",
                    icon: FileText,
                  },
                ].map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-cosmic-primary-700/20 bg-cosmic-dark-200/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-slate-200 text-lg flex items-center">
                          <resource.icon className="w-4 h-4 mr-2 text-cosmic-primary-400" />
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 text-sm mb-4">
                          {resource.description}
                        </p>
                        <Button
                          variant="outline"
                          className="w-full border-cosmic-primary-700/20 text-slate-300 hover:bg-cosmic-primary-700/20 hover:text-cosmic-primary-300"
                        >
                          View Resource
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-cosmic text-cosmic-primary-400 mb-4">
                  Video Tutorials
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "How to Read Your Kundli Chart",
                      duration: "15:24",
                      thumbnail: "/placeholder.svg?height=200&width=400",
                    },
                    {
                      title: "Understanding Planetary Influences",
                      duration: "12:08",
                      thumbnail: "/placeholder.svg?height=200&width=400",
                    },
                  ].map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="relative overflow-hidden rounded-lg border border-cosmic-primary-700/20 group"
                    >
                      <div className="aspect-video bg-cosmic-dark-300 relative">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${video.thumbnail})` }}
                        />
                        <div className="absolute inset-0 bg-cosmic-dark-900/60 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-cosmic-primary-600/80 flex items-center justify-center group-hover:bg-cosmic-primary-600 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-white ml-1"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-cosmic-dark-900/80 px-2 py-1 rounded text-xs text-slate-300">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-slate-200 font-medium">
                          {video.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
