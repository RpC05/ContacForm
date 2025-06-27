"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Music,
  Users,
  Lock,
  Globe,
  FileMusic,
  Mic,
  Piano,
  Guitar,
  Drum,
  PianoIcon as Violin,
  Headphones,
  Plus,
  X,
} from "lucide-react"
import Link from "next/link"

const projectTypes = [
  { id: "composition", label: "Composición Original", icon: Music, description: "Crear una nueva composición musical" },
  { id: "arrangement", label: "Arreglo Musical", icon: FileMusic, description: "Adaptar una composición existente" },
  { id: "production", label: "Producción Musical", icon: Headphones, description: "Proyecto de grabación y mezcla" },
  {
    id: "collaboration",
    label: "Colaboración",
    icon: Users,
    description: "Proyecto colaborativo con múltiples artistas",
  },
]

const musicalGenres = [
  "Clásica",
  "Jazz",
  "Rock",
  "Pop",
  "Folk",
  "Blues",
  "Country",
  "Electronic",
  "Hip Hop",
  "R&B",
  "Reggae",
  "Punk",
  "Metal",
  "Indie",
  "Alternative",
  "Experimental",
]

const instruments = [
  { id: "piano", label: "Piano", icon: Piano },
  { id: "guitar", label: "Guitarra", icon: Guitar },
  { id: "violin", label: "Violín", icon: Violin },
  { id: "drums", label: "Batería", icon: Drum },
  { id: "vocals", label: "Voz", icon: Mic },
  { id: "bass", label: "Bajo", icon: Guitar },
  { id: "saxophone", label: "Saxofón", icon: Music },
  { id: "trumpet", label: "Trompeta", icon: Music },
  { id: "flute", label: "Flauta", icon: Music },
  { id: "cello", label: "Violonchelo", icon: Violin },
]

const licenses = [
  { id: "cc-by", label: "Creative Commons - Atribución", description: "Permite uso comercial y modificaciones" },
  {
    id: "cc-by-sa",
    label: "Creative Commons - Compartir Igual",
    description: "Permite uso comercial, requiere misma licencia",
  },
  { id: "cc-by-nc", label: "Creative Commons - No Comercial", description: "Solo uso no comercial" },
  { id: "all-rights", label: "Todos los Derechos Reservados", description: "Protección completa de derechos de autor" },
  { id: "public-domain", label: "Dominio Público", description: "Sin restricciones de uso" },
]

const templates = [
  { id: "empty", label: "Proyecto Vacío", description: "Comenzar desde cero" },
  { id: "lead-sheet", label: "Lead Sheet", description: "Plantilla con melodía y acordes" },
  { id: "full-score", label: "Partitura Completa", description: "Plantilla orquestal" },
  { id: "band-setup", label: "Configuración de Banda", description: "Plantilla para conjunto musical" },
  { id: "solo-piano", label: "Piano Solo", description: "Plantilla para piano" },
  { id: "audio-project", label: "Proyecto de Audio", description: "Configuración para grabación" },
]

