"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Music,
  Home,
  Search,
  Users,
  Settings,
  Bell,
  Plus,
  TrendingUp,
  FolderIcon as FolderMusic,
  Star,
  HelpCircle,
  User,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const mainNavItems = [
    { href: "/home", label: "Inicio", icon: Home },
    { href: "/tendencias", label: "Tendencias", icon: TrendingUp },
    { href: "/perfil/repositorios", label: "Mis Proyectos", icon: FolderMusic },
    { href: "/perfil/estrellas", label: "Favoritos", icon: Star },
    { href: "/comunidad", label: "Comunidad", icon: Users },
  ]

  const secondaryNavItems = [
    { href: "/configuracion", label: "Configuración", icon: Settings },
    { href: "/ayuda", label: "Ayuda", icon: HelpCircle },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
              <Music className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="hidden xs:inline">MelodicHub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 ml-6">
              <Link
                href="/home"
                className={`text-sm font-medium ${
                  isActive("/home") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Explorar
              </Link>
              <Link
                href="/tendencias"
                className={`text-sm font-medium ${
                  isActive("/tendencias") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Tendencias
              </Link>
              <Link
                href="/comunidad"
                className={`text-sm font-medium ${
                  isActive("/comunidad") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Comunidad
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Hidden on small mobile */}
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 lg:w-64"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>

            <ThemeToggle />

            {/* New Project Button - Hidden on small mobile */}
            <Button size="sm" className="hidden sm:flex" asChild>
              <Link href="/new">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Nuevo Proyecto</span>
                <span className="md:hidden">Nuevo</span>
              </Link>
            </Button>

            {/* Desktop User Info - Ahora con enlace al perfil */}
            <div className="hidden lg:flex items-center gap-2">
              <Separator orientation="vertical" className="h-8" />
              <Link href="/profile/maria-gonzalez" className="flex items-center gap-2 hover:bg-muted/50 p-2 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">María González</div>
                  <div className="text-xs text-muted-foreground">@mariagonzalez</div>
                </div>
              </Link>
            </div>

            {/* Mobile Profile Link */}
            <Button variant="ghost" size="icon" className="lg:hidden" asChild>
              <Link href="/profile/maria-gonzalez">
                <User className="w-5 h-5" />
              </Link>
            </Button>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r bg-muted/10 min-h-[calc(100vh-64px)] sticky top-16 hidden lg:block">
          <div className="p-4">
            <div className="mb-6">
              <Button className="w-full" size="sm" asChild>
                <Link href="/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Proyecto
                </Link>
              </Button>
            </div>

            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}

              <Separator className="my-4" />

              {secondaryNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Music className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Plan Pro</div>
                  <div className="text-xs text-muted-foreground">Renovación: 15/12/24</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Gestionar Plan
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
