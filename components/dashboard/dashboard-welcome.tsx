"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Constellation, ParticleFlow } from "@/components/ui/cosmic-elements";

export function DashboardWelcome() {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    // In a real app, you would fetch the user's name from your backend
    // For now, we'll use a placeholder
    setUserName("User");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="cosmic-card overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
        <ParticleFlow className="opacity-30" />
        <Constellation className="absolute top-0 right-0 w-64 h-32 opacity-30" />
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <motion.h1
                className="text-2xl font-cosmic tracking-wide gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {greeting}, {userName}!
              </motion.h1>
              <motion.p
                className="text-slate-300 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Welcome to your celestial journey. What mysteries would you like
                to explore today?
              </motion.p>
            </div>
            <motion.div
              className="cosmic-glass p-3 rounded-lg text-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center text-purple-300 mb-1">
                <Sparkles className="h-4 w-4 mr-2 animate-twinkling" />
                <p className="font-cosmic">Celestial Insight of the Day</p>
              </div>
              <p className="text-slate-300">
                "The stars are aligning to bring clarity to your thoughts. Take
                time to meditate on your cosmic path."
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
