"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  Users,
  MessageSquare,
  Clock,
  GitBranch,
  Save,
  Share2,
  Settings,
  Plus,
  Edit3,
  Music,
  Headphones,
  ChevronLeft,
} from "lucide-react"
import { SheetMusicEditor } from "@/components/sheet-music-editor"

interface RepositoryMusicspaceProps {
  owner: string
  name: string
  branch?: string
}

export function RepositoryMusicspace({ owner, name, branch = "main" }: RepositoryMusicspaceProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(240) // 4 minutos
  const [tempo, setTempo] = useState([120])
  const [volume, setVolume] = useState([75])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const collaborators = [
    { name: "María González", avatar: "MG", status: "online", lastEdit: "hace 2 min" },
    { name: "Carlos Ruiz", avatar: "CR", status: "online", lastEdit: "hace 5 min" },
    { name: "Ana Martín", avatar: "AM", status: "offline", lastEdit: "hace 1 hora" },
  ]

  const comments = [
    {
      id: 1,
      user: "Carlos Ruiz",
      avatar: "CR",
      measure: 32,
      comment: "Sugiero un crescendo más gradual aquí",
      time: "hace 30 min",
      resolved: false,
    },
    {
      id: 2,
      user: "Ana Martín",
      avatar: "AM",
      measure: 45,
      comment: "¿Podríamos cambiar la articulación a staccato?",
      time: "hace 2 horas",
      resolved: true,
    },
    {
      id: 3,
      user: "María González",
      avatar: "MG",
      measure: 67,
      comment: "Excelente modulación en esta sección",
      time: "hace 3 horas",
      resolved: false,
    },
  ]

  const editHistory = [
    {
      id: 1,
      user: "Carlos Ruiz",
      avatar: "CR",
      action: "Modificó dinámicas",
      detail: "Compases 32-35: Añadido crescendo gradual",
      time: "hace 30 min",
      branch: "main",
    },
    {
      id: 2,
      user: "Ana Martín",
      avatar: "AM",
      action: "Editó articulaciones",
      detail: "Compases 45-48: Cambio a staccato en violines",
      time: "hace 2 horas",
      branch: "main",
    },
    {
      id: 3,
      user: "María González",
      avatar: "MG",
      action: "Añadió ornamentación",
      detail: "Compás 67: Trino en flauta principal",
      time: "hace 3 horas",
      branch: "main",
    },
    {
      id: 4,
      user: "Carlos Ruiz",
      avatar: "CR",
      action: "Corrigió armonía",
      detail: "Compás 89: Resolución de séptima dominante",
      time: "hace 1 día",
      branch: "main",
    },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSave = () => {
    setHasUnsavedChanges(false)
    // Simular guardado
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header simplificado */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
              <Music className="w-6 h-6 text-primary" />
              MelodicHub
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 text-sm">
              <Link href={`/profile/${owner}`} className="text-primary hover:underline">
                {owner}
              </Link>
              <span>/</span>
              <Link href={`/repo/${owner}/${name}`} className="hover:underline">
                {name}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/profile/maria-gonzalez`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Navegación del repositorio */}
      <div className="border-b bg-muted/20">
        <div className="container py-2">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/repo/${owner}/${name}`}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Volver al repositorio
              </Link>
            </Button>
            <Badge variant="outline">{branch}</Badge>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* MusicSpace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Music className="w-6 h-6 text-primary" />
                MusicSpace
              </h1>
              <Badge variant="default">En vivo</Badge>
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="text-xs">
                  Cambios sin guardar
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">Entorno colaborativo para editar "{name}" en tiempo real</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir sesión
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!hasUnsavedChanges}>
              <Save className="w-4 h-4 mr-2" />
              Guardar cambios
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Editor Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Controles de Reproducción */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button onClick={togglePlayback} size="icon">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Square className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Tempo:</span>
                      <div className="w-20">
                        <Slider value={tempo} onValueChange={setTempo} max={200} min={60} step={1} className="w-full" />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">{tempo[0]} BPM</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <div className="w-20">
                        <Slider value={volume} onValueChange={setVolume} max={100} min={0} step={1} />
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Editor de Partituras - Ahora más responsivo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Editor de Partituras
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="min-w-[800px] lg:min-w-0">
                  <SheetMusicEditor />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de Colaboración */}
          <div className="space-y-6">
            {/* Colaboradores Activos */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  Colaboradores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        className={
                          collaborator.status === "online"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : ""
                        }
                      >
                        {collaborator.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{collaborator.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {collaborator.status === "online" ? (
                          <span className="text-green-600 dark:text-green-400">En línea</span>
                        ) : (
                          "Desconectado"
                        )}
                        {" • "}
                        {collaborator.lastEdit}
                      </div>
                    </div>
                    {collaborator.status === "online" && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                  </div>
                ))}

                <Button size="sm" variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Invitar colaborador
                </Button>
              </CardContent>
            </Card>

            {/* Comentarios por Compás */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Comentarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-lg border ${
                          comment.resolved
                            ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                            : "bg-background"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback>{comment.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{comment.user}</span>
                          <Badge variant="outline" className="text-xs">
                            Compás {comment.measure}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{comment.comment}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                          {comment.resolved && (
                            <Badge variant="default" className="text-xs">
                              Resuelto
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Button size="sm" variant="outline" className="w-full mt-3">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Añadir comentario
                </Button>
              </CardContent>
            </Card>

            {/* Historial de Edición */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  Historial Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {editHistory.map((edit) => (
                      <div key={edit.id} className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback>{edit.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{edit.user}</span>
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />
                            {edit.branch}
                          </Badge>
                        </div>
                        <div className="text-sm font-medium mb-1">{edit.action}</div>
                        <p className="text-xs text-muted-foreground mb-2">{edit.detail}</p>
                        <span className="text-xs text-muted-foreground">{edit.time}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Configuración de Sesión */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-primary" />
                  Configuración
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Headphones className="w-4 h-4 mr-2" />
                  Configurar audio
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Permisos de edición
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Cambiar rama
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
