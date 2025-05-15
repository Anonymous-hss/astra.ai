"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CosmicOrb, CosmicRing } from "@/components/ui/cosmic-elements";

export function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark-300/50 to-cosmic-dark-400/80 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/stars-bg.svg')] bg-repeat opacity-30 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 opacity-40 pointer-events-none z-0">
        <CosmicOrb size={240} color="primary" />
      </div>
      <div className="absolute -bottom-40 -left-20 opacity-30 pointer-events-none z-0">
        <CosmicRing size={280} color="primary" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-cosmic tracking-tight gradient-text mb-6">
            Begin Your Cosmic Journey Today
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Unlock the secrets of the stars and discover your true potential
            with our AI-powered astrological guidance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              asChild
              size="lg"
              className="cosmic-button text-lg px-8 py-6 w-full sm:w-auto"
            >
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cosmic-primary-500/30 text-slate-200 hover:text-white hover:bg-cosmic-primary-700/20 text-lg px-8 py-6 w-full sm:w-auto"
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
            <span>✓ No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-cosmic-primary-500"></span>
            <span>✓ 7-day free trial</span>
            <span className="w-1 h-1 rounded-full bg-cosmic-primary-500"></span>
            <span>✓ Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
