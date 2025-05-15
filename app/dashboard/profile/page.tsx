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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { User, Calendar, MapPin, Clock, History } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  birthDate: z.string().min(1, {
    message: "Birth date is required.",
  }),
  birthTime: z.string().min(1, {
    message: "Birth time is required.",
  }),
  birthPlace: z.string().min(2, {
    message: "Birth place is required.",
  }),
  gender: z.string().min(1, {
    message: "Gender is required.",
  }),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [recentReadings, setRecentReadings] = useState<any[]>([]);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      gender: "",
    },
  });

  // Fetch user profile data
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/profile");

        if (response.ok) {
          const data = await response.json();
          const user = data.user;

          form.reset({
            name: user.name || "",
            email: user.email || "",
            birthDate: user.birthDate || "",
            birthTime: user.birthTime || "",
            birthPlace: user.birthPlace || "",
            gender: user.gender || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchRecentReadings() {
      try {
        const response = await fetch("/api/user/chats");

        if (response.ok) {
          const data = await response.json();
          setRecentReadings(data.chats || []);
        }
      } catch (error) {
        console.error("Error fetching recent readings:", error);
      }
    }

    fetchUserProfile();
    fetchRecentReadings();
  }, [form, toast]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update profile");
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-cosmic tracking-wide gradient-text flex items-center">
          <User className="w-6 h-6 mr-2" />
          Your Profile
        </h2>
        <p className="text-slate-300">
          Manage your personal information and view your astrological reading
          history.
        </p>
      </motion.div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10"
      >
        <TabsList className="grid w-full grid-cols-2 bg-cosmic-dark-200 p-1">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            Reading History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200">
                Your Profile Details
              </CardTitle>
              <CardDescription className="text-slate-400">
                Update your personal information and birth details for accurate
                astrological readings.
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
                          <FormLabel className="text-slate-200">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
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
                              placeholder="Enter your email"
                              {...field}
                              className="cosmic-input text-slate-300"
                              disabled
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            Email cannot be changed.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="cosmic-divider" />
                  <h3 className="text-lg font-cosmic text-cosmic-primary-400 mb-4">
                    Birth Details
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Date of Birth
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-cosmic-primary-400" />
                              <Input
                                type="date"
                                {...field}
                                className="cosmic-input text-slate-300"
                              />
                            </div>
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
                            Time of Birth
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-cosmic-primary-400" />
                              <Input
                                type="time"
                                {...field}
                                className="cosmic-input text-slate-300"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            Enter time in 24-hour format if known.
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
                            Place of Birth
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-cosmic-primary-400" />
                              <Input
                                placeholder="City, State, Country"
                                {...field}
                                className="cosmic-input text-slate-300"
                              />
                            </div>
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
                          <FormLabel className="text-slate-200">
                            Gender
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="cosmic-input text-slate-300">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="cosmic-glass">
                              <SelectItem
                                value="male"
                                className="text-slate-300"
                              >
                                Male
                              </SelectItem>
                              <SelectItem
                                value="female"
                                className="text-slate-300"
                              >
                                Female
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

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="cosmic-button"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <History className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Recent Readings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your recent astrological consultations and readings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentReadings.length > 0 ? (
                <div className="space-y-4">
                  {recentReadings.slice(0, 5).map((reading, index) => (
                    <motion.div
                      key={reading.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 border border-cosmic-primary-700/20 rounded-lg bg-cosmic-dark-200/50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-cosmic text-cosmic-primary-400">
                            {reading.module.charAt(0).toUpperCase() +
                              reading.module.slice(1)}{" "}
                            Consultation
                          </h4>
                          <p className="text-sm text-slate-400">
                            {new Date(reading.createdAt).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(reading.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-medium text-slate-300">
                          Question:
                        </p>
                        <p className="text-sm text-slate-400">
                          {reading.question}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-300">
                          Response:
                        </p>
                        <p className="text-sm text-slate-400 line-clamp-3">
                          {reading.answer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400">
                    You haven't had any readings yet.
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Explore our modules to get personalized astrological
                    guidance.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
