"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { AuthHeader } from "@/components/auth/auth-header"

const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    if (otpSent) {
      // Verify OTP and complete signup
      setIsLoading(true)
      try {
        // This would call your backend API to verify OTP
        // await verifyOTP(values.email, otp);

        toast({
          title: "Account created successfully!",
          description: "You can now sign in to your account.",
        })
        router.push("/dashboard")
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error verifying OTP",
          description: "Please check your OTP and try again.",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      // Send OTP to email
      setIsLoading(true)
      try {
        // This would call your backend API to send OTP
        // await sendOTP(values.email);

        setOtpSent(true)
        toast({
          title: "OTP sent!",
          description: "Please check your email for the OTP.",
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error sending OTP",
          description: "Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <AuthHeader title="Create an account" description="Enter your details below to create your account" />
      <div className="mx-auto w-full max-w-md space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {otpSent && (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-medium text-amber-600 hover:text-amber-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
