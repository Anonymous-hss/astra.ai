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
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send } from "lucide-react"

interface ChatModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  moduleTitle: string
}

export function ChatModal({ open, onOpenChange, onSubmit, moduleTitle }: ChatModalProps) {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const handleSubmit = async () => {
    if (!question.trim()) return

    setIsLoading(true)
    setResponse("")

    try {
      // In a real app, you would call your backend API here
      // const response = await fetch('/api/ask', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ module: moduleTitle, question }),
      // });
      // const data = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate response
      setResponse(
        "Based on your birth chart, I can see that Jupiter is well-positioned in your horoscope, which indicates good fortune and wisdom. This placement suggests that you have a natural ability to learn and grow from your experiences. The current planetary transits are favorable for your personal development and spiritual growth.",
      )
    } catch (error) {
      console.error("Error asking question:", error)
      setResponse("Sorry, there was an error processing your question. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (response) {
      onSubmit()
    }
    setQuestion("")
    setResponse("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{moduleTitle}</DialogTitle>
          <DialogDescription>
            Ask your question about your astrological chart or seek guidance on specific aspects of your life.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!response && (
            <Textarea
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
            />
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
              <span className="ml-2 text-sm text-muted-foreground">Consulting the stars...</span>
            </div>
          )}

          {response && (
            <div className="rounded-lg border bg-card p-4">
              <h4 className="font-medium mb-2">Response:</h4>
              <p className="text-sm text-muted-foreground">{response}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          {!response ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!question.trim() || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
