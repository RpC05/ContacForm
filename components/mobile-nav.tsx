"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  Home,
  TrendingUp,
  FolderIcon as FolderMusic,
  Star,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Music,
} from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            MelodicHub
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          {/* User Profile */}
          <Link href="/profile/maria-gonzalez" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">María González</div>
                <div className="text-xs text-muted-foreground">@mariagonzalez</div>
              </div>
            </div>
          </Link>

          {/* New Project Button */}
          <Button className="w-full mb-4" size="sm" asChild onClick={() => setOpen(false)}>
            <Link href="/new">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Link>
          </Button>

          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
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
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
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

            <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
              <Link href="/login">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Link>
            </Button>
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
      </SheetContent>
    </Sheet>
  )
}
