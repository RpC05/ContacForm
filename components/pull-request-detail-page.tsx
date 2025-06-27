"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GitMerge,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  GitBranch,
  Eye,
  AlertCircle,
  Plus,
  Edit3,
  ThumbsUp,
  Play,
  Download,
  Share2,
  Settings,
} from "lucide-react"
import { RepoHeader } from "@/components/repo-header"

interface PullRequestDetailPageProps {
  owner: string
  name: string
  number: number
}

export function PullRequestDetailPage({ owner, name, number }: PullRequestDetailPageProps) {
  const [newComment, setNewComment] = useState("")
  const [isReviewing, setIsReviewing] = useState(false)

  const pullRequest = {
    number: number,
    title: "Añadir instrumentos de percusión al segundo movimiento",
    author: "Carlos Ruiz",
    authorAvatar: "CR",
    status: "open",
    branch: "feature/percussion-section",
    targetBranch: "main",
    createdAt: "hace 2 horas",
    updatedAt: "hace 30 minutos",
    description: `Esta PR añade una sección completa de percusión al segundo movimiento de la sinfonía. 

## Cambios incluidos:
- Timbales en Do y Sol
- Platillos y bombo
- Triángulo para acentos
- Caja clara para ritmos sincopados

## Notas técnicas:
- Los timbales están afinados en Do y Sol para complementar la tonalidad
- Se añadieron dinámicas específicas para cada instrumento
- La entrada de percusión está sincronizada con el clímax orquestal

## Archivos modificados:
- \`movements/second-movement.xml\` - Partitura principal
- \`parts/timpani.xml\` - Parte de timbales
- \`parts/percussion.xml\` - Sección de percusión menor`,
    comments: 8,
    reviews: 2,
    changes: { additions: 45, deletions: 2, files: 4 },
    labels: ["enhancement", "orchestration", "percussion"],
    reviewStatus: "pending",
    mergeable: true,
    conflicts: false,
  }

  const comments = [
    {
      id: 1,
      type: "comment",
      user: "María González",
      avatar: "MG",
      content: "Excelente adición! Los timbales van a dar mucha profundidad al clímax.",
      createdAt: "hace 1 hora",
      reactions: { thumbsUp: 3, thumbsDown: 0 },
    },
    {
      id: 2,
      type: "review",
      user: "Ana Martín",
      avatar: "AM",
      content: "He revisado la partitura y todo se ve bien. Solo una sugerencia menor sobre las dinámicas.",
      createdAt: "hace 45 minutos",
      status: "approved",
      reactions: { thumbsUp: 2, thumbsDown: 0 },
    },
    {
      id: 3,
      type: "comment",
      user: "Luis Fernández",
      avatar: "LF",
      content: "¿Has considerado añadir un redoble de caja antes del clímax? Podría intensificar la tensión.",
      createdAt: "hace 30 minutos",
      reactions: { thumbsUp: 1, thumbsDown: 0 },
    },
  ]

  const changedFiles = [
    {
      name: "movements/second-movement.xml",
      additions: 32,
      deletions: 1,
      status: "modified",
    },
    {
      name: "parts/timpani.xml",
      additions: 8,
      deletions: 0,
      status: "added",
    },
    {
      name: "parts/percussion.xml",
      additions: 5,
      deletions: 1,
      status: "modified",
    },
  ]

  const handleMerge = () => {
    // Simular merge
    alert("Pull Request fusionado exitosamente!")
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Simular añadir comentario
      setNewComment("")
    }
  }

  const getStatusIcon = (status: string, reviewStatus: string) => {
    if (status === "merged") return <GitMerge className="w-5 h-5 text-purple-500" />
    if (status === "closed") return <XCircle className="w-5 h-5 text-red-500" />
    if (reviewStatus === "approved") return <CheckCircle className="w-5 h-5 text-green-500" />
    if (reviewStatus === "changes-requested") return <AlertCircle className="w-5 h-5 text-orange-500" />
    return <GitMerge className="w-5 h-5 text-blue-500" />
  }

  return (
    <div className="min-h-screen bg-background">
      <RepoHeader owner={owner} name={name} currentPage="pulls" />

      <div className="container py-6">
        {/* PR Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center gap-2">{getStatusIcon(pullRequest.status, pullRequest.reviewStatus)}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">
                {pullRequest.title} <span className="text-muted-foreground">#{pullRequest.number}</span>
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="text-xs">{pullRequest.authorAvatar}</AvatarFallback>
                  </Avatar>
                  <span>
                    <strong>{pullRequest.author}</strong> quiere fusionar desde{" "}
                    <Badge variant="outline" className="mx-1">
                      {pullRequest.branch}
                    </Badge>{" "}
                    hacia{" "}
                    <Badge variant="outline" className="mx-1">
                      {pullRequest.targetBranch}
                    </Badge>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {pullRequest.labels.map((label, index) => (
                  <Badge key={index} variant="secondary">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Reproducir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Estado</div>
                    <div className="font-semibold text-green-600">
                      {pullRequest.mergeable ? "Listo para fusionar" : "Conflictos detectados"}
                    </div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Revisiones</div>
                    <div className="font-semibold">{pullRequest.reviews} aprobaciones</div>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Cambios</div>
                    <div className="font-semibold">
                      <span className="text-green-600">+{pullRequest.changes.additions}</span>{" "}
                      <span className="text-red-600">-{pullRequest.changes.deletions}</span>
                    </div>
                  </div>
                  <GitBranch className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="conversation" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="conversation">Conversación</TabsTrigger>
                <TabsTrigger value="files">Archivos ({pullRequest.changes.files})</TabsTrigger>
                <TabsTrigger value="commits">Commits</TabsTrigger>
                <TabsTrigger value="checks">Verificaciones</TabsTrigger>
              </TabsList>

              <TabsContent value="conversation" className="space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{pullRequest.authorAvatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{pullRequest.author}</div>
                        <div className="text-sm text-muted-foreground">creado {pullRequest.createdAt}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm">{pullRequest.description}</pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{comment.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{comment.user}</div>
                              <div className="text-sm text-muted-foreground">
                                {comment.type === "review" ? "revisó" : "comentó"} {comment.createdAt}
                                {comment.type === "review" && (
                                  <Badge variant="default" className="ml-2">
                                    {comment.status}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {comment.reactions.thumbsUp}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{comment.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Comment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Añadir comentario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Deja tu comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                    />
                    <div className="flex items-center gap-2">
                      <Button onClick={handleAddComment}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Comentar
                      </Button>
                      <Button variant="outline" onClick={() => setIsReviewing(!isReviewing)}>
                        <Eye className="w-4 h-4 mr-2" />
                        {isReviewing ? "Cancelar revisión" : "Iniciar revisión"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="files" className="space-y-4">
                {changedFiles.map((file, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={file.status === "added" ? "default" : "secondary"}>{file.status}</Badge>
                          <span className="font-mono text-sm">{file.name}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-green-600">+{file.additions}</span>{" "}
                          <span className="text-red-600">-{file.deletions}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Vista previa del archivo no disponible</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Ver cambios completos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="commits" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Historial de commits próximamente</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="checks" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium">Validación de partitura</div>
                          <div className="text-sm text-muted-foreground">Todas las notas están en rango válido</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium">Verificación de tempo</div>
                          <div className="text-sm text-muted-foreground">Marcas de tempo consistentes</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium">Análisis armónico</div>
                          <div className="text-sm text-muted-foreground">No se detectaron disonancias no resueltas</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Merge Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fusionar Pull Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pullRequest.mergeable ? (
                  <>
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Listo para fusionar</span>
                    </div>
                    <Button onClick={handleMerge} className="w-full">
                      <GitMerge className="w-4 h-4 mr-2" />
                      Fusionar Pull Request
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <XCircle className="w-4 h-4" />
                      <span>Conflictos detectados</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Resolver conflictos
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Reviewers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revisores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Ana Martín</div>
                    <div className="text-xs text-green-600">Aprobado</div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">María González</div>
                    <div className="text-xs text-muted-foreground">Pendiente</div>
                  </div>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Solicitar revisión
                </Button>
              </CardContent>
            </Card>

            {/* Labels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Etiquetas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pullRequest.labels.map((label, index) => (
                  <Badge key={index} variant="secondary" className="mr-2">
                    {label}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir etiqueta
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-red-600">
                  <XCircle className="w-4 h-4 mr-2" />
                  Cerrar PR
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
