"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
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
import { Settings, Bell, Lock, Shield, Moon } from "lucide-react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  readingReminders: z.boolean(),
  celestialEvents: z.boolean(),
});

export default function SettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
      readingReminders: true,
      celestialEvents: true,
    },
  });

  async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });

      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating password",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onNotificationSubmit(
    values: z.infer<typeof notificationSchema>
  ) {
    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Notification preferences updated",
        description:
          "Your notification preferences have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating notification preferences",
        description: error.message || "Something went wrong. Please try again.",
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
          <Settings className="w-6 h-6 mr-2" />
          Settings
        </h2>
        <p className="text-slate-300">
          Manage your account settings, security, and notification preferences.
        </p>
      </motion.div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="relative z-10"
      >
        <TabsList className="grid w-full grid-cols-3 bg-cosmic-dark-200 p-1">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            Account Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="data-[state=active]:bg-cosmic-primary-700/50 data-[state=active]:text-white text-slate-300"
          >
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Change Password
              </CardTitle>
              <CardDescription className="text-slate-400">
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200">
                          Current Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your current password"
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
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter new password"
                              {...field}
                              className="cosmic-input text-slate-300"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            At least 8 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">
                            Confirm New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm new password"
                              {...field}
                              className="cosmic-input text-slate-300"
                            />
                          </FormControl>
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
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Account Security
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage your account security settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-slate-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-cosmic-primary-700/20 text-slate-300"
                  >
                    Enable
                  </Button>
                </div>

                <div className="cosmic-divider" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">
                      Active Sessions
                    </h4>
                    <p className="text-sm text-slate-400">
                      Manage devices where you're currently logged in.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-cosmic-primary-700/20 text-slate-300"
                  >
                    Manage
                  </Button>
                </div>

                <div className="cosmic-divider" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">
                      Delete Account
                    </h4>
                    <p className="text-sm text-slate-400">
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-cosmic-primary-700/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-slate-200">
                            Email Notifications
                          </FormLabel>
                          <FormDescription className="text-slate-400">
                            Receive notifications via email.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-cosmic-primary-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-cosmic-primary-700/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-slate-200">
                            Marketing Emails
                          </FormLabel>
                          <FormDescription className="text-slate-400">
                            Receive promotional offers and updates.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-cosmic-primary-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="readingReminders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-cosmic-primary-700/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-slate-200">
                            Reading Reminders
                          </FormLabel>
                          <FormDescription className="text-slate-400">
                            Get reminders for scheduled readings.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-cosmic-primary-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="celestialEvents"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-cosmic-primary-700/20 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-slate-200">
                            Celestial Events
                          </FormLabel>
                          <FormDescription className="text-slate-400">
                            Receive notifications about important astrological
                            events.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-cosmic-primary-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="cosmic-button"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="font-cosmic text-slate-200 flex items-center">
                <Moon className="w-5 h-5 mr-2 text-cosmic-primary-400" />
                Appearance Settings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Customize how Jyotish Guru looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-slate-200 font-medium">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-cosmic-primary-600 rounded-lg p-4 text-center bg-cosmic-dark-300 cursor-pointer">
                      <div className="h-20 rounded bg-cosmic-dark-400 mb-2 flex items-center justify-center">
                        <Moon className="h-6 w-6 text-cosmic-primary-400" />
                      </div>
                      <p className="text-sm text-slate-300">Dark</p>
                    </div>
                    <div className="border border-cosmic-primary-700/20 rounded-lg p-4 text-center bg-cosmic-dark-300 cursor-pointer">
                      <div className="h-20 rounded bg-white mb-2 flex items-center justify-center">
                        <Moon className="h-6 w-6 text-cosmic-primary-600" />
                      </div>
                      <p className="text-sm text-slate-300">Light</p>
                    </div>
                    <div className="border border-cosmic-primary-700/20 rounded-lg p-4 text-center bg-cosmic-dark-300 cursor-pointer">
                      <div className="h-20 rounded bg-gradient-to-b from-white to-cosmic-dark-400 mb-2 flex items-center justify-center">
                        <Moon className="h-6 w-6 text-cosmic-primary-500" />
                      </div>
                      <p className="text-sm text-slate-300">System</p>
                    </div>
                  </div>
                </div>

                <div className="cosmic-divider" />

                <div className="space-y-2">
                  <h4 className="text-slate-200 font-medium">
                    Animation Preferences
                  </h4>
                  <div className="flex items-center justify-between rounded-lg border border-cosmic-primary-700/20 p-4">
                    <div className="space-y-0.5">
                      <p className="text-slate-200">Cosmic Animations</p>
                      <p className="text-sm text-slate-400">
                        Enable animated cosmic elements.
                      </p>
                    </div>
                    <Switch
                      defaultChecked
                      className="data-[state=checked]:bg-cosmic-primary-600"
                    />
                  </div>
                </div>

                <div className="cosmic-divider" />

                <div className="space-y-2">
                  <h4 className="text-slate-200 font-medium">Accessibility</h4>
                  <div className="flex items-center justify-between rounded-lg border border-cosmic-primary-700/20 p-4">
                    <div className="space-y-0.5">
                      <p className="text-slate-200">Reduce Motion</p>
                      <p className="text-sm text-slate-400">
                        Minimize animations for reduced motion sensitivity.
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-cosmic-primary-600" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-cosmic-primary-700/20 p-4">
                    <div className="space-y-0.5">
                      <p className="text-slate-200">High Contrast</p>
                      <p className="text-sm text-slate-400">
                        Increase contrast for better visibility.
                      </p>
                    </div>
                    <Switch className="data-[state=checked]:bg-cosmic-primary-600" />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="cosmic-button">
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
