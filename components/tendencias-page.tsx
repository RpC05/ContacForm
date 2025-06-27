"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Music,
  Search,
  TrendingUp,
  Star,
  GitFork,
  Play,
  FileMusic,
  Headphones,
  Mic,
  Filter,
  Globe,
  Users,
  BarChart2,
} from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { AudioPlayer } from "@/components/audio-player"

export function TendenciasPage() {
  const [activeTab, setActiveTab] = useState("semanal")
  const [searchQuery, setSearchQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("todos")
  const [instrumentFilter, setInstrumentFilter] = useState("todos")
  const [isPlaying, setIsPlaying] = useState<number | null>(null)

  const trendingProjects = [
    {
      id: 1,
      rank: 1,
      title: "Concierto para Violín en Re Mayor",
      author: "Carlos Ruiz",
      authorAvatar: "CR",
      description: "Concierto para violín y orquesta inspirado en el período romántico",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "partitura",
      genre: "Clásica",
      instruments: ["Violín", "Orquesta"],
      stars: 78,
      forks: 23,
      plays: 2450,
      growth: "+45%",
      hasAudio: true,
    },
    {
      id: 2,
      rank: 2,
      title: "Ambient Textures Vol. 2",
      author: "Elena Sánchez",
      authorAvatar: "ES",
      description: "Colección de texturas sonoras y paisajes ambientales",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "audio",
      genre: "Ambient",
      instruments: ["Sintetizadores", "Procesadores"],
      stars: 45,
      forks: 12,
      plays: 1850,
      growth: "+32%",
      hasAudio: true,
    },
    {
      id: 3,
      rank: 3,
      title: "Jazz Fusion Collective",
      author: "Diego Morales",
      authorAvatar: "DM",
      description: "Composiciones originales para ensemble de jazz contemporáneo",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "partitura",
      genre: "Jazz",
      instruments: ["Saxofón", "Piano", "Contrabajo", "Batería"],
      stars: 56,
      forks: 14,
      plays: 1650,
      growth: "+28%",
      hasAudio: true,
    },
    {
      id: 4,
      rank: 4,
      title: "Suite para Piano",
      author: "Luis Fernández",
      authorAvatar: "LF",
      description: "Suite de cinco movimientos para piano solo",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "partitura",
      genre: "Clásica",
      instruments: ["Piano"],
      stars: 32,
      forks: 8,
      plays: 980,
      growth: "+15%",
      hasAudio: true,
    },
    {
      id: 5,
      rank: 5,
      title: "Orquestación Moderna",
      author: "Ana Martín",
      authorAvatar: "AM",
      description: "Técnicas de orquestación contemporánea con ejemplos prácticos",
      coverImage: "/placeholder.svg?height=200&width=400",
      type: "partitura",
      genre: "Contemporánea",
      instruments: ["Orquesta Completa"],
      stars: 29,
      forks: 5,
      plays: 750,
      growth: "+12%",
      hasAudio: false,
    },
  ]

  const risingStars = [
    {
      id: 6,
      title: "Minimalismo Electrónico",
      author: "Javier Torres",
      authorAvatar: "JT",
      type: "audio",
      genre: "Electrónica",
      growth: "+120%",
      plays: 450,
    },
    {
      id: 7,
      title: "Cuarteto de Cuerdas No. 3",
      author: "Sofía Ramírez",
      authorAvatar: "SR",
      type: "partitura",
      genre: "Clásica",
      growth: "+95%",
      plays: 320,
    },
    {
      id: 8,
      title: "Percusión Latinoamericana",
      author: "Miguel Ángel López",
      authorAvatar: "ML",
      type: "audio",
      genre: "World",
      growth: "+82%",
      plays: 280,
    },
  ]

  const topComposers = [
    {
      rank: 1,
      name: "Carlos Ruiz",
      avatar: "CR",
      projects: 24,
      followers: 1250,
      genre: "Clásica",
    },
    {
      rank: 2,
      name: "Elena Sánchez",
      avatar: "ES",
      projects: 18,
      followers: 980,
      genre: "Ambient/Electrónica",
    },
    {
      rank: 3,
      name: "Diego Morales",
      avatar: "DM",
      projects: 32,
      followers: 870,
      genre: "Jazz",
    },
  ]

  const genres = [
    "Clásica",
    "Jazz",
    "Electrónica",
    "Rock",
    "Pop",
    "Folk",
    "Ambient",
    "Contemporánea",
    "World",
    "Soundtrack",
    "Experimental",
  ]

  const instruments = [
    "Piano",
    "Guitarra",
    "Violín",
    "Flauta",
    "Saxofón",
    "Batería",
    "Sintetizadores",
    "Voz",
    "Orquesta",
    "Cuarteto de Cuerdas",
    "Ensemble",
  ]

  const filteredProjects = trendingProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesGenre = genreFilter === "todos" || project.genre === genreFilter

    const matchesInstrument =
      instrumentFilter === "todos" || (project.instruments && project.instruments.some((i) => i === instrumentFilter))

    return matchesSearch && matchesGenre && matchesInstrument
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "partitura":
        return <FileMusic className="w-5 h-5 text-blue-500" />
      case "audio":
        return <Headphones className="w-5 h-5 text-green-500" />
      case "mezcla":
        return <Mic className="w-5 h-5 text-purple-500" />
      default:
        return <Music className="w-5 h-5 text-primary" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "partitura":
        return "🎼 Partitura"
      case "audio":
        return "🎧 Audio"
      case "mezcla":
        return "🎚️ Mezcla"
      default:
        return "🎵 Proyecto"
    }
  }

  const handlePlayToggle = (id: number) => {
    if (isPlaying === id) {
      setIsPlaying(null)
    } else {
      setIsPlaying(id)
    }
  }

  return (
    <MainLayout>
      <div className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              Tendencias
            </h1>
            <p className="text-muted-foreground mt-1">Descubre los proyectos musicales más populares y en tendencia</p>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="semanal">Esta Semana</TabsTrigger>
              <TabsTrigger value="mensual">Este Mes</TabsTrigger>
              <TabsTrigger value="anual">Este Año</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tendencias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los géneros</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={instrumentFilter} onValueChange={setInstrumentFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Instrumento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los instrumentos</SelectItem>
                  {instruments.map((instrument) => (
                    <SelectItem key={instrument} value={instrument}>
                      {instrument}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                Top 5 Proyectos
              </h2>

              {filteredProjects.length > 0 ? (
                <div className="space-y-6">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-md transition-all">
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
                              {getTypeLabel(project.type)}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="default" className="text-lg font-bold">
                              #{project.rank}
                            </Badge>
                          </div>
                          {project.hasAudio && (
                            <div className="absolute bottom-4 left-4">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-background/80 backdrop-blur-sm"
                                onClick={() => handlePlayToggle(project.id)}
                              >
                                {isPlaying === project.id ? (
                                  <Pause className="w-4 h-4 mr-2" />
                                ) : (
                                  <Play className="w-4 h-4 mr-2" />
                                )}
                                {isPlaying === project.id ? "Pausar" : "Reproducir"}
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
                                <Link
                                  href={`/profile/${project.author}`}
                                  className="text-sm text-primary hover:underline"
                                >
                                  {project.author}
                                </Link>
                              </div>
                            </div>

                            <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                              <TrendingUp className="w-3 h-3" />
                              {project.growth}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-4">{project.description}</p>

                          {isPlaying === project.id && <AudioPlayer className="mb-4" />}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
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
                          </div>

                          {project.instruments && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.instruments.map((instrument, index) => (
                                <Badge key={index} variant="outline">
                                  {instrument}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Abrir Proyecto
                            </Button>
                            <Button size="sm" variant="outline">
                              <Star className="w-4 h-4 mr-2" />
                              Favorito
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="py-12">
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <TrendingUp className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No se encontraron proyectos</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery
                        ? `No hay resultados para "${searchQuery}"`
                        : "Prueba con otros filtros para encontrar proyectos"}
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setGenreFilter("todos")
                        setInstrumentFilter("todos")
                      }}
                    >
                      Limpiar Filtros
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Estrellas en ascenso */}
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                Estrellas en Ascenso
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                {risingStars.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        {getTypeIcon(project.type)}
                        <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          {project.growth}
                        </Badge>
                      </div>
                      <Link href={`/repo/${project.author}/${project.id}`} className="hover:underline">
                        <h3 className="font-bold mb-1">{project.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-4 h-4">
                          <AvatarFallback>{project.authorAvatar}</AvatarFallback>
                        </Avatar>
                        <Link href={`/profile/${project.author}`} className="text-xs text-primary hover:underline">
                          {project.author}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {project.genre}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          <span>{project.plays}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Explorar por género */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Explorar por Género</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {genres.slice(0, 8).map((genre, index) => (
                  <Button key={index} variant="outline" className="h-auto py-6 flex flex-col gap-2">
                    <Music className="w-6 h-6" />
                    <span>{genre}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top compositores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Top Compositores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topComposers.map((composer, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-xl font-bold text-muted-foreground w-6 text-center">{composer.rank}</div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{composer.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link
                        href={`/profile/${composer.name}`}
                        className="font-medium hover:text-primary hover:underline"
                      >
                        {composer.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">{composer.genre}</div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Music className="w-3 h-3" />
                          <span>{composer.projects}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{composer.followers}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Seguir
                    </Button>
                  </div>
                ))}
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
                    <span className="text-sm">Proyectos en tendencia</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Nuevos esta semana</span>
                    <span className="font-bold">+23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Reproducciones totales</span>
                    <span className="font-bold">45.8K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Crecimiento promedio</span>
                    <span className="font-bold text-green-600">+18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Géneros populares */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Géneros Populares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Clásica", "Jazz", "Electrónica", "Ambient", "Contemporánea"].map((genre, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{genre}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.max(20, 100 - index * 15)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">
                          {Math.max(20, 100 - index * 15)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
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
