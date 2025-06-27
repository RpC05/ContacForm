"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Music,
  Save,
  Play,
  Pause,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Download,
  Upload,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Eye,
  Share2,
  Wand2,
  Volume2,
  Mic,
} from "lucide-react"
import { RepoHeader } from "@/components/repo-header"

interface EditorPageProps {
  owner: string
  name: string
}

export function EditorPage({ owner, name }: EditorPageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [activeCollaborators] = useState([
    { name: "María González", avatar: "MG", color: "bg-green-500", cursor: { x: 45, y: 20 } },
    { name: "Carlos Ruiz", avatar: "CR", color: "bg-blue-500", cursor: { x: 60, y: 35 } },
  ])

  const [comments] = useState([
    {
      id: 1,
      author: "Ana Martín",
      content: "¿Podríamos añadir un crescendo aquí?",
      line: 12,
      time: "hace 2 horas",
      resolved: false,
    },
    {
      id: 2,
      author: "Luis Fernández",
      content: "Perfecto, esta sección suena muy bien",
      line: 8,
      time: "hace 1 día",
      resolved: true,
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <RepoHeader owner={owner} name={name} currentPage="editor" />

      {/* Editor Header */}
      <div className="border-b bg-muted/20">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Editor de Partituras</h1>
              <Badge variant="secondary">Rama: main</Badge>
              <Badge variant="outline" className="text-green-600">
                Guardado automático
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Vista previa
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="border-b p-4 bg-background">
            <div className="flex items-center justify-between">
              {/* Left Toolbar */}
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Undo className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Redo className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm min-w-[60px] text-center">{zoom}%</span>
                <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  OCR
                </Button>
              </div>

              {/* Center Playback */}
              <div className="flex items-center gap-4">
                <Button size="sm" onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pausar" : "Reproducir"}
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>0:00</span>
                  <div className="w-32 h-1 bg-muted rounded-full">
                    <div className="w-1/4 h-full bg-primary rounded-full"></div>
                  </div>
                  <span>12:34</span>
                </div>
                <Button size="sm" variant="outline">
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sheet Music Canvas */}
          <div className="flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 relative">
            {/* Collaborative Cursors */}
            {activeCollaborators.map((collaborator, index) => (
              <div
                key={index}
                className="absolute pointer-events-none z-10"
                style={{
                  left: `${collaborator.cursor.x}%`,
                  top: `${collaborator.cursor.y}%`,
                }}
              >
                <div className={`w-3 h-3 ${collaborator.color} rounded-full border-2 border-white`}></div>
                <div className={`mt-1 px-2 py-1 ${collaborator.color} text-white text-xs rounded whitespace-nowrap`}>
                  {collaborator.name}
                </div>
              </div>
            ))}

            {/* Sheet Music Content */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Sinfonía en Do Mayor</h2>
                <p className="text-muted-foreground">I. Allegro con brio</p>
              </div>

              {/* Simulated Staff Lines */}
              <div className="space-y-16">
                {[...Array(6)].map((_, systemIndex) => (
                  <div key={systemIndex} className="relative">
                    {/* Staff System */}
                    <div className="relative h-32 border border-gray-200 rounded p-4">
                      {/* Staff lines */}
                      {[...Array(5)].map((_, lineIndex) => (
                        <div
                          key={lineIndex}
                          className="absolute w-full h-px bg-gray-400"
                          style={{ top: `${20 + lineIndex * 16}px` }}
                        />
                      ))}

                      {/* Clef and Time Signature */}
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <div className="w-8 h-16 bg-primary/20 rounded flex items-center justify-center">
                          <Music className="w-6 h-6" />
                        </div>
                        <div className="text-lg font-bold">4/4</div>
                      </div>

                      {/* Notes */}
                      <div className="absolute left-20 top-0 w-full h-full flex items-center">
                        <div className="flex gap-4">
                          {[...Array(12)].map((_, noteIndex) => (
                            <div
                              key={noteIndex}
                              className="relative"
                              style={{
                                marginTop: `${Math.sin(noteIndex * 0.5) * 20}px`,
                              }}
                            >
                              <div className="w-4 h-3 bg-black rounded-full transform -rotate-12"></div>
                              {noteIndex % 4 === 0 && (
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-px h-6 bg-black"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Comment Indicators */}
                      {comments
                        .filter((comment) => !comment.resolved)
                        .map((comment, index) => (
                          <div
                            key={comment.id}
                            className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white cursor-pointer"
                            style={{
                              right: `${20 + index * 30}px`,
                              top: "10px",
                            }}
                            title={`Comentario de ${comment.author}`}
                          >
                            <MessageSquare className="w-2 h-2 text-white m-1" />
                          </div>
                        ))}
                    </div>

                    {/* Measure Numbers */}
                    <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      {systemIndex * 4 + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l bg-muted/10">
          <Tabs defaultValue="collaborators" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="collaborators">
                <Users className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="comments">
                <MessageSquare className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="tools">
                <Settings className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="collaborators" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Colaboradores Activos</h3>
                <div className="space-y-3">
                  {activeCollaborators.map((collaborator, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${collaborator.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                      >
                        {collaborator.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{collaborator.name}</div>
                        <div className="text-xs text-muted-foreground">Editando ahora</div>
                      </div>
                      <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Invitar Colaboradores</h3>
                <div className="space-y-2">
                  <Input placeholder="Email o nombre de usuario" />
                  <Button size="sm" className="w-full">
                    Enviar Invitación
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Comentarios</h3>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-lg border ${comment.resolved ? "bg-muted/50" : "bg-background"}`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {comment.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{comment.author}</div>
                          <div className="text-xs text-muted-foreground">{comment.time}</div>
                        </div>
                        {comment.resolved && (
                          <Badge variant="secondary" className="text-xs">
                            Resuelto
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      {!comment.resolved && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            Responder
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            Resolver
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Nuevo Comentario</h3>
                <div className="space-y-2">
                  <Textarea placeholder="Añadir un comentario..." rows={3} />
                  <Button size="sm" className="w-full">
                    Comentar
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Herramientas de Edición</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="h-12 flex-col gap-1">
                    <Music className="w-4 h-4" />
                    <span className="text-xs">Notas</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-12 flex-col gap-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">Texto</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-12 flex-col gap-1">
                    <Wand2 className="w-4 h-4" />
                    <span className="text-xs">Dinámicas</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-12 flex-col gap-1">
                    <Mic className="w-4 h-4" />
                    <span className="text-xs">Grabación</span>
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Exportar</h3>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Music className="w-4 h-4 mr-2" />
                    MIDI
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    MusicXML
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