export function CreateRepository() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectType: "",
    genre: "",
    instruments: [] as string[],
    tempo: "",
    key: "",
    timeSignature: "4/4",
    license: "",
    isPrivate: false,
    template: "empty",
    initializeWithReadme: true,
    addGitignore: true,
  })

  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])

  const handleInstrumentToggle = (instrumentId: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrumentId) ? prev.filter((id) => id !== instrumentId) : [...prev, instrumentId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Crear repositorio:", { ...formData, instruments: selectedInstruments })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <span>/</span>
            <span>Nuevo Repositorio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3">
            <Music className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <span className="leading-tight">Crear un nuevo repositorio musical</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Un repositorio contiene todos los archivos de tu proyecto musical, incluyendo partituras, audio y historial
            de cambios.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Información del Proyecto</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Información básica sobre tu proyecto musical
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del repositorio *</Label>
                <Input
                  id="name"
                  placeholder="mi-nueva-composicion"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="font-mono"
                />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Usa letras minúsculas, números y guiones. Será parte de la URL del proyecto.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Una breve descripción de tu proyecto musical..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tipo de Proyecto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Tipo de Proyecto</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Selecciona el tipo de proyecto musical que vas a crear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.projectType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                className="grid grid-cols-1 gap-3 sm:gap-4"
              >
                {projectTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label
                      htmlFor={type.id}
                      className="flex items-center gap-3 cursor-pointer flex-1 p-3 sm:p-4 border rounded-lg hover:bg-accent"
                    >
                      <type.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium text-sm sm:text-base">{type.label}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{type.description}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Detalles Musicales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Detalles Musicales</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Información específica sobre las características musicales del proyecto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="genre">Género Musical</Label>
                  <Select
                    value={formData.genre}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, genre: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                    <SelectContent>
                      {musicalGenres.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempo">Tempo (BPM)</Label>
                  <Input
                    id="tempo"
                    type="number"
                    placeholder="120"
                    min="40"
                    max="200"
                    value={formData.tempo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tempo: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key">Tonalidad</Label>
                  <Select
                    value={formData.key}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, key: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tonalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c-major">Do Mayor</SelectItem>
                      <SelectItem value="g-major">Sol Mayor</SelectItem>
                      <SelectItem value="d-major">Re Mayor</SelectItem>
                      <SelectItem value="a-major">La Mayor</SelectItem>
                      <SelectItem value="e-major">Mi Mayor</SelectItem>
                      <SelectItem value="f-major">Fa Mayor</SelectItem>
                      <SelectItem value="bb-major">Si♭ Mayor</SelectItem>
                      <SelectItem value="a-minor">La menor</SelectItem>
                      <SelectItem value="e-minor">Mi menor</SelectItem>
                      <SelectItem value="b-minor">Si menor</SelectItem>
                      <SelectItem value="d-minor">Re menor</SelectItem>
                      <SelectItem value="g-minor">Sol menor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeSignature">Compás</Label>
                  <Select
                    value={formData.timeSignature}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, timeSignature: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4/4">4/4</SelectItem>
                      <SelectItem value="3/4">3/4</SelectItem>
                      <SelectItem value="2/4">2/4</SelectItem>
                      <SelectItem value="6/8">6/8</SelectItem>
                      <SelectItem value="9/8">9/8</SelectItem>
                      <SelectItem value="12/8">12/8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Instrumentos */}
              <div className="space-y-3">
                <Label>Instrumentos Principales</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Selecciona los instrumentos que se utilizarán en este proyecto
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                  {instruments.map((instrument) => (
                    <div
                      key={instrument.id}
                      className={`flex items-center gap-2 p-2 sm:p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedInstruments.includes(instrument.id) ? "bg-primary/10 border-primary" : "hover:bg-accent"
                      }`}
                      onClick={() => handleInstrumentToggle(instrument.id)}
                    >
                      <instrument.icon className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span className="text-xs sm:text-sm truncate">{instrument.label}</span>
                    </div>
                  ))}
                </div>
                {selectedInstruments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedInstruments.map((id) => {
                      const instrument = instruments.find((i) => i.id === id)
                      return (
                        <Badge key={id} variant="secondary" className="flex items-center gap-1 text-xs">
                          {instrument?.label}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-destructive"
                            onClick={() => handleInstrumentToggle(id)}
                          />
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Licencia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Licencia</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Elige cómo otros pueden usar tu trabajo musical
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.license}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, license: value }))}
                className="space-y-3"
              >
                {licenses.map((license) => (
                  <div key={license.id} className="flex items-start space-x-2">
                    <RadioGroupItem value={license.id} id={license.id} className="mt-1" />
                    <Label htmlFor={license.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-sm sm:text-base">{license.label}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{license.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Configuración */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Configuración del Repositorio</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Configuración inicial y plantilla del proyecto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Visibilidad */}
              <div className="space-y-4">
                <Label>Visibilidad</Label>
                <RadioGroup
                  value={formData.isPrivate ? "private" : "public"}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, isPrivate: value === "private" }))}
                  className="space-y-3"
                >
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="public" id="public" className="mt-1" />
                    <Label htmlFor="public" className="flex items-start gap-3 cursor-pointer">
                      <Globe className="w-4 h-4 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Público</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          Cualquiera puede ver este repositorio
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="private" id="private" className="mt-1" />
                    <Label htmlFor="private" className="flex items-start gap-3 cursor-pointer">
                      <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Privado</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          Solo tú y los colaboradores pueden ver este repositorio
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Plantilla */}
              <div className="space-y-3">
                <Label>Plantilla Inicial</Label>
                <Select
                  value={formData.template}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, template: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <div className="font-medium">{template.label}</div>
                          <div className="text-sm text-muted-foreground">{template.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Opciones adicionales */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="readme"
                    checked={formData.initializeWithReadme}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, initializeWithReadme: checked as boolean }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="readme" className="cursor-pointer text-sm sm:text-base">
                    Añadir un archivo README
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="gitignore"
                    checked={formData.addGitignore}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, addGitignore: checked as boolean }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="gitignore" className="cursor-pointer text-sm sm:text-base">
                    Añadir .gitignore para proyectos musicales
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
            <Button variant="outline" className="w-full sm:w-auto order-2 sm:order-1" asChild>
              <Link href="/dashboard">Cancelar</Link>
            </Button>
            <Button type="submit" className="w-full sm:w-auto flex items-center gap-2 order-1 sm:order-2">
              <Plus className="w-4 h-4" />
              Crear repositorio
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
