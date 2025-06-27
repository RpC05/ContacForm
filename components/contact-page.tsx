"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Headphones,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Header } from "@/components/header"

// Actualizar las importaciones para incluir las funciones de Supabase
import { crearConsulta } from "@/lib/consultas"

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mensajeExito, setMensajeExito] = useState(false)
  const [mensajeError, setMensajeError] = useState("")

  // En la función handleSubmit, reemplazar la simulación con la llamada real a Supabase:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)

      const consultaData = {
        nombre: formData.get("firstName") as string,
        apellido: formData.get("lastName") as string,
        email: formData.get("email") as string,
        empresa: (formData.get("company") as string) || undefined,
        tipo_consulta: formData.get("subject") as any,
        mensaje: formData.get("message") as string,
      }

      await crearConsulta(consultaData)

      // Limpiar formulario
      ;(e.target as HTMLFormElement).reset()

      // Mostrar mensaje de éxito mejorado
      setMensajeExito(true)
      setTimeout(() => setMensajeExito(false), 5000)
    } catch (error) {
      console.error("Error al enviar consulta:", error)
      setMensajeError("Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.")
      setTimeout(() => setMensajeError(""), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Respuesta en 24 horas",
      value: "hola@melodichub.com",
      action: "Enviar Email",
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "Lun-Vie 9:00-18:00",
      value: "+1 (555) 123-4567",
      action: "Llamar Ahora",
    },
    {
      icon: MessageSquare,
      title: "Chat en Vivo",
      description: "Respuesta inmediata",
      value: "Disponible 24/7",
      action: "Iniciar Chat",
    },
  ]

  const supportTypes = [
    {
      icon: Headphones,
      title: "Soporte Técnico",
      description: "Problemas con la plataforma, bugs, errores",
    },
    {
      icon: Users,
      title: "Ventas",
      description: "Información sobre planes, precios, demos",
    },
    {
      icon: Zap,
      title: "Partnerships",
      description: "Colaboraciones, integraciones, alianzas",
    },
  ]

  return (
    <div className="min-h-screen bg-background"> 

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">
            <MessageSquare className="w-4 h-4 mr-2" />
            Estamos aquí para ayudarte
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Contacta con Nosotros
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas? ¿Necesitas ayuda? Nuestro equipo está listo para asistirte
          </p>
        </div>
{/*grid lg:grid-cols-3 gap-8
    lg:col-span-2
    space-y-6
*/}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Contact Form */}
          <div className="lg:col-start-2 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
                <CardDescription>Completa el formulario y te responderemos lo antes posible</CardDescription>
                {mensajeExito && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">¡Mensaje enviado exitosamente!</h4>
                        <p className="text-sm text-green-700">
                          Hemos recibido tu consulta. Nuestro equipo te responderá en menos de 24 horas.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {mensajeError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <h4 className="font-semibold text-red-800">Error al enviar mensaje</h4>
                        <p className="text-sm text-red-700">{mensajeError}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      {/* Actualizar los campos del formulario para que tengan los nombres correctos: */}
                      <Input id="firstName" name="firstName" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" name="lastName" placeholder="Tu apellido" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="tu@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa (Opcional)</Label>
                    <Input id="company" name="company" placeholder="Tu empresa o organización" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Tipo de Consulta</Label>
                    <Select name="subject">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Soporte Técnico</SelectItem>
                        <SelectItem value="sales">Ventas y Precios</SelectItem>
                        <SelectItem value="partnership">Partnerships</SelectItem>
                        <SelectItem value="demo">Demo Personalizada</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info 
          <div className="space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <p className="text-sm font-medium">{method.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Soporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportTypes.map((type, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <type.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm">{type.title}</h3>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nuestra Oficina</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">San Francisco, CA</p>
                    <p className="text-sm text-muted-foreground">
                      123 Music Street
                      <br />
                      San Francisco, CA 94102
                      <br />
                      Estados Unidos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Horarios</p>
                    <p className="text-sm text-muted-foreground">
                      Lun-Vie: 9:00 - 18:00 PST
                      <br />
                      Sáb-Dom: 10:00 - 16:00 PST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>*/}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "¿Cuánto tiempo toma recibir una respuesta?",
                answer: "Respondemos emails en menos de 24 horas. Para consultas urgentes, usa nuestro chat en vivo.",
              },
              {
                question: "¿Ofrecen soporte en español?",
                answer: "Sí, nuestro equipo de soporte habla español e inglés.",
              },
              {
                question: "¿Puedo agendar una demo personalizada?",
                answer: "Absolutamente. Contáctanos y agendaremos una demo adaptada a tus necesidades.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
