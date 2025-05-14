"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { JyotishGuruLogo } from "@/components/ui/cosmic-elements";

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-indigo-950/40 border-b border-white/10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger className="md:hidden" />
          <Link href="/dashboard" className="flex items-center gap-2">
            <JyotishGuruLogo className="hidden md:block" />
            <motion.span
              className="font-cosmic text-xl gradient-text hidden md:inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Jyotish Guru
            </motion.span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-purple-300 hover:text-purple-200 hover:bg-purple-900/20"
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              </Button>
            </motion.div>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full text-purple-300 hover:text-purple-200 hover:bg-purple-900/20 cosmic-ring"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="cosmic-glass">
                <DropdownMenuLabel className="text-slate-300">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  asChild
                  className="text-slate-200 focus:bg-purple-900/30 focus:text-white"
                >
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-slate-200 focus:bg-purple-900/30 focus:text-white"
                >
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-slate-200 focus:bg-purple-900/30 focus:text-white"
                >
                  <Link href="/dashboard/subscription">Subscription</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  asChild
                  className="text-slate-200 focus:bg-purple-900/30 focus:text-white"
                >
                  <Link href="/">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
