import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface ModuleCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  href: string
}

export function ModuleCard({ title, description, icon: Icon, color, href }: ModuleCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-4">
          <div className={`rounded-lg p-3 ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-4">
        <Button asChild className="w-full">
          <Link href={href}>Explore</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
