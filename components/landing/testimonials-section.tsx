import Image from "next/image"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Marketing Professional",
      content:
        "The career guidance I received was incredibly accurate. The AI understood my birth chart and provided insights that helped me make an important career decision.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Rahul Patel",
      role: "Entrepreneur",
      content:
        "Business Guruji helped me understand the best timing for launching my new venture. The insights were practical and aligned perfectly with traditional Vedic astrology.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Ananya Desai",
      role: "Teacher",
      content:
        "The relationship compatibility analysis was eye-opening. It helped me understand patterns in my relationship and provided guidance on how to improve communication.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-amber-50">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover how Jyotish Guru has helped people find clarity and guidance.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
