"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, Users, GitBranch, Camera, Sparkles, Eye } from "lucide-react"
import { Header } from "@/components/header"

export function DemoPage() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demos = [
    {
      title: "OCR Musical con IA",
      description: "Convierte partituras físicas en formato digital editable",
      video: "/placeholder.svg?height=400&width=600",
      features: ["Reconocimiento de notas", "Detección de acordes", "Análisis de ritmo"],
    },
    {
      title: "Colaboración en Tiempo Real",
      description: "Edita partituras con músicos de todo el mundo",
      video: "/placeholder.svg?height=400&width=600",
      features: ["Edición simultánea", "Chat integrado", "Historial de cambios"],
    },
    {
      title: "Control de Versiones Musical",
      description: "Gestiona cambios como en GitHub pero para música",
      video: "/placeholder.svg?height=400&width=600",
      features: ["Ramas musicales", "Merge de composiciones", "Rollback seguro"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Demo Interactiva
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ve MelodicHub en Acción
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo nuestra plataforma revoluciona la creación musical con demostraciones interactivas
          </p>
        </div>

        {/* Main Demo Video */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden">
            <div className="relative bg-black aspect-video">
              <img
                src={demos[currentDemo].video || "/placeholder.svg"}
                alt={demos[currentDemo].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                </Button>
              </div>

              {/* Demo Controls */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="font-semibold">{demos[currentDemo].title}</h3>
                      <p className="text-sm opacity-80">{demos[currentDemo].description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      <div className="w-20 h-1 bg-white/30 rounded-full">
                        <div className="w-3/4 h-full bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Demo Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            {demos.map((demo, index) => (
              <Button
                key={index}
                variant={currentDemo === index ? "default" : "outline"}
                onClick={() => setCurrentDemo(index)}
                className="flex-1 max-w-xs"
              >
                {demo.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {demos[currentDemo].features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature}</h3>
                <p className="text-sm text-muted-foreground">Experimenta esta característica en tiempo real</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Demo Sections */}
        <div className="space-y-16">
          {/* OCR Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Prueba el OCR Musical
              </CardTitle>
              <CardDescription>
                Sube una imagen de partitura y ve cómo la IA la convierte en formato digital
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Imagen Original</h4>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">Arrastra una partitura aquí</p>
                    <Button variant="outline">Seleccionar Archivo</Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Resultado Digital</h4>
                  <div className="bg-muted/50 rounded-lg p-8">
                    <div className="space-y-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-1 bg-muted rounded"></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-6 h-8 bg-primary/20 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collaboration Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                Colaboración en Vivo
              </CardTitle>
              <CardDescription>
                Ve cómo múltiples músicos pueden editar la misma partitura simultáneamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">María editando</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Carlos revisando</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Ana componiendo</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className="w-4 h-4" />
                      <span className="text-sm font-medium">Cambio reciente</span>
                    </div>
                    <p className="text-sm text-muted-foreground">María añadió un acorde de Do mayor en el compás 16</p>
                  </div>

                  <div className="bg-background rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className="w-4 h-4" />
                      <span className="text-sm font-medium">Sugerencia de IA</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Se sugiere una progresión armónica en el puente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">¿Impresionado? ¡Pruébalo tú mismo!</h2>
          <p className="text-muted-foreground mb-6">
            Comienza tu prueba gratuita y experimenta todas estas características
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                <Play className="w-5 h-5 mr-2" />
                Comenzar Prueba Gratuita
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Agendar Demo Personalizada</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
