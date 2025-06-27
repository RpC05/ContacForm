"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Music, Zap, Crown, Star } from "lucide-react"
import { Header } from "@/components/header"

export function PricingPage() {
  const plans = [
    {
      name: "Gratuito",
      price: "0",
      description: "Perfecto para comenzar tu viaje musical",
      icon: Music,
      features: [
        "3 proyectos musicales",
        "Colaboración con hasta 2 músicos",
        "OCR básico (10 páginas/mes)",
        "Exportación en formatos básicos",
        "Almacenamiento de 1GB",
        "Soporte por email",
      ],
      limitations: ["Sin acceso a IA avanzada", "Sin protección blockchain", "Sin análisis detallados"],
      cta: "Comenzar Gratis",
      href: "/register",
      popular: false,
    },
    {
      name: "Pro",
      price: "19",
      description: "Para músicos profesionales y compositores serios",
      icon: Zap,
      features: [
        "Proyectos ilimitados",
        "Colaboración con hasta 10 músicos",
        "OCR avanzado con IA (ilimitado)",
        "Todos los formatos de exportación",
        "Almacenamiento de 100GB",
        "IA para sugerencias musicales",
        "Protección blockchain básica",
        "Análisis de composición",
        "Soporte prioritario",
      ],
      cta: "Comenzar Prueba Gratuita",
      href: "/register?plan=pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "99",
      description: "Para estudios, orquestas y organizaciones musicales",
      icon: Crown,
      features: [
        "Todo lo de Pro",
        "Colaboradores ilimitados",
        "Almacenamiento ilimitado",
        "IA personalizada para tu estilo",
        "Protección blockchain completa",
        "API personalizada",
        "Integración con DAWs profesionales",
        "Manager de cuenta dedicado",
        "Soporte 24/7",
        "Análisis avanzados y reportes",
      ],
      cta: "Contactar Ventas",
      href: "/contact?plan=enterprise",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "¿Puedo cambiar de plan en cualquier momento?",
      answer: "Sí, puedes actualizar o degradar tu plan en cualquier momento desde tu configuración de cuenta.",
    },
    {
      question: "¿Qué incluye la protección blockchain?",
      answer:
        "Registramos tus composiciones en blockchain para crear una prueba inmutable de autoría y fecha de creación.",
    },
    {
      question: "¿Hay descuentos para estudiantes?",
      answer: "Sí, ofrecemos 50% de descuento en el plan Pro para estudiantes verificados.",
    },
    {
      question: "¿Puedo exportar mis proyectos si cancelo?",
      answer: "Absolutamente. Siempre tendrás acceso para exportar tus proyectos, incluso después de cancelar.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Planes que se adaptan a tu música
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desde compositores independientes hasta orquestas profesionales, tenemos el plan perfecto para ti
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600">
                  <Star className="w-3 h-3 mr-1" />
                  Más Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${
                    plan.name === "Gratuito"
                      ? "from-blue-500 to-cyan-500"
                      : plan.name === "Pro"
                        ? "from-purple-500 to-pink-500"
                        : "from-orange-500 to-red-500"
                  } flex items-center justify-center`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>

                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-purple-600" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Comparación Detallada</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Característica</th>
                  <th className="text-center p-4">Gratuito</th>
                  <th className="text-center p-4">Pro</th>
                  <th className="text-center p-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Proyectos musicales", free: "3", pro: "Ilimitados", enterprise: "Ilimitados" },
                  { feature: "Colaboradores", free: "2", pro: "10", enterprise: "Ilimitados" },
                  {
                    feature: "OCR con IA",
                    free: "10 páginas/mes",
                    pro: "Ilimitado",
                    enterprise: "Ilimitado + IA personalizada",
                  },
                  { feature: "Almacenamiento", free: "1GB", pro: "100GB", enterprise: "Ilimitado" },
                  { feature: "Protección blockchain", free: "❌", pro: "✅", enterprise: "✅ Avanzada" },
                  { feature: "Soporte", free: "Email", pro: "Prioritario", enterprise: "24/7 + Manager dedicado" },
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center">{row.free}</td>
                    <td className="p-4 text-center">{row.pro}</td>
                    <td className="p-4 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
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

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">¿Listo para revolucionar tu música?</h2>
          <p className="text-muted-foreground mb-6">
            Únete a miles de músicos que ya están creando el futuro de la música
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Comenzar Gratis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Ver Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
