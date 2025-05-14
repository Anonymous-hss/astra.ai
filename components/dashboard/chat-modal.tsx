"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleFlow } from "@/components/ui/cosmic-elements";

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  moduleTitle: string;
  moduleId: string;
}

export function ChatModal({
  open,
  onOpenChange,
  onSubmit,
  moduleTitle,
  moduleId,
}: ChatModalProps) {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const response = await fetch(`/api/astrology/${moduleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.paymentRequired) {
          toast({
            variant: "destructive",
            title: "No questions remaining",
            description: "Please upgrade to continue asking questions.",
          });
          onOpenChange(false);
          return;
        }
        throw new Error(data.error || "Failed to process question");
      }

      setResponse(data.response);
    } catch (error: any) {
      console.error("Error asking question:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message ||
          "Sorry, there was an error processing your question. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (response) {
      onSubmit();
    }
    setQuestion("");
    setResponse("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] cosmic-glass">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <ParticleFlow className="opacity-20" />
        </div>
        <DialogHeader className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="font-cosmic gradient-text flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-400 animate-twinkling" />
              {moduleTitle}
            </DialogTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <DialogDescription className="text-slate-300">
              Ask your question about your astrological chart or seek guidance
              on specific aspects of your life.
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        <div className="space-y-4 relative z-10">
          <AnimatePresence mode="wait">
            {!response && !isLoading && (
              <motion.div
                key="question-input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Textarea
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="cosmic-input text-slate-200 min-h-[100px]"
                />
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-ping"></div>
                  <Loader2 className="h-8 w-8 animate-spin text-purple-400 relative z-10" />
                </div>
                <span className="ml-2 text-sm text-slate-300 mt-4">
                  Consulting the cosmic forces...
                </span>
              </motion.div>
            )}

            {response && (
              <motion.div
                key="response"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-indigo-800/30 bg-indigo-950/30 p-4"
              >
                <div className="flex items-center mb-2">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-400 animate-twinkling" />
                  <h4 className="font-cosmic gradient-text">
                    Celestial Guidance:
                  </h4>
                </div>
                <p className="text-sm text-slate-300">{response}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <DialogFooter className="relative z-10">
          <AnimatePresence mode="wait">
            {!response ? (
              <motion.div
                key="question-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 w-full justify-end"
              >
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-purple-900/30 text-slate-300 hover:bg-purple-900/20 hover:text-purple-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!question.trim() || isLoading}
                  className="cosmic-button"
                >
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
              </motion.div>
            ) : (
              <motion.div
                key="response-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Button onClick={handleClose} className="cosmic-button w-full">
                  Close
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
