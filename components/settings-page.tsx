"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Settings, User, Bell, Shield, Palette, Upload, Trash2, Save } from "lucide-react"
import { Header } from "@/components/header"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    comments: true,
    collaborations: true,
    mentions: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showLocation: true,
    allowMessages: true,
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Configuración</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información del Perfil
                </CardTitle>
                <CardDescription>Actualiza tu información personal y profesional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-2xl">MG</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Cambiar foto
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" defaultValue="María González" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nombre de usuario</Label>
                    <Input id="username" defaultValue="mariagonzalez" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Compositora clásica y arreglista. Especializada en música orquestal y de cámara."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input id="location" defaultValue="Madrid, España" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input id="website" defaultValue="https://mariagonzalez.music" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialties">Especialidades musicales</Label>
                  <Input id="specialties" defaultValue="Música clásica, Orquestación, Música de cámara" />
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la Cuenta</CardTitle>
                <CardDescription>Gestiona tu email, contraseña y configuración de seguridad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="maria@example.com" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cambiar contraseña</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Actualizar contraseña</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Autenticación de dos factores</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Autenticación de dos factores</p>
                      <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">Zona de peligro</h3>
                  <div className="p-4 border border-red-200 rounded-lg">
                    <h4 className="font-medium mb-2">Eliminar cuenta</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus repositorios y datos.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar cuenta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones por email</p>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones importantes por email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones push</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones en tiempo real en el navegador
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Comentarios</p>
                      <p className="text-sm text-muted-foreground">Cuando alguien comenta en tus repositorios</p>
                    </div>
                    <Switch
                      checked={notifications.comments}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Colaboraciones</p>
                      <p className="text-sm text-muted-foreground">Invitaciones a colaborar y pull requests</p>
                    </div>
                    <Switch
                      checked={notifications.collaborations}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, collaborations: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Menciones</p>
                      <p className="text-sm text-muted-foreground">
                        Cuando alguien te menciona en comentarios o issues
                      </p>
                    </div>
                    <Switch
                      checked={notifications.mentions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, mentions: checked })}
                    />
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar preferencias
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacidad
                </CardTitle>
                <CardDescription>Controla quién puede ver tu información y actividad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Perfil público</p>
                      <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil</p>
                    </div>
                    <Switch
                      checked={privacy.profilePublic}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, profilePublic: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mostrar email</p>
                      <p className="text-sm text-muted-foreground">Permite que otros vean tu dirección de email</p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mostrar ubicación</p>
                      <p className="text-sm text-muted-foreground">Permite que otros vean tu ubicación</p>
                    </div>
                    <Switch
                      checked={privacy.showLocation}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showLocation: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Permitir mensajes</p>
                      <p className="text-sm text-muted-foreground">
                        Permite que otros usuarios te envíen mensajes directos
                      </p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                    />
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Preferencias de la Aplicación
                </CardTitle>
                <CardDescription>Personaliza tu experiencia en MelodicHub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Tema</Label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Sistema (automático)</option>
                      <option>Claro</option>
                      <option>Oscuro</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="language">Idioma</Label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Español</option>
                      <option>English</option>
                      <option>Français</option>
                      <option>Deutsch</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="notation">Sistema de notación preferido</Label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Do, Re, Mi (Solfeo)</option>
                      <option>C, D, E (Anglosajón)</option>
                      <option>Números (Cifrado)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="default-instrument">Instrumento por defecto</Label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Piano</option>
                      <option>Guitarra</option>
                      <option>Violín</option>
                      <option>Flauta</option>
                      <option>Voz</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reproducción automática</p>
                      <p className="text-sm text-muted-foreground">
                        Reproduce automáticamente las partituras al abrirlas
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Guardado automático</p>
                      <p className="text-sm text-muted-foreground">
                        Guarda automáticamente los cambios mientras editas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar preferencias
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
