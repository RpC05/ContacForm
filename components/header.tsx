import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Music className="w-6 h-6 text-primary" />
          MelodicHub
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium hover:text-primary">
            Características
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary">
            Precios
          </Link>
          <Link href="/community" className="text-sm font-medium hover:text-primary">
            Comunidad
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-primary">
            Documentación
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
