"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Music,
  ArrowLeft,
  GitBranch,
  Save,
  Upload,
  Download,
  Settings,
  Users,
  MessageSquare,
  Play,
  Code,
  FileText,
  Folder,
  Plus,
  CheckCircle,
  Loader2,
  X,
  ImageIcon,
  Menu,
} from "lucide-react"
import { SheetMusicEditor } from "@/components/sheet-music-editor"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface CodespacePageProps {
  owner: string
  name: string
  branch?: string
}

type UploadState = "idle" | "uploading" | "processing" | "success" | "error"

export function CodespacePage({ owner, name, branch = "main" }: CodespacePageProps) {
  const [selectedFile, setSelectedFile] = useState("partitura-principal.musicxml")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFileName, setUploadedFileName] = useState<string>("")
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const files = [
    {
      name: "partitura-principal.musicxml",
      type: "musicxml",
      path: "/",
    },
    {
      name: "audio-demo.mp3",
      type: "audio",
      path: "/",
    },
    {
      name: "README.md",
      type: "markdown",
      path: "/",
    },
    {
      name: "notas-compositor.txt",
      type: "text",
      path: "/",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "musicxml":
        return <Music className="w-4 h-4 text-blue-500" />
      case "audio":
        return <Play className="w-4 h-4 text-green-500" />
      case "markdown":
        return <FileText className="w-4 h-4 text-gray-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
    if (!validTypes.includes(file.type)) {
      setUploadState("error")
      toast({
        title: "Archivo no compatible",
        description:
          "El archivo seleccionado no es compatible. Por favor, sube una imagen (JPG, PNG) o PDF de partitura.",
        variant: "destructive",
      })
      return
    }

    setUploadedFileName(file.name)
    setUploadState("uploading")
    setUploadProgress(0)

    // Crear preview si es imagen
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedFilePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }

    // Simular subida
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          // Iniciar procesamiento OCR
          setTimeout(() => {
            setUploadState("processing")
            setUploadProgress(0)

            // Simular procesamiento OCR
            const processInterval = setInterval(() => {
              setUploadProgress((prev) => {
                if (prev >= 100) {
                  clearInterval(processInterval)
                  // Completar con éxito
                  setTimeout(() => {
                    setUploadState("success")
                    setHasUnsavedChanges(true)
                    toast({
                      title: "¡Partitura transcrita!",
                      description: "¡Partitura transcrita y lista para editar!",
                    })

                    // Resetear después de mostrar éxito
                    setTimeout(() => {
                      setUploadState("idle")
                      setUploadProgress(0)
                      setUploadedFilePreview("")
                    }, 2000)
                  }, 500)
                  return 100
                }
                return prev + Math.random() * 15
              })
            }, 200)
          }, 1000)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 150)

    // Limpiar input
    event.target.value = ""
  }

  const cancelUpload = () => {
    setUploadState("idle")
    setUploadProgress(0)
    setUploadedFilePreview("")
    setUploadedFileName("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Codespace Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm">Explorador</h3>
                      <Button size="sm" variant="ghost">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                        <Folder className="w-4 h-4" />
                        <span className="text-sm font-medium">{name}</span>
                      </div>

                      <div className="ml-4 space-y-1">
                        {files.map((file) => (
                          <button
                            key={file.name}
                            onClick={() => setSelectedFile(file.name)}
                            className={`flex items-center gap-2 w-full p-2 rounded-lg text-left text-sm hover:bg-muted/50 ${
                              selectedFile === file.name ? "bg-primary/10 text-primary" : ""
                            }`}
                          >
                            {getFileIcon(file.type)}
                            <span className="truncate">{file.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/repo/${owner}/${name}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al repositorio
                </Link>
              </Button>
            )}

            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              <span className="font-semibold">Codespace</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <nav className="flex items-center gap-2 text-sm">
              <Link href={`/profile/${owner}`} className="text-primary hover:underline">
                {owner}
              </Link>
              <span>/</span>
              <Link href={`/repo/${owner}/${name}`} className="text-primary hover:underline">
                {name}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              <Select value={branch}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">main</SelectItem>
                  <SelectItem value="orquesta-completa">orquesta-completa</SelectItem>
                  <SelectItem value="version-piano">version-piano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator orientation="vertical" className="h-6" />
            {hasUnsavedChanges && (
              <Badge variant="destructive" className="text-xs">
                Cambios sin guardar
              </Badge>
            )}
            <Button size="sm" disabled={!hasUnsavedChanges}>
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* File Explorer Sidebar */}
        {!isMobile ? (
          <div className="w-64 border-r bg-muted/10">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Explorador</h3>
                <Button size="sm" variant="ghost">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <Folder className="w-4 h-4" />
                  <span className="text-sm font-medium">{name}</span>
                </div>

                <div className="ml-4 space-y-1">
                  {files.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(file.name)}
                      className={`flex items-center gap-2 w-full p-2 rounded-lg text-left text-sm hover:bg-muted/50 ${
                        selectedFile === file.name ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      {getFileIcon(file.type)}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Codespace Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <Card>
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Codespace activo</div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Conectado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* File Tabs */}
          <div className="border-b bg-muted/20">
            <div className="flex items-center px-4 py-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-background rounded-t-lg border-t border-l border-r">
                {getFileIcon("musicxml")}
                <span className="text-sm">{selectedFile}</span>
                {hasUnsavedChanges && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
              </div>
            </div>
          </div>

          {/* Upload Overlay */}
          {uploadState !== "idle" && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <Card className="w-96 max-w-md mx-4">
                <CardContent className="p-6">
                  {uploadState === "uploading" && (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Subiendo archivo</h3>
                        <p className="text-sm text-muted-foreground mb-4">Subiendo {uploadedFileName}...</p>
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-xs text-muted-foreground mt-2">{Math.round(uploadProgress)}%</p>
                      </div>
                      {uploadedFilePreview && (
                        <div className="mt-4">
                          <img
                            src={uploadedFilePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg mx-auto border"
                          />
                        </div>
                      )}
                      <Button variant="outline" size="sm" onClick={cancelUpload}>
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  )}

                  {uploadState === "processing" && (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                          <Music className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Procesando partitura</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Transcribiendo automáticamente la imagen a formato editable...
                        </p>
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Analizando símbolos musicales... {Math.round(uploadProgress)}%
                        </p>
                      </div>
                      {uploadedFilePreview && (
                        <div className="mt-4">
                          <img
                            src={uploadedFilePreview || "/placeholder.svg"}
                            alt="Processing"
                            className="w-32 h-32 object-cover rounded-lg mx-auto border opacity-75"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {uploadState === "success" && (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-600 animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-600 mb-2">¡Transcripción completada!</h3>
                        <p className="text-sm text-muted-foreground">
                          La partitura ha sido transcrita exitosamente y está lista para editar.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Archivo procesado: {uploadedFileName}</span>
                      </div>
                    </div>
                  )}

                  {uploadState === "error" && (
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <X className="w-8 h-8 text-red-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-600 mb-2">Error de formato</h3>
                        <p className="text-sm text-muted-foreground">
                          El archivo seleccionado no es compatible. Por favor, sube una imagen (JPG, PNG) o PDF de
                          partitura.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={cancelUpload}>
                          Cancelar
                        </Button>
                        <Button size="sm" onClick={handleFileUpload}>
                          <Upload className="w-4 h-4 mr-2" />
                          Intentar de nuevo
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Editor Content */}
          <div className="flex-1 overflow-auto">
            {selectedFile === "partitura-principal.musicxml" ? (
              <div className="p-4">
                <SheetMusicEditor />
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Editor para {selectedFile} próximamente</p>
                <p className="text-sm mt-2">Por ahora, solo se puede editar archivos MusicXML</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Collaboration */}
        {!isMobile ? (
          <div className="w-80 border-l bg-muted/10">
            <div className="p-4">
              <div className="space-y-6">
                {/* Collaboration */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Colaboración</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        MG
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">María González</div>
                        <div className="text-xs text-muted-foreground">Editando ahora</div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>

                    <Button size="sm" variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Invitar colaboradores
                    </Button>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Comentarios</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          CR
                        </div>
                        <span className="text-sm font-medium">Carlos Ruiz</span>
                        <span className="text-xs text-muted-foreground">hace 1h</span>
                      </div>
                      <p className="text-sm">¿Podríamos añadir un crescendo en el compás 3?</p>
                    </div>

                    <Button size="sm" variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Añadir comentario
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Acciones</h3>
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleFileUpload}
                      disabled={uploadState !== "idle"}
                    >
                      {uploadState === "idle" ? (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Subir archivo
                        </>
                      ) : (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Procesando...
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar proyecto
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <GitBranch className="w-4 h-4 mr-2" />
                      Crear pull request
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md p-4 flex justify-around border-t">
          <Button size="sm" onClick={handleFileUpload} disabled={uploadState !== "idle"}>
            <Upload className="w-4 h-4 mr-2" />
            Subir
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </Button>
          <Button size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comentar
          </Button>
        </div>
      )}
    </div>
  )
}
