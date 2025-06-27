"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Users,
  GitBranch,
  Volume2,
  Shield,
  Globe,
  Sparkles,
  Zap,
  Brain,
  Cloud,
  Lock,
  Headphones,
  FileMusic,
  Share2,
  BarChart3,
  Palette,
} from "lucide-react"
import { Header } from "@/components/header"

export function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Camera,
      title: "OCR Musical Avanzado",
      description: "Convierte cualquier partitura física en formato digital editable con precisión del 99.8%",
      details: [
        "Reconocimiento de notas, acordes y dinámicas",
        "Soporte para múltiples instrumentos",
        "Detección automática de compás y tonalidad",
        "Corrección inteligente de errores",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Colaboración en Tiempo Real",
      description: "Edita partituras con músicos de todo el mundo simultáneamente",
      details: [
        "Edición simultánea sin conflictos",
        "Chat integrado con notaciones musicales",
        "Comentarios contextuales en la partitura",
        "Permisos granulares por sección",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: GitBranch,
      title: "Control de Versiones Musical",
      description: "Historial completo de cambios, ramas y fusiones como en GitHub",
      details: [
        "Ramas para experimentar sin riesgo",
        "Merge inteligente de composiciones",
        "Rollback a cualquier versión anterior",
        "Comparación visual de cambios",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Brain,
      title: "IA Compositiva",
      description: "Asistente inteligente que sugiere armonías, melodías y arreglos",
      details: [
        "Sugerencias de acordes contextuales",
        "Generación de contramelodías",
        "Análisis de estilo musical",
        "Detección de errores armónicos",
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Volume2,
      title: "Reproducción Realista",
      description: "Escucha tus composiciones con instrumentos virtuales de alta calidad",
      details: [
        "Samples de instrumentos reales",
        "Síntesis avanzada de expresión",
        "Mezcla automática inteligente",
        "Exportación a audio profesional",
      ],
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "Protección Blockchain",
      description: "Derechos de autor protegidos con tecnología blockchain inmutable",
      details: [
        "Registro inmutable de autoría",
        "Timestamping criptográfico",
        "Prueba legal de creación",
        "Licenciamiento automático",
      ],
      gradient: "from-teal-500 to-blue-500",
    },
  ]

  const additionalFeatures = [
    {
      icon: Cloud,
      title: "Almacenamiento en la Nube",
      description: "Accede a tus proyectos desde cualquier dispositivo",
    },
    {
      icon: Lock,
      title: "Seguridad Avanzada",
      description: "Encriptación end-to-end para proteger tu trabajo",
    },
    {
      icon: Headphones,
      title: "Audio Espacial",
      description: "Experimenta tus composiciones en 3D",
    },
    {
      icon: FileMusic,
      title: "Múltiples Formatos",
      description: "Exporta en MusicXML, MIDI, PDF y más",
    },
    {
      icon: Share2,
      title: "Compartir Fácil",
      description: "Comparte proyectos con enlaces seguros",
    },
    {
      icon: BarChart3,
      title: "Analytics Musicales",
      description: "Analiza patrones y tendencias en tu música",
    },
    {
      icon: Palette,
      title: "Personalización",
      description: "Adapta la interfaz a tu flujo de trabajo",
    },
    {
      icon: Globe,
      title: "Comunidad Global",
      description: "Conecta con músicos de todo el mundo",
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
            Características Revolucionarias
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Todo lo que necesitas para crear música
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre las herramientas más avanzadas para composición, colaboración y distribución musical
          </p>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Y mucho más...</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/5 to-purple-600/5">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Integraciones Profesionales</h2>
                <p className="text-muted-foreground">Conecta MelodicHub con tus herramientas favoritas</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-lg">DAW</span>
                  </div>
                  <h3 className="font-semibold mb-2">DAWs Populares</h3>
                  <p className="text-sm text-muted-foreground">Logic Pro, Pro Tools, Ableton Live, FL Studio</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-lg">API</span>
                  </div>
                  <h3 className="font-semibold mb-2">APIs Abiertas</h3>
                  <p className="text-sm text-muted-foreground">Integra con tus aplicaciones personalizadas</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-lg">AI</span>
                  </div>
                  <h3 className="font-semibold mb-2">IA Externa</h3>
                  <p className="text-sm text-muted-foreground">OpenAI, Google AI, servicios personalizados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">¿Listo para experimentar el futuro?</h2>
          <p className="text-muted-foreground mb-6">
            Todas estas características están esperándote. Comienza tu viaje musical hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                <Zap className="w-5 h-5 mr-2" />
                Comenzar Gratis
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Ver Demo Interactiva</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
