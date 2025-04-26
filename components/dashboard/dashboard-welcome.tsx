"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardWelcome() {
  const [greeting, setGreeting] = useState("")
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }

    // In a real app, you would fetch the user's name from your backend
    // For now, we'll use a placeholder
    setUserName("User")
  }, [])

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {greeting}, {userName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome to your astrological dashboard. What would you like to explore today?
            </p>
          </div>
          <div className="text-sm bg-white bg-opacity-70 p-3 rounded-lg border border-amber-200">
            <p className="font-medium text-amber-800">Astrological Insight of the Day:</p>
            <p className="mt-1">
              "The stars encourage introspection today. Take time to reflect on your goals and aspirations."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
