"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Music,
  Search,
  Plus,
  FileMusic,
  Headphones,
  Mic,
  Clock,
  Users,
  MoreHorizontal,
  Star,
  GitFork,
  Play,
  Lock,
  Globe,
  Trash2,
  Edit,
  Share2,
} from "lucide-react"
import { MainLayout } from "@/components/main-layout"

export function RepositoriosPage() {
  const [activeTab, setActiveTab] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recientes")
  const [typeFilter, setTypeFilter] = useState("todos")

  const repositories = [
    {
      id: 1,
      name: "Sinfonía en Do Mayor",
      description: "Una composición orquestal inspirada en el estilo clásico de Beethoven",
      type: "partitura",
      lastUpdated: "hace 2 días",
      collaborators: 3,
      isPrivate: false,
      stars: 45,
      forks: 12,
      plays: 1250,
    },
    {
      id: 2,
      name: "Jazz Fusion Experiment",
      description: "Exploración de ritmos de jazz fusionados con elementos electrónicos",
      type: "audio",
      lastUpdated: "hace 5 días",
      collaborators: 2,
      isPrivate: true,
      stars: 32,
      forks: 8,
      plays: 980,
    },
    {
      id: 3,
      name: "Cuarteto de Cuerdas No. 2",
      description: "Composición contemporánea para cuarteto de cuerdas",
      type: "partitura",
      lastUpdated: "hace 1 semana",
      collaborators: 1,
      isPrivate: false,
      stars: 28,
      forks: 5,
      plays: 750,
    },
    {
      id: 4,
      name: "Sonata para Piano en Re menor",
      description: "Sonata para piano inspirada en el romanticismo",
      type: "partitura",
      lastUpdated: "hace 2 semanas",
      collaborators: 0,
      isPrivate: false,
      stars: 15,
      forks: 3,
      plays: 420,
    },
    {
      id: 5,
      name: "Ambient Landscapes",
      description: "Composición ambiental con texturas sonoras y paisajes electrónicos",
      type: "audio",
      lastUpdated: "hace 3 semanas",
      collaborators: 1,
      isPrivate: false,
      stars: 22,
      forks: 4,
      plays: 630,
    },
    {
      id: 6,
      name: "Mezcla Final - Álbum Debut",
      description: "Mezcla final para el álbum debut de la banda Ecos del Silencio",
      type: "mezcla",
      lastUpdated: "hace 1 mes",
      collaborators: 4,
      isPrivate: true,
      stars: 0,
      forks: 0,
      plays: 125,
    },
  ]

  const filteredRepositories = repositories
    .filter((repo) => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = typeFilter === "todos" || repo.type === typeFilter

      if (activeTab === "privados") return matchesSearch && matchesType && repo.isPrivate
      if (activeTab === "publicos") return matchesSearch && matchesType && !repo.isPrivate
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === "recientes") {
        return repositories.indexOf(a) - repositories.indexOf(b)
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
        return <FileMusic className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
      case "audio":
        return <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
      case "mezcla":
        return <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
      default:
        return <Music className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
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
      <div className="container py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <Music className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              Mis Proyectos
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Gestiona tus composiciones, grabaciones y mezclas
            </p>
          </div>

          <Button className="w-full sm:w-auto" asChild>
            <Link href="/new">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="todos" className="text-xs sm:text-sm">
                Todos
              </TabsTrigger>
              <TabsTrigger value="publicos" className="text-xs sm:text-sm">
                Públicos
              </TabsTrigger>
              <TabsTrigger value="privados" className="text-xs sm:text-sm">
                Privados
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proyectos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="partitura">🎼 Partituras</SelectItem>
                  <SelectItem value="audio">🎧 Audio</SelectItem>
                  <SelectItem value="mezcla">🎚️ Mezclas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recientes">Más recientes</SelectItem>
                  <SelectItem value="nombre">Nombre</SelectItem>
                  <SelectItem value="estrellas">Estrellas</SelectItem>
                  <SelectItem value="reproducciones">Reproducciones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de repositorios */}
        <div className="space-y-4">
          {filteredRepositories.length > 0 ? (
            filteredRepositories.map((repo) => (
              <Card key={repo.id} className="hover:shadow-md transition-all">
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {getTypeIcon(repo.type)}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/repo/mariagonzalez/${repo.id}`}
                              className="text-lg sm:text-xl font-bold hover:text-primary hover:underline block truncate"
                            >
                              {repo.name}
                            </Link>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {getTypeLabel(repo.type)}
                              </Badge>
                              {repo.isPrivate ? (
                                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                                  <Lock className="w-3 h-3" />
                                  Privado
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                  <Globe className="w-3 h-3" />
                                  Público
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-muted-foreground mb-4 text-sm sm:text-base line-clamp-2">{repo.description}</p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Actualizado {repo.lastUpdated}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>
                            {repo.collaborators} {repo.collaborators === 1 ? "colaborador" : "colaboradores"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{repo.forks}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{repo.plays}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t p-4 flex flex-col sm:flex-row justify-between gap-3">
                      <Button className="flex-1 sm:flex-none" asChild>
                        <Link href={`/repo/mariagonzalez/${repo.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Abrir
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          <Edit className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Editar</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          <Share2 className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Compartir</span>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 flex-1 sm:flex-none">
                          <Trash2 className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="py-8 sm:py-12">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <Music className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground opacity-20 mb-4" />
                <h3 className="text-lg sm:text-xl font-medium mb-2">No se encontraron proyectos</h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  {searchQuery
                    ? `No hay resultados para "${searchQuery}"`
                    : "Crea tu primer proyecto musical para comenzar"}
                </p>
                <Button asChild>
                  <Link href="/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Nuevo Proyecto
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Estadísticas */}
        <div className="mt-6 sm:mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Resumen de Proyectos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{repositories.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Proyectos Totales</div>
                </div>
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {repositories.filter((r) => r.type === "partitura").length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Partituras</div>
                </div>
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {repositories.filter((r) => r.type === "audio").length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Audio</div>
                </div>
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {repositories.filter((r) => r.type === "mezcla").length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Mezclas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
