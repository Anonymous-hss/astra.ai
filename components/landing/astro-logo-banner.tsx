"use client";

import { motion } from "framer-motion";

export function AstroLogoBanner() {
  const logos = [
    { name: "Vedic Astrology", icon: "🕉️" },
    { name: "Western Astrology", icon: "♈" },
    { name: "Chinese Astrology", icon: "🐉" },
    { name: "Numerology", icon: "🔢" },
    { name: "Tarot", icon: "🃏" },
    { name: "Palmistry", icon: "✋" },
  ];

  return (
    <section className="py-12 bg-cosmic-dark-300/50 border-y border-cosmic-primary-700/10">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            Combining ancient wisdom with modern AI
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2"
            >
              <span className="text-3xl">{logo.icon}</span>
              <span className="text-lg font-cosmic text-slate-300">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
