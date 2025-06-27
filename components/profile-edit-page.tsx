"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Mail,
  LinkIcon,
  Camera,
  Save,
  X,
  Github,
  Twitter,
  Instagram,
  Globe,
  Music,
  Settings,
  Shield,
  Bell,
  Eye,
} from "lucide-react"

interface ProfileEditPageProps {
  username: string
}

export function ProfileEditPage({ username }: ProfileEditPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const [formData, setFormData] = useState({
    name: "María González",
    username: "mariagonzalez",
    bio: "Compositora clásica y arreglista. Especializada en música orquestal y de cámara. Profesora en el Conservatorio Superior de Madrid.",
    email: "maria.gonzalez@email.com",
    location: "Madrid, España",
    website: "https://mariagonzalez.music",
    company: "Conservatorio Superior de Madrid",
    twitter: "mariagonzalez_music",
    github: "mariagonzalez",
    instagram: "maria.gonzalez.composer",
  })

  const [preferences, setPreferences] = useState({
    profileVisibility: "public",
    emailVisibility: false,
    activityVisibility: true,
    repositoriesVisibility: true,
    collaborationsVisibility: true,
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    securityAlerts: true,
  })

  const [musicalInfo, setMusicalInfo] = useState({
    instruments: ["Piano", "Violín", "Dirección"],
    genres: ["Clásica", "Contemporánea", "Música de Cámara"],
    specialties: ["Composición", "Arreglos", "Orquestación"],
    experience: "professional",
    education: "Máster en Composición - Real Conservatorio Superior de Madrid",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleMusicalInfoChange = (field: string, value: string | string[]) => {
    setMusicalInfo((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setHasChanges(false)
    router.push(`/profile/${username}`)
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm("¿Estás seguro de que quieres descartar los cambios?")) {
        router.push(`/profile/${username}`)
      }
    } else {
      router.push(`/profile/${username}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Editar Perfil
            </h1>
            <p className="text-muted-foreground">Actualiza tu información personal y preferencias</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Cambiar foto
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG o GIF. Máximo 2MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Campos básicos */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Nombre de usuario</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={4}
                    placeholder="Cuéntanos sobre ti, tu experiencia musical y tus intereses..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Ciudad, País"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Organización/Institución</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Conservatorio, Universidad, Orquesta, etc."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Información Musical */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Información Musical
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="experience">Nivel de experiencia</Label>
                  <Select
                    value={musicalInfo.experience}
                    onValueChange={(value) => handleMusicalInfoChange("experience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                      <SelectItem value="professional">Profesional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">Educación musical</Label>
                  <Input
                    id="education"
                    value={musicalInfo.education}
                    onChange={(e) => handleMusicalInfoChange("education", e.target.value)}
                    placeholder="Títulos, certificaciones, estudios..."
                  />
                </div>

                <div>
                  <Label>Instrumentos</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {musicalInfo.instruments.map((instrument, index) => (
                      <Badge key={index} variant="secondary">
                        {instrument}
                        <button
                          onClick={() => {
                            const newInstruments = musicalInfo.instruments.filter((_, i) => i !== index)
                            handleMusicalInfoChange("instruments", newInstruments)
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      + Añadir instrumento
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Géneros musicales</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {musicalInfo.genres.map((genre, index) => (
                      <Badge key={index} variant="secondary">
                        {genre}
                        <button
                          onClick={() => {
                            const newGenres = musicalInfo.genres.filter((_, i) => i !== index)
                            handleMusicalInfoChange("genres", newGenres)
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      + Añadir género
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Especialidades</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {musicalInfo.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                        <button
                          onClick={() => {
                            const newSpecialties = musicalInfo.specialties.filter((_, i) => i !== index)
                            handleMusicalInfoChange("specialties", newSpecialties)
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      + Añadir especialidad
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Redes Sociales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Redes Sociales y Enlaces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Sitio web
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://tu-sitio-web.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => handleInputChange("github", e.target.value)}
                      placeholder="tu-usuario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange("twitter", e.target.value)}
                      placeholder="@tu-usuario"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                    placeholder="tu-usuario"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacidad */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profileVisibility">Visibilidad del perfil</Label>
                  <Select
                    value={preferences.profileVisibility}
                    onValueChange={(value) => handlePreferenceChange("profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="private">Privado</SelectItem>
                      <SelectItem value="limited">Limitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <Label htmlFor="emailVisibility">Mostrar email</Label>
                    </div>
                    <Switch
                      id="emailVisibility"
                      checked={preferences.emailVisibility}
                      onCheckedChange={(checked) => handlePreferenceChange("emailVisibility", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <Label htmlFor="activityVisibility">Mostrar actividad</Label>
                    </div>
                    <Switch
                      id="activityVisibility"
                      checked={preferences.activityVisibility}
                      onCheckedChange={(checked) => handlePreferenceChange("activityVisibility", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      <Label htmlFor="repositoriesVisibility">Mostrar repositorios</Label>
                    </div>
                    <Switch
                      id="repositoriesVisibility"
                      checked={preferences.repositoriesVisibility}
                      onCheckedChange={(checked) => handlePreferenceChange("repositoriesVisibility", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email</Label>
                  <Switch
                    id="emailNotifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="pushNotifications">Push</Label>
                  <Switch
                    id="pushNotifications"
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="weeklyDigest">Resumen semanal</Label>
                  <Switch
                    id="weeklyDigest"
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => handlePreferenceChange("weeklyDigest", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="securityAlerts">Alertas de seguridad</Label>
                  <Switch
                    id="securityAlerts"
                    checked={preferences.securityAlerts}
                    onCheckedChange={(checked) => handlePreferenceChange("securityAlerts", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vista previa */}
            <Card>
              <CardHeader>
                <CardTitle>Vista previa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{formData.name}</h3>
                  <p className="text-sm text-muted-foreground">@{formData.username}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formData.location}</p>
                  <div className="flex justify-center gap-1 mt-2">
                    {musicalInfo.instruments.slice(0, 2).map((instrument, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
