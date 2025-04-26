"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
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
} from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const modules = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Kundli Maker",
      href: "/dashboard/kundli",
      icon: Star,
    },
    {
      title: "Relationship",
      href: "/dashboard/relationship",
      icon: Heart,
    },
    {
      title: "Career",
      href: "/dashboard/career",
      icon: Briefcase,
    },
    {
      title: "Compatibility",
      href: "/dashboard/compatibility",
      icon: Users,
    },
    {
      title: "Business",
      href: "/dashboard/business",
      icon: Building,
    },
    {
      title: "Gemstone",
      href: "/dashboard/gemstone",
      icon: Gem,
    },
  ]

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
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="text-xl font-bold text-amber-600">Jyotish Guru</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {modules.map((module) => (
            <SidebarMenuItem key={module.href}>
              <SidebarMenuButton asChild isActive={pathname === module.href} tooltip={module.title}>
                <Link href={module.href}>
                  <module.icon />
                  <span>{module.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-6 px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">Account</h3>
          <SidebarMenu>
            {accountLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.title}>
                  <Link href={link.href}>
                    <link.icon />
                    <span>{link.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign out">
              <Link href="/">
                <LogOut />
                <span>Sign out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
