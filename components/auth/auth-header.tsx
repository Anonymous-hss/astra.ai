import Link from "next/link"

interface AuthHeaderProps {
  title: string
  description: string
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 text-center mb-8">
      <Link href="/" className="mx-auto">
        <h1 className="text-3xl font-bold text-amber-600">Jyotish Guru</h1>
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
