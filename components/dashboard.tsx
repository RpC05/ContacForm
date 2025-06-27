"use client"

import { useState } from "react"
import {
  Plus,
  Users,
  Star,
  GitBranch,
  Clock,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Download,
  Share2,
  Eye,
  MessageSquare,
  Folder,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - replace with real data
  const recentRepositories = [
    {
      id: 1,
      name: "symphony-no-9",
      description: "Beethoven's 9th Symphony - Collaborative arrangement",
      owner: "beethoven-collective",
      language: "MusicXML",
      stars: 234,
      forks: 45,
      lastCommit: "2 hours ago",
      isPrivate: false,
      collaborators: 8,
      status: "active",
    },
    {
      id: 2,
      name: "jazz-standards",
      description: "Collection of jazz standards with chord progressions",
      owner: "jazz-masters",
      language: "Lead Sheet",
      stars: 189,
      forks: 67,
      lastCommit: "1 day ago",
      isPrivate: false,
      collaborators: 12,
      status: "active",
    },
    {
      id: 3,
      name: "my-compositions",
      description: "Personal compositions and arrangements",
      owner: "you",
      language: "MIDI",
      stars: 23,
      forks: 3,
      lastCommit: "3 days ago",
      isPrivate: true,
      collaborators: 2,
      status: "draft",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "commit",
      user: "maria-composer",
      action: "pushed 3 commits to",
      target: "symphony-no-9",
      time: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      type: "star",
      user: "john-musician",
      action: "starred",
      target: "jazz-standards",
      time: "4 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      type: "fork",
      user: "sarah-arranger",
      action: "forked",
      target: "classical-pieces",
      time: "6 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      type: "pull_request",
      user: "alex-violinist",
      action: "opened a pull request in",
      target: "orchestra-suite",
      time: "1 day ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const trendingProjects = [
    {
      id: 1,
      name: "ai-composition-tools",
      description: "AI-powered composition assistance",
      stars: 1234,
      language: "Python",
      trend: "+45%",
    },
    {
      id: 2,
      name: "virtual-orchestra",
      description: "Virtual orchestra simulation",
      stars: 987,
      language: "JavaScript",
      trend: "+32%",
    },
    {
      id: 3,
      name: "sheet-music-ocr",
      description: "OCR for sheet music digitization",
      stars: 756,
      language: "Python",
      trend: "+28%",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Collaborative Composition Workshop",
      date: "2024-01-15",
      time: "14:00",
      participants: 24,
    },
    {
      id: 2,
      title: "Jazz Improvisation Session",
      date: "2024-01-18",
      time: "19:00",
      participants: 12,
    },
    {
      id: 3,
      title: "Classical Music Hackathon",
      date: "2024-01-22",
      time: "09:00",
      participants: 156,
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard Musical
          </h1>
          <p className="text-muted-foreground">Gestiona tus proyectos musicales y colaboraciones</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Profile Access Button */}
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/profile/maria-gonzalez">
              <Avatar className="w-5 h-5">
                <AvatarImage src="/placeholder.svg?height=20&width=20" />
                <AvatarFallback className="text-xs">MG</AvatarFallback>
              </Avatar>
              Mi Perfil
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
            <Badge variant="destructive" className="ml-1">
              3
            </Badge>
          </Button>
          <Button
            asChild
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Link href="/new">
              <Plus className="w-4 h-4" />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repositorios</CardTitle>
            <Folder className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 este mes</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200 dark:border-pink-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12 esta semana</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estrellas</CardTitle>
            <Star className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+89 esta semana</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commits</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+23 esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="repositories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="repositories">Repositorios</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="trending">Tendencias</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
        </TabsList>

        <TabsContent value="repositories" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar repositorios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentRepositories.map((repo) => (
              <Card key={repo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/repo/${repo.owner}/${repo.name}`}
                          className="text-lg font-semibold hover:text-purple-600 transition-colors"
                        >
                          {repo.name}
                        </Link>
                        {repo.isPrivate && <Badge variant="secondary">Privado</Badge>}
                        <Badge variant={repo.status === "active" ? "default" : "secondary"}>{repo.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{repo.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          {repo.language}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4" />
                          {repo.forks}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {repo.collaborators}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Actualizado {repo.lastCommit}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-1" />
                          Reproducir
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/repo/${repo.owner}/${repo.name}`}>Ver Proyecto</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Últimas acciones en tus proyectos y colaboraciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{activity.user[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                        <Link
                          href={`/repo/owner/${activity.target}`}
                          className="font-medium text-purple-600 hover:underline"
                        >
                          {activity.target}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.type === "commit" && <GitBranch className="w-4 h-4 text-green-600" />}
                      {activity.type === "star" && <Star className="w-4 h-4 text-yellow-600" />}
                      {activity.type === "fork" && <GitBranch className="w-4 h-4 text-blue-600" />}
                      {activity.type === "pull_request" && <MessageSquare className="w-4 h-4 text-purple-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Proyectos en Tendencia
              </CardTitle>
              <CardDescription>Los proyectos musicales más populares esta semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/repo/owner/${project.name}`}
                          className="font-medium hover:text-purple-600 transition-colors"
                        >
                          {project.name}
                        </Link>
                        <Badge variant="secondary" className="text-green-600">
                          {project.trend}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          {project.language}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Star className="w-4 h-4 mr-1" />
                      Seguir
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Próximos Eventos
              </CardTitle>
              <CardDescription>Workshops, sesiones y eventos de la comunidad musical</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <span className="text-xs font-medium">
                        {new Date(event.date).toLocaleDateString("es-ES", { month: "short" }).toUpperCase()}
                      </span>
                      <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants} participantes
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Más Info
                      </Button>
                      <Button size="sm">Unirse</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
