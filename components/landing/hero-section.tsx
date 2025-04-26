import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              AI-Powered Astrology
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-amber-600">Jyotish</span> Guru
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover your cosmic path with our AI-powered astrological guidance. Get personalized insights about your
              life, relationships, and future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Link href="/auth/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md rounded-full bg-amber-100 p-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-amber-50 opacity-80"></div>
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Jyotish Guru Illustration"
              width={600}
              height={600}
              className="relative z-10 rounded-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
