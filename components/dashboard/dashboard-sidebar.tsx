"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Star,
  Heart,
  Briefcase,
  Users,
  Building,
  Gem,
  Home,
  Settings,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  JyotishGuruLogo,
  KundliIcon,
  RelationshipIcon,
  CareerIcon,
  CompatibilityIcon,
  BusinessIcon,
  GemstoneIcon,
} from "@/components/ui/cosmic-elements";

export function DashboardSidebar() {
  const pathname = usePathname();

  const modules = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      customIcon: null,
    },
    {
      title: "Kundli Maker",
      href: "/dashboard/kundli",
      icon: Star,
      customIcon: KundliIcon,
    },
    {
      title: "Relationship",
      href: "/dashboard/relationship",
      icon: Heart,
      customIcon: RelationshipIcon,
    },
    {
      title: "Career",
      href: "/dashboard/career",
      icon: Briefcase,
      customIcon: CareerIcon,
    },
    {
      title: "Compatibility",
      href: "/dashboard/compatibility",
      icon: Users,
      customIcon: CompatibilityIcon,
    },
    {
      title: "Business",
      href: "/dashboard/business",
      icon: Building,
      customIcon: BusinessIcon,
    },
    {
      title: "Gemstone",
      href: "/dashboard/gemstone",
      icon: Gem,
      customIcon: GemstoneIcon,
    },
  ];

  const accountLinks = [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Subscription",
      href: "/dashboard/subscription",
      icon: CreditCard,
    },
    {
      title: "Help & Support",
      href: "/dashboard/support",
      icon: HelpCircle,
    },
  ];

  return (
    <Sidebar className="bg-indigo-950/60 backdrop-blur-md border-r border-white/10">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-4">
          <JyotishGuruLogo />
          <motion.span
            className="text-xl font-cosmic gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Jyotish Guru
          </motion.span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {modules.map((module, index) => (
            <SidebarMenuItem key={module.href}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SidebarMenuButton
                  asChild
                  isActive={pathname === module.href}
                  tooltip={module.title}
                  className={`text-slate-300 hover:text-purple-300 hover:bg-purple-900/20 ${
                    pathname === module.href
                      ? "bg-purple-900/30 text-purple-300"
                      : ""
                  }`}
                >
                  <Link href={module.href}>
                    {module.customIcon ? (
                      <module.customIcon className="w-5 h-5" />
                    ) : (
                      <module.icon
                        className={
                          pathname === module.href ? "text-purple-300" : ""
                        }
                      />
                    )}
                    <span>{module.title}</span>
                    {pathname === module.href && (
                      <motion.div
                        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r"
                        layoutId="sidebar-active-indicator"
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </motion.div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-6 px-3 py-2">
          <div className="cosmic-divider" />
          <h3 className="mb-2 px-4 text-xs font-medium text-slate-400">
            Account
          </h3>
          <SidebarMenu>
            {accountLinks.map((link, index) => (
              <SidebarMenuItem key={link.href}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={link.title}
                    className={`text-slate-300 hover:text-purple-300 hover:bg-purple-900/20 ${
                      pathname === link.href
                        ? "bg-purple-900/30 text-purple-300"
                        : ""
                    }`}
                  >
                    <Link href={link.href}>
                      <link.icon
                        className={
                          pathname === link.href ? "text-purple-300" : ""
                        }
                      />
                      <span>{link.title}</span>
                      {pathname === link.href && (
                        <motion.div
                          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r"
                          layoutId="sidebar-active-indicator"
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </motion.div>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="cosmic-divider" />
        <SidebarMenu>
          <SidebarMenuItem>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <SidebarMenuButton
                asChild
                tooltip="Sign out"
                className="text-slate-300 hover:text-purple-300 hover:bg-purple-900/20"
              >
                <Link href="/">
                  <LogOut />
                  <span>Sign out</span>
                </Link>
              </SidebarMenuButton>
            </motion.div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
