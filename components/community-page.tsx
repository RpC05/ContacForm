"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Search,
  TrendingUp,
  Calendar,
  MessageSquare,
  Star,
  GitFork,
  Eye,
  Trophy,
  Music,
  BookOpen,
  Mic,
  Award,
  Clock,
} from "lucide-react"
import { Header } from "@/components/header"

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")

  const trendingRepos = [
    {
      name: "Misa Criolla Moderna",
      author: "Luis Fernández",
      description: "Adaptación contemporánea de la misa criolla argentina",
      stars: 89,
      forks: 23,
      views: 456,
      language: "Folk",
      updatedAt: "hace 2 horas",
    },
    {
      name: "Electronic Symphony No. 1",
      author: "DJ Composer",
      description: "Fusión de música electrónica con elementos sinfónicos",
      stars: 67,
      forks: 15,
      views: 234,
      language: "Electronic",
      updatedAt: "hace 1 día",
    },
    {
      name: "Flamenco Fusion Collection",
      author: "Carmen Vega",
      description: "Colección de piezas que fusionan flamenco con jazz",
      stars: 45,
      forks: 12,
      views: 189,
      language: "Flamenco",
      updatedAt: "hace 3 días",
    },
  ]

  const events = [
    {
      title: "Concurso de Composición Mensual",
      description: "Tema: Música para Cine",
      date: "15 Dic 2024",
      time: "18:00 CET",
      participants: 45,
      prize: "€500 + Publicación",
      status: "open",
    },
    {
      title: "Masterclass: Armonía Moderna",
      description: "Con el compositor Juan Carlos Pérez",
      date: "20 Dic 2024",
      time: "19:00 CET",
      participants: 120,
      price: "Gratis",
      status: "upcoming",
    },
    {
      title: "Jam Session Virtual",
      description: "Sesión colaborativa en tiempo real",
      date: "22 Dic 2024",
      time: "21:00 CET",
      participants: 25,
      price: "Gratis",
      status: "upcoming",
    },
  ]

  const forumTopics = [
    {
      title: "¿Cómo mejorar la orquestación en mis composiciones?",
      author: "Miguel Rodríguez",
      replies: 23,
      views: 156,
      lastActivity: "hace 1 hora",
      category: "Composición",
    },
    {
      title: "Compartiendo mi primera sinfonía - Feedback bienvenido",
      author: "Ana García",
      replies: 15,
      views: 89,
      lastActivity: "hace 3 horas",
      category: "Feedback",
    },
    {
      title: "Tutorial: Exportar partituras a diferentes formatos",
      author: "Carlos Martín",
      replies: 8,
      views: 234,
      lastActivity: "hace 1 día",
      category: "Tutoriales",
    },
  ]

  const challenges = [
    {
      title: "Reto de Diciembre: Villancicos Modernos",
      description: "Crea una versión moderna de un villancico tradicional",
      participants: 67,
      deadline: "31 Dic 2024",
      prize: "Destacado en portada",
      difficulty: "Intermedio",
    },
    {
      title: "Desafío Técnico: Composición en 7/8",
      description: "Compón una pieza en compás de 7/8",
      participants: 34,
      deadline: "15 Ene 2025",
      prize: "Masterclass privada",
      difficulty: "Avanzado",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="w-8 h-8" />
              Comunidad Musical
            </h1>
            <p className="text-muted-foreground mt-2">Descubre, colabora y aprende con músicos de todo el mundo</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en la comunidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="discover">Descubrir</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="forums">Foros</TabsTrigger>
            <TabsTrigger value="challenges">Retos</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Tendencias de la Semana
                    </CardTitle>
                    <CardDescription>Los proyectos más populares de la comunidad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trendingRepos.map((repo, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Link
                                href={`/repo/${repo.author.toLowerCase().replace(" ", "")}/${repo.name.toLowerCase().replace(/\s+/g, "-")}`}
                                className="font-semibold text-primary hover:underline"
                              >
                                {repo.name}
                              </Link>
                              <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>
                            </div>
                            <Badge variant="outline">{repo.language}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Avatar className="w-4 h-4">
                                <AvatarFallback className="text-xs">
                                  {repo.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{repo.author}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {repo.stars}
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />
                                {repo.forks}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {repo.views}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actividad Reciente de la Comunidad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>ES</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">Elena Sánchez</span> publicó una nueva composición:{" "}
                            <Link href="#" className="text-primary hover:underline">
                              Nocturno en La menor
                            </Link>
                          </p>
                          <p className="text-xs text-muted-foreground">hace 30 minutos</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>JM</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">José Morales</span> ganó el reto de composición de Noviembre
                          </p>
                          <p className="text-xs text-muted-foreground">hace 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">Laura Ruiz</span> compartió un tutorial sobre armonía jazz
                          </p>
                          <p className="text-xs text-muted-foreground">hace 4 horas</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Compositores Destacados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "María González", badge: "Compositor del Mes", repos: 12, stars: 234 },
                        { name: "Carlos Ruiz", badge: "Mentor Activo", repos: 8, stars: 189 },
                        { name: "Ana Martín", badge: "Colaboradora Top", repos: 15, stars: 156 },
                      ].map((user, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.badge}</div>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <div>{user.repos} repos</div>
                            <div>{user.stars} ⭐</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estadísticas de la Comunidad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Compositores activos</span>
                        <span className="font-bold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Partituras compartidas</span>
                        <span className="font-bold">5,678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Colaboraciones</span>
                        <span className="font-bold">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Horas de música</span>
                        <span className="font-bold">12,345</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant={event.status === "open" ? "default" : "secondary"}>
                        {event.status === "open" ? "Abierto" : "Próximo"}
                      </Badge>
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{event.participants} participantes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="w-4 h-4" />
                        <span>{event.prize || event.price}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">{event.status === "open" ? "Participar" : "Más Info"}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forums" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discusiones Activas</CardTitle>
                <CardDescription>Únete a las conversaciones de la comunidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forumTopics.map((topic, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <Link href="#" className="font-semibold text-primary hover:underline">
                            {topic.title}
                          </Link>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Avatar className="w-4 h-4">
                                <AvatarFallback className="text-xs">
                                  {topic.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{topic.author}</span>
                            </div>
                            <span>{topic.lastActivity}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{topic.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{topic.replies} respuestas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{topic.views} vistas</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      {challenge.title}
                    </CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{challenge.participants} participantes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Fecha límite: {challenge.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="w-4 h-4" />
                        <span>Premio: {challenge.prize}</span>
                      </div>
                      <Badge variant="outline">{challenge.difficulty}</Badge>
                    </div>
                    <Button className="w-full mt-4">Participar en el Reto</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Tutoriales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Introducción a la Armonía</div>
                      <div className="text-xs text-muted-foreground">Por María González</div>
                    </Link>
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Orquestación Básica</div>
                      <div className="text-xs text-muted-foreground">Por Carlos Ruiz</div>
                    </Link>
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Composición para Piano</div>
                      <div className="text-xs text-muted-foreground">Por Ana Martín</div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Plantillas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Cuarteto de Cuerdas</div>
                      <div className="text-xs text-muted-foreground">Plantilla básica</div>
                    </Link>
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Orquesta Sinfónica</div>
                      <div className="text-xs text-muted-foreground">Configuración completa</div>
                    </Link>
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Banda de Jazz</div>
                      <div className="text-xs text-muted-foreground">Instrumentación estándar</div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Masterclasses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Composición Modal</div>
                      <div className="text-xs text-muted-foreground">Próximo viernes</div>
                    </Link>
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Arreglos para Big Band</div>
                      <div className="text-xs text-muted-foreground">Próximo mes</div>
                    </Link>
                    <Link href="#" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="font-medium text-sm">Música para Medios</div>
                      <div className="text-xs text-muted-foreground">En planificación</div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
