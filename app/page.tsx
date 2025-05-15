import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { CTASection } from "@/components/landing/cta-section";
import { AstroLogoBanner } from "@/components/landing/astro-logo-banner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <AstroLogoBanner />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}
