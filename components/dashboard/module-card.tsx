"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CosmicCard } from "@/components/ui/cosmic-elements";

// Import individual Lucide icons
import {
  Star,
  Heart,
  Briefcase,
  Users,
  Building,
  Gem,
  type LucideIcon,
} from "lucide-react";

// Map string names to icon components
const iconMap: Record<string, LucideIcon> = {
  Star,
  Heart,
  Briefcase,
  Users,
  Building,
  Gem,
};

interface ModuleCardProps {
  title: string;
  description: string;
  iconName: keyof typeof iconMap;
  href: string;
  index?: number;
}

export function ModuleCard({
  title,
  description,
  iconName,
  href,
  index = 0,
}: ModuleCardProps) {
  const Icon = iconMap[iconName];

  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in iconMap.`);
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <CosmicCard className="h-full flex flex-col group">
        <CardContent className="p-6 flex-grow">
          <div className="flex flex-col items-start gap-4">
            <div className="rounded-lg p-3 bg-cosmic-primary-900/30 border border-cosmic-primary-500/20 text-cosmic-primary-400 transition-colors relative overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-cosmic-primary-600/0 via-cosmic-primary-600/30 to-cosmic-primary-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  animation: "shimmer 2s infinite",
                  backgroundSize: "200% 100%",
                }}
              />
              <Icon className="h-6 w-6 relative z-10" />
            </div>
            <div>
              <h3 className="text-lg font-cosmic text-slate-200 group-hover:text-cosmic-primary-300 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-cosmic-dark-300/50 px-6 py-4 border-t border-cosmic-primary-800/30">
          <Button asChild className="w-full cosmic-button">
            <Link href={href}>
              <span className="relative z-10">Explore</span>
            </Link>
          </Button>
        </CardFooter>
      </CosmicCard>
    </motion.div>
  );
}
