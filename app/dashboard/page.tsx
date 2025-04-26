import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModuleCard } from "@/components/dashboard/module-card"
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome"
import { Star, Heart, Briefcase, Users, Building, Gem } from "lucide-react"

export default function DashboardPage() {
  const modules = [
    {
      id: "kundli",
      title: "Kundli Maker Guruji",
      description: "Generate detailed birth charts and personalized readings",
      icon: Star,
      color: "bg-amber-100 text-amber-700",
      href: "/dashboard/kundli",
    },
    {
      id: "relationship",
      title: "Relationship Guruji",
      description: "Discover compatibility insights for your relationships",
      icon: Heart,
      color: "bg-rose-100 text-rose-700",
      href: "/dashboard/relationship",
    },
    {
      id: "career",
      title: "Career Guruji",
      description: "Get career guidance based on your astrological profile",
      icon: Briefcase,
      color: "bg-blue-100 text-blue-700",
      href: "/dashboard/career",
    },
    {
      id: "compatibility",
      title: "Partner Compatibility Guruji",
      description: "Find out how compatible you are with your partner",
      icon: Users,
      color: "bg-purple-100 text-purple-700",
      href: "/dashboard/compatibility",
    },
    {
      id: "business",
      title: "Business Guruji",
      description: "Receive business insights and timing recommendations",
      icon: Building,
      color: "bg-green-100 text-green-700",
      href: "/dashboard/business",
    },
    {
      id: "gemstone",
      title: "Gemstone Guruji",
      description: "Discover which gemstones can enhance your cosmic energy",
      icon: Gem,
      color: "bg-indigo-100 text-indigo-700",
      href: "/dashboard/gemstone",
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardWelcome />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Astrological Modules</h2>
        <p className="text-muted-foreground">
          Explore our different astrological services to get personalized guidance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            icon={module.icon}
            color={module.color}
            href={module.href}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Readings</CardTitle>
            <CardDescription>Your most recent astrological readings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You haven't had any readings yet. Start by exploring one of our modules above.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Astrological Calendar</CardTitle>
            <CardDescription>Important astrological dates and events.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your personalized astrological calendar will appear here after your first reading.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
