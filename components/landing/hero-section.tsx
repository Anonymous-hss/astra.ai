"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CosmicOrb, ZodiacWheel } from "@/components/ui/cosmic-elements";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark-200 to-cosmic-dark-300 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/stars-bg.svg')] bg-repeat opacity-30 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none z-0">
        <CosmicOrb size={400} color="primary" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block rounded-full bg-cosmic-primary-900/30 border border-cosmic-primary-700/30 px-4 py-1.5 text-sm font-medium text-cosmic-primary-300"
            >
              AI-Powered Vedic Astrology
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="block text-white">Discover Your</span>
              <span className="block gradient-text">Cosmic Path</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-xl text-slate-300"
            >
              Unlock the secrets of the stars with our AI-powered astrological
              guidance. Get personalized insights about your life,
              relationships, and future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button asChild size="lg" className="cosmic-button">
                <Link href="/auth/signup">Start Free Trial</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cosmic-primary-500/30 text-slate-200 hover:text-white hover:bg-cosmic-primary-700/20"
              >
                <Link href="#features">Explore Features</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="pt-4 text-sm text-slate-400"
            >
              Join over 10,000+ users discovering their cosmic potential
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <ZodiacWheel size={380} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 rounded-full border border-cosmic-primary-500/20 flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-cosmic-primary-900/30 to-cosmic-dark-300 border border-cosmic-primary-500/30 flex items-center justify-center"
                >
                  <Image
                    src="/jyotish-guru-logo.svg"
                    alt="Jyotish Guru Logo"
                    width={180}
                    height={180}
                    className="relative z-10"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
