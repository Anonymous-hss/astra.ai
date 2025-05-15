"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Heart,
  Briefcase,
  Users,
  Gem,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  Star,
  X,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import {
  KundliIcon,
  RelationshipIcon,
  CareerIcon,
  CompatibilityIcon,
  BusinessIcon,
  GemstoneIcon,
} from "@/components/ui/cosmic-elements";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const mainItems = [
    {
      name: "Kundli Maker",
      href: "/dashboard/kundli",
      icon: Star,
      customIcon: KundliIcon,
    },
    {
      name: "Relationship",
      href: "/dashboard/relationship",
      icon: Heart,
      customIcon: RelationshipIcon,
    },
    {
      name: "Career",
      href: "/dashboard/career",
      icon: BarChart3,
      customIcon: CareerIcon,
    },
    {
      name: "Compatibility",
      href: "/dashboard/compatibility",
      icon: Users,
      customIcon: CompatibilityIcon,
    },
    {
      name: "Business",
      href: "/dashboard/business",
      icon: Briefcase,
      customIcon: BusinessIcon,
    },
    {
      name: "Gemstone",
      href: "/dashboard/gemstone",
      icon: Gem,
      customIcon: GemstoneIcon,
    },
  ];

  const accountItems = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Subscription",
      href: "/dashboard/subscription",
      icon: CreditCard,
    },
    {
      name: "Support",
      href: "/dashboard/support",
      icon: HelpCircle,
    },
  ];

  if (!isOpen && isMobile) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-sidebar pt-16 transition-transform duration-300 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
      {...props}
    >
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={toggleSidebar}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      )}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
              Modules
            </h3>
            <div className="space-y-1">
              {mainItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80"
                  )}
                >
                  <Link href={item.href} className="flex items-center">
                    {item.customIcon ? (
                      <item.customIcon className="mr-2 h-5 w-5" />
                    ) : (
                      <item.icon className="mr-2 h-5 w-5" />
                    )}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
              Account
            </h3>
            <div className="space-y-1">
              {accountItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className={cn(
                    "w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="rounded-md bg-sidebar-accent/50 p-3">
          <h4 className="mb-1 text-sm font-medium text-sidebar-foreground">
            Upgrade to Premium
          </h4>
          <p className="text-xs text-sidebar-foreground/70">
            Get unlimited readings and personalized insights.
          </p>
          <Button
            asChild
            className="mt-2 w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          >
            <Link href="/dashboard/subscription">Upgrade Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
