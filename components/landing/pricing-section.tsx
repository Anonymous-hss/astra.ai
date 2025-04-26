import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  const plans = [
    {
      name: "Free Trial",
      price: "₹0",
      description: "Start your astrological journey",
      features: [
        "3 free questions per module",
        "Basic birth chart analysis",
        "Access to all modules",
        "24/7 availability",
      ],
      cta: "Get Started",
      href: "/auth/signup",
      popular: false,
    },
    {
      name: "Premium",
      price: "₹499",
      period: "per month",
      description: "Comprehensive astrological guidance",
      features: [
        "Unlimited questions across all modules",
        "Detailed birth chart analysis",
        "Personalized remedies and suggestions",
        "Priority support",
        "Custom question support",
        "Downloadable reports",
      ],
      cta: "Upgrade Now",
      href: "/auth/signup?plan=premium",
      popular: true,
    },
    {
      name: "Annual",
      price: "₹4,999",
      period: "per year",
      description: "Save ₹1,989 with annual billing",
      features: [
        "All Premium features",
        "Yearly forecast reports",
        "Muhurat timing recommendations",
        "Exclusive webinars and content",
        "Family chart analysis (up to 3 members)",
      ],
      cta: "Best Value",
      href: "/auth/signup?plan=annual",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that's right for your astrological journey.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border ${
                plan.popular ? "border-amber-600 shadow-lg" : "border-border shadow-sm"
              } bg-card p-6 relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-amber-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-amber-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`w-full ${plan.popular ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
