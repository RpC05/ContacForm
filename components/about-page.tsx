"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Music, Heart, Globe, Users, Target, Lightbulb, Rocket, Quote } from "lucide-react"
import { Header } from "@/components/header"

export function AboutPage() {
  const team = [
    {
      name: "Elena Rodríguez",
      role: "CEO & Fundadora",
      bio: "Compositora y tecnóloga con 15 años de experiencia en la industria musical",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
    {
      name: "Marcus Chen",
      role: "CTO",
      bio: "Ex-ingeniero de Spotify, especialista en IA y procesamiento de audio",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
    {
      name: "Sofia Andersson",
      role: "Head of Product",
      bio: "Diseñadora UX con background en conservatorio y tecnología musical",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
    {
      name: "David Kim",
      role: "Head of AI",
      bio: "PhD en Machine Learning, pionero en IA aplicada a la música",
      avatar: "/placeholder.svg?height=120&width=120",
      linkedin: "#",
    },
  ]

  const values = [
    {
      icon: Music,
      title: "Pasión por la Música",
      description: "Creemos que la música es el lenguaje universal que conecta a la humanidad",
    },
    {
      icon: Users,
      title: "Colaboración",
      description: "Las mejores creaciones nacen cuando los músicos trabajan juntos",
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Utilizamos tecnología de vanguardia para empoderar a los creadores",
    },
    {
      icon: Globe,
      title: "Accesibilidad",
      description: "Democratizamos las herramientas musicales profesionales para todos",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Fundación",
      description: "Elena y Marcus fundan MelodicHub con la visión de revolucionar la colaboración musical",
    },
    {
      year: "2021",
      title: "Primera Ronda",
      description: "Levantamos $2M en seed funding de inversores especializados en música y tecnología",
    },
    {
      year: "2022",
      title: "Lanzamiento Beta",
      description: "1,000 músicos pioneros prueban nuestra plataforma y nos ayudan a perfeccionarla",
    },
    {
      year: "2023",
      title: "IA Musical",
      description: "Lanzamos nuestro motor de IA compositiva, el primero en su clase",
    },
    {
      year: "2024",
      title: "Expansión Global",
      description: "Alcanzamos 50,000 usuarios activos en más de 80 países",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Nuestra Historia
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Revolucionando la Música
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos un equipo apasionado de músicos, ingenieros y visionarios unidos por la misión de democratizar la
            creación musical y empoderar a artistas de todo el mundo.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-purple-600/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Nuestra Misión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Democratizar la creación musical profesional mediante tecnología innovadora, permitiendo que cualquier
                músico, sin importar su ubicación o recursos, pueda crear, colaborar y compartir música de calidad
                mundial.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/5 to-pink-600/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                Nuestra Visión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ser la plataforma líder mundial para la colaboración musical, donde la próxima generación de
                compositores, productores e intérpretes creen las obras maestras que definirán el futuro de la música.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestro Viaje</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start gap-8 mb-8">
                  <div className="hidden md:flex w-16 h-16 bg-primary rounded-full items-center justify-center text-white font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="md:hidden">
                        <Badge className="mb-2">{milestone.year}</Badge>
                      </div>
                      <CardTitle>{milestone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Conoce al Equipo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16 p-8 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestro Impacto</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Músicos Activos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200K+</div>
              <div className="text-muted-foreground">Composiciones</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">80+</div>
              <div className="text-muted-foreground">Países</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Horas de Música</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-purple-600/5">
            <CardContent className="p-8 text-center">
              <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
              <blockquote className="text-2xl font-medium mb-6">
                "MelodicHub no es solo una herramienta, es una revolución. Hemos democratizado la creación musical
                profesional y estamos apenas comenzando."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-bold">Elena Rodríguez</div>
                  <div className="text-muted-foreground">CEO & Fundadora</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres ser parte de la revolución?</h2>
          <p className="text-muted-foreground mb-6">
            Únete a nuestra comunidad de músicos innovadores y ayúdanos a construir el futuro de la música
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                <Music className="w-5 h-5 mr-2" />
                Comenzar Ahora
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/careers">Únete al Equipo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
