import {
  Star,
  Heart,
  Briefcase,
  Users,
  Building,
  Gem,
  MessageCircle,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Star,
      title: "Kundli Maker Guruji",
      description:
        "Generate detailed birth charts and personalized astrological readings.",
    },
    {
      icon: Heart,
      title: "Relationship Guruji",
      description:
        "Discover compatibility insights and guidance for your relationships.",
    },
    {
      icon: Briefcase,
      title: "Career Guruji",
      description: "Get career guidance based on your astrological profile.",
    },
    {
      icon: Users,
      title: "Partner Compatibility Guruji",
      description:
        "Find out how compatible you are with your partner or potential match.",
    },
    {
      icon: Building,
      title: "Business Guruji",
      description: "Receive business insights and timing recommendations.",
    },
    {
      icon: Gem,
      title: "Gemstone Guruji",
      description: "Discover which gemstones can enhance your cosmic energy.",
    },
    {
      icon: MessageCircle,
      title: "Interactive Consultations",
      description:
        "Chat with our AI Guruji to get answers to your specific questions.",
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description:
        "Your personal information and questions remain private and secure.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access astrological guidance whenever you need it.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description:
        "Advanced AI technology provides accurate and personalized readings.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-blue">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive Astrological Guidance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform offers a wide range of astrological services to help
            you navigate life's journey.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <feature.icon className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
