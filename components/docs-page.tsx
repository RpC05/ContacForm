"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  BookOpen,
  Code,
  Zap,
  Users,
  Camera,
  GitBranch,
  Volume2,
  Shield,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { Header } from "@/components/header"

export function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const sections = [
    {
      title: "Primeros Pasos",
      icon: BookOpen,
      description: "Todo lo que necesitas para comenzar",
      articles: [
        { title: "Crear tu primera cuenta", time: "5 min" },
        { title: "Configurar tu perfil musical", time: "3 min" },
        { title: "Crear tu primer proyecto", time: "10 min" },
        { title: "Invitar colaboradores", time: "5 min" },
      ],
    },
    {
      title: "OCR Musical",
      icon: Camera,
      description: "Digitaliza partituras con IA",
      articles: [
        { title: "Cómo funciona el OCR", time: "8 min" },
        { title: "Mejores prácticas para escaneo", time: "6 min" },
        { title: "Corrección manual de errores", time: "12 min" },
        { title: "Formatos soportados", time: "4 min" },
      ],
    },
    {
      title: "Colaboración",
      icon: Users,
      description: "Trabaja en equipo eficientemente",
      articles: [
        { title: "Edición en tiempo real", time: "10 min" },
        { title: "Gestión de permisos", time: "7 min" },
        { title: "Chat y comentarios", time: "5 min" },
        { title: "Resolución de conflictos", time: "15 min" },
      ],
    },
    {
      title: "Control de Versiones",
      icon: GitBranch,
      description: "Gestiona cambios como un pro",
      articles: [
        { title: "Conceptos básicos de Git musical", time: "12 min" },
        { title: "Crear y fusionar ramas", time: "15 min" },
        { title: "Historial y rollback", time: "8 min" },
        { title: "Etiquetas y releases", time: "6 min" },
      ],
    },
    {
      title: "IA y Automatización",
      icon: Zap,
      description: "Aprovecha el poder de la IA",
      articles: [
        { title: "Sugerencias armónicas", time: "10 min" },
        { title: "Generación de acompañamientos", time: "12 min" },
        { title: "Análisis de estilo", time: "8 min" },
        { title: "Corrección automática", time: "6 min" },
      ],
    },
    {
      title: "API y Desarrollo",
      icon: Code,
      description: "Integra con tus aplicaciones",
      articles: [
        { title: "Autenticación API", time: "15 min" },
        { title: "Endpoints principales", time: "20 min" },
        { title: "Webhooks y eventos", time: "12 min" },
        { title: "SDKs disponibles", time: "8 min" },
      ],
    },
  ]

  const quickLinks = [
    { title: "Guía de inicio rápido", href: "/docs/quick-start", icon: Zap },
    { title: "Referencia API", href: "/docs/api", icon: Code },
    { title: "Ejemplos de código", href: "/docs/examples", icon: BookOpen },
    { title: "Preguntas frecuentes", href: "/docs/faq", icon: Users },
  ]

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.articles.some((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Documentación
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Aprende a usar MelodicHub como un profesional con nuestras guías detalladas
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar en la documentación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {quickLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <link.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{link.title}</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={link.href}>
                    Ver más <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Documentation Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredSections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{article.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.time}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver todas las guías
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Recursos Adicionales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Tutoriales en Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Aprende visualmente con nuestros tutoriales paso a paso</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver en YouTube
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Comunidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Únete a nuestra comunidad para hacer preguntas y compartir</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/community">Unirse al Foro</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Soporte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">¿Necesitas ayuda? Nuestro equipo está aquí para ti</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">Contactar Soporte</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-muted-foreground mb-6">Nuestro equipo está aquí para ayudarte con cualquier pregunta</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Contactar Soporte</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/community">Preguntar en la Comunidad</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
