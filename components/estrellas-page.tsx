"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Music,
  Search,
  FileMusic,
  Headphones,
  Mic,
  Clock,
  Star,
  GitFork,
  Play,
  Filter,
  Heart,
  Bookmark,
  X,
  Plus,
} from "lucide-react"
import { MainLayout } from "@/components/main-layout"

export function EstrellasPage() {
  const [activeTab, setActiveTab] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recientes")
  const [typeFilter, setTypeFilter] = useState("todos")

  const starredProjects = [
    {
      id: 1,
      name: "Concierto para Violín en Re Mayor",
      author: "Carlos Ruiz",
      authorAvatar: "CR",
      description: "Concierto para violín y orquesta inspirado en el período romántico",
      type: "partitura",
      lastUpdated: "hace 3 días",
      stars: 78,
      forks: 23,
      plays: 2450,
      dateStarred: "hace 1 día",
    },
    {
      id: 2,
      name: "Ambient Textures Vol. 2",
      author: "Elena Sánchez",
      authorAvatar: "ES",
      description: "Colección de texturas sonoras y paisajes ambientales",
      type: "audio",
      lastUpdated: "hace 1 semana",
      stars: 45,
      forks: 12,
      plays: 1850,
      dateStarred: "hace 3 días",
    },
    {
      id: 3,
      name: "Suite para Piano",
      author: "Luis Fernández",
      authorAvatar: "LF",
      description: "Suite de cinco movimientos para piano solo",
      type: "partitura",
      lastUpdated: "hace 2 semanas",
      stars: 32,
      forks: 8,
      plays: 980,
      dateStarred: "hace 1 semana",
    },
    {
      id: 4,
      name: "Mezcla Final - Álbum 'Ecos'",
      author: "Ana Martín",
      authorAvatar: "AM",
      description: "Mezcla final para el álbum 'Ecos' del grupo Resonancia",
      type: "mezcla",
      lastUpdated: "hace 3 semanas",
      stars: 29,
      forks: 5,
      plays: 750,
      dateStarred: "hace 2 semanas",
    },
    {
      id: 5,
      name: "Cuarteto de Jazz - Improvisaciones",
      author: "Diego Morales",
      authorAvatar: "DM",
      description: "Sesión de improvisaciones para cuarteto de jazz",
      type: "audio",
      lastUpdated: "hace 1 mes",
      stars: 56,
      forks: 14,
      plays: 1650,
      dateStarred: "hace 3 semanas",
    },
  ]

  const filteredProjects = starredProjects
    .filter((project) => {
      // Filtro por búsqueda
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.author.toLowerCase().includes(searchQuery.toLowerCase())

      // Filtro por tipo
      const matchesType = typeFilter === "todos" || project.type === typeFilter

      // Filtro por tab
      if (activeTab === "partituras") return matchesSearch && project.type === "partitura"
      if (activeTab === "audio") return matchesSearch && project.type === "audio"
      if (activeTab === "mezclas") return matchesSearch && project.type === "mezcla"
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      // Ordenamiento
      if (sortBy === "recientes") {
        return starredProjects.indexOf(a) - starredProjects.indexOf(b) // Mantener el orden original
      } else if (sortBy === "nombre") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "estrellas") {
        return b.stars - a.stars
      } else if (sortBy === "reproducciones") {
        return b.plays - a.plays
      }
      return 0
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
        return <Music className="w-8 h-8 text-primary" />
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

  return (
    <MainLayout>
      <div className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Star className="w-8 h-8 text-primary" />
              Favoritos
            </h1>
            <p className="text-muted-foreground mt-1">Proyectos musicales que has marcado como favoritos</p>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="partituras">Partituras</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="mezclas">Mezclas</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar favoritos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recientes">Más recientes</SelectItem>
                  <SelectItem value="nombre">Nombre</SelectItem>
                  <SelectItem value="estrellas">Estrellas</SelectItem>
                  <SelectItem value="reproducciones">Reproducciones</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de proyectos favoritos */}
        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(project.type)}
                      <div>
                        <Link
                          href={`/repo/${project.author}/${project.id}`}
                          className="text-xl font-bold hover:text-primary hover:underline"
                        >
                          {project.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback>{project.authorAvatar}</AvatarFallback>
                            </Avatar>
                            <Link href={`/profile/${project.author}`} className="text-sm text-primary hover:underline">
                              {project.author}
                            </Link>
                          </div>
                          <Badge variant="outline">{getTypeLabel(project.type)}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Marcado {project.dateStarred}</span>
                      <Button variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-600">
                        <Star className="w-4 h-4 fill-yellow-500" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-3 mb-4">{project.description}</p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Actualizado {project.lastUpdated}</span>
                      </div>
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

                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Abrir
                      </Button>
                      <Button variant="outline" size="sm">
                        <GitFork className="w-4 h-4 mr-2" />
                        Fork
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <X className="w-4 h-4 mr-2" />
                        Quitar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <Heart className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
                <h3 className="text-xl font-medium mb-2">No se encontraron favoritos</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? `No hay resultados para "${searchQuery}"`
                    : "Marca proyectos como favoritos para acceder rápidamente a ellos"}
                </p>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Explorar Proyectos
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Colecciones */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Colecciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Inspiración Clásica</h3>
                    <p className="text-sm text-muted-foreground">12 proyectos</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Colección de obras clásicas que me inspiran</p>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Colección
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Técnicas de Jazz</h3>
                    <p className="text-sm text-muted-foreground">8 proyectos</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Referencias de improvisación y armonía jazz</p>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Colección
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-1">Nueva Colección</h3>
                <p className="text-sm text-muted-foreground mb-4">Organiza tus favoritos en colecciones</p>
                <Button variant="outline" size="sm">
                  Crear Colección
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
