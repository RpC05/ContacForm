"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Music,
  Search,
  TrendingUp,
  Star,
  GitFork,
  Play,
  Headphones,
  Clock,
  Users,
  FileMusic,
  Mic,
  Zap,
  Calendar,
  Filter,
  BarChart2,
  Bookmark,
  Share2,
} from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { AudioPlayer } from "@/components/audio-player"

export function HomePage() {
  const [activeTab, setActiveTab] = useState("destacados")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredProjects = [
    {
      id: 1,
      title: "Sinfonía en Do Mayor",
      author: "María González",
      authorAvatar: "MG",
      description: "Una composición orquestal inspirada en el estilo clásico de Beethoven",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "partitura",
      genre: "Clásica",
      stars: 45,
      forks: 12,
      plays: 1250,
      lastUpdated: "hace 2 días",
      license: "Creative Commons",
      hasAudio: true,
      audioPreview: "/placeholder.svg",
      collaborators: 3,
    },
    {
      id: 2,
      title: "Jazz Fusion Experiment",
      author: "Carlos Ruiz",
      authorAvatar: "CR",
      description: "Exploración de ritmos de jazz fusionados con elementos electrónicos",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "audio",
      genre: "Jazz",
      stars: 32,
      forks: 8,
      plays: 980,
      lastUpdated: "hace 5 días",
      license: "Todos los derechos reservados",
      hasAudio: true,
      audioPreview: "/placeholder.svg",
      collaborators: 2,
    },
    {
      id: 3,
      title: "Cuarteto de Cuerdas No. 2",
      author: "Ana Martín",
      authorAvatar: "AM",
      description: "Composición contemporánea para cuarteto de cuerdas",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "partitura",
      genre: "Contemporánea",
      stars: 28,
      forks: 5,
      plays: 750,
      lastUpdated: "hace 1 semana",
      license: "Creative Commons",
      hasAudio: true,
      audioPreview: "/placeholder.svg",
      collaborators: 1,
    },
  ]

  const recentProjects = [
    {
      id: 4,
      title: "Sonata para Piano en Re menor",
      author: "Luis Fernández",
      authorAvatar: "LF",
      description: "Sonata para piano inspirada en el romanticismo",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "partitura",
      genre: "Clásica",
      stars: 15,
      forks: 3,
      plays: 420,
      lastUpdated: "hace 1 día",
      license: "Creative Commons",
      hasAudio: true,
      audioPreview: "/placeholder.svg",
      collaborators: 0,
    },
    {
      id: 5,
      title: "Ambient Landscapes",
      author: "Elena Sánchez",
      authorAvatar: "ES",
      description: "Composición ambiental con texturas sonoras y paisajes electrónicos",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "audio",
      genre: "Ambient",
      stars: 22,
      forks: 4,
      plays: 630,
      lastUpdated: "hace 3 días",
      license: "Todos los derechos reservados",
      hasAudio: true,
      audioPreview: "/placeholder.svg",
      collaborators: 1,
    },
  ]

  const events = [
    {
      title: "Concurso de Composición",
      date: "15 Dic 2024",
      description: "Participa en nuestro concurso mensual de composición",
      type: "concurso",
    },
    {
      title: "Masterclass: Orquestación",
      date: "22 Dic 2024",
      description: "Aprende técnicas avanzadas de orquestación",
      type: "masterclass",
    },
    {
      title: "Jam Session Virtual",
      date: "28 Dic 2024",
      description: "Colabora en tiempo real con músicos de todo el mundo",
      type: "jam",
    },
  ]

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "partitura":
        return <FileMusic className="w-4 h-4 text-blue-500" />
      case "audio":
        return <Headphones className="w-4 h-4 text-green-500" />
      case "mezcla":
        return <Mic className="w-4 h-4 text-purple-500" />
      default:
        return <Music className="w-4 h-4 text-primary" />
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "concurso":
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case "masterclass":
        return <GraduationCap className="w-5 h-5 text-blue-500" />
      case "jam":
        return <Music className="w-5 h-5 text-green-500" />
      default:
        return <Calendar className="w-5 h-5 text-primary" />
    }
  }

  return (
    <MainLayout>
      <div className="container py-6">
        {/* Header con búsqueda */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Music className="w-8 h-8 text-primary" />
              Explora
            </h1>
            <p className="text-muted-foreground mt-1">
              Descubre proyectos musicales destacados y las últimas creaciones
            </p>
          </div>

          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proyectos musicales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs de navegación */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="destacados" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="hidden md:inline">Destacados</span>
            </TabsTrigger>
            <TabsTrigger value="recientes" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden md:inline">Recientes</span>
            </TabsTrigger>
            <TabsTrigger value="siguiendo" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Siguiendo</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido principal */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-8">
              <TabsContent value="destacados" className="mt-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    Proyectos Destacados
                  </h2>

                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recientes" className="mt-0">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Proyectos Recientes
                  </h2>

                  {recentProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="siguiendo" className="mt-0">
                <div className="text-center py-12">
                  <Music className="w-16 h-16 mx-auto text-muted-foreground opacity-20 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aún no sigues a ningún compositor</h3>
                  <p className="text-muted-foreground mb-6">
                    Sigue a compositores para ver sus últimas creaciones en tu feed
                  </p>
                  <Button>
                    <Users className="w-4 h-4 mr-2" />
                    Explorar Compositores
                  </Button>
                </div>
              </TabsContent>

              {/* Sección de géneros - move this inside TabsContent or outside Tabs entirely */}
              <div className="pt-4">
                <h2 className="text-2xl font-bold mb-4">Explora por Género</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Clásica", "Jazz", "Rock", "Electrónica", "Folk", "Pop", "Soundtrack", "Experimental"].map(
                    (genre, index) => (
                      <Button key={index} variant="outline" className="h-auto py-6 flex flex-col gap-2">
                        <Music className="w-6 h-6" />
                        <span>{genre}</span>
                      </Button>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - move inside Tabs */}
            <div className="space-y-6">
              {/* Actividad reciente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">María González</span> actualizó{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Sinfonía en Do Mayor
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">hace 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>CR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Carlos Ruiz</span> comentó en{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Jazz Fusion Experiment
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">hace 5 horas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Ana Martín</span> creó un nuevo proyecto{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Cuarteto de Cuerdas No. 3
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">hace 1 día</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Próximos eventos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        {getEventTypeIcon(event.type)}
                        <div className="font-medium">{event.title}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Ver Todos los Eventos
                  </Button>
                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-primary" />
                    Estadísticas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Proyectos activos</span>
                      <span className="font-bold">12,345</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Colaboraciones</span>
                      <span className="font-bold">5,678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Reproducciones hoy</span>
                      <span className="font-bold">45,890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Nuevos usuarios</span>
                      <span className="font-bold">+234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  )
}

// Componente de tarjeta de proyecto
function ProjectCard({ project }: { project: any }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="md:flex">
        <div className="relative md:w-1/3">
          <img
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 md:h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {project.genre}
            </Badge>
            <Badge
              variant="outline"
              className={`bg-background/80 backdrop-blur-sm ${
                project.type === "partitura"
                  ? "border-blue-500 text-blue-500"
                  : project.type === "audio"
                    ? "border-green-500 text-green-500"
                    : "border-purple-500 text-purple-500"
              }`}
            >
              {project.type === "partitura" ? "🎼 Partitura" : project.type === "audio" ? "🎧 Audio" : "🎚️ Mezcla"}
            </Badge>
          </div>
          {project.hasAudio && (
            <div className="absolute bottom-4 left-4">
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pausar" : "Reproducir"}
              </Button>
            </div>
          )}
        </div>

        <div className="p-6 md:w-2/3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link href={`/repo/${project.author}/${project.id}`} className="hover:underline">
                <h3 className="text-xl font-bold">{project.title}</h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="w-5 h-5">
                  <AvatarFallback>{project.authorAvatar}</AvatarFallback>
                </Avatar>
                <Link href={`/profile/${project.author}`} className="text-sm text-primary hover:underline">
                  {project.author}
                </Link>
                <span className="text-xs text-muted-foreground">• {project.lastUpdated}</span>
              </div>
            </div>

            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Star className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <GitFork className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{project.description}</p>

          {isPlaying && <AudioPlayer className="mb-4" />}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </div>
            <div className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              <span>{project.plays}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>
                {project.collaborators} {project.collaborators === 1 ? "colaborador" : "colaboradores"}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {project.license}
            </Badge>
          </div>

          <div className="flex gap-2 mt-4">
            <Button size="sm">
              <Play className="w-4 h-4 mr-2" />
              Abrir Proyecto
            </Button>
            <Button size="sm" variant="outline">
              <GitFork className="w-4 h-4 mr-2" />
              Fork
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Iconos adicionales
function Trophy(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

function GraduationCap(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function Pause(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="4" height="16" x="6" y="4" />
      <rect width="4" height="16" x="14" y="4" />
    </svg>
  )
}
