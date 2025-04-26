"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard, Loader2 } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  moduleTitle: string
}

export function PaymentModal({ open, onOpenChange, onSuccess, moduleTitle }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // In a real app, you would integrate with Razorpay here
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onSuccess()
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Unlock Premium Features</DialogTitle>
          <DialogDescription>
            You've used all your free questions for {moduleTitle}. Upgrade to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="border-amber-200">
            <CardHeader className="bg-amber-50">
              <CardTitle>Premium Access</CardTitle>
              <CardDescription>Unlimited questions for {moduleTitle}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm">Unlimited questions</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm">Detailed astrological insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm">Personalized recommendations</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  <span className="text-sm">Access to premium content</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between bg-muted/50">
              <div className="text-2xl font-bold">₹499</div>
              <div className="text-sm text-muted-foreground">One-time payment</div>
            </CardFooter>
          </Card>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing} className="bg-amber-600 hover:bg-amber-700">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₹499
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
