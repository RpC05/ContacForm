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
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  User,
  Bell,
  Shield,
  Music,
  Palette,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
} from "lucide-react"
import { MainLayout } from "@/components/main-layout"

export function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState("perfil")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    colaboraciones: true,
    comentarios: true,
    seguidores: false,
    tendencias: true,
  })

  const [privacy, setPrivacy] = useState({
    perfilPublico: true,
    mostrarEmail: false,
    mostrarProyectos: true,
    permitirColaboraciones: true,
  })

  const [preferences, setPreferences] = useState({
    tema: "dark",
    idioma: "es",
    calidad: "alta",
    autoguardado: true,
    sincronizacion: true,
  })

  return (
    <MainLayout>
      <div className="container py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Settings className="w-8 h-8 text-primary" />
              Configuración
            </h1>
            <p className="text-muted-foreground mt-1">Gestiona tu cuenta, preferencias y configuración de privacidad</p>
          </div>
        </div>

        {/* Tabs de configuración */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="perfil" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="notificaciones" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden md:inline">Notificaciones</span>
            </TabsTrigger>
            <TabsTrigger value="privacidad" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline">Privacidad</span>
            </TabsTrigger>
            <TabsTrigger value="preferencias" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden md:inline">Preferencias</span>
            </TabsTrigger>
            <TabsTrigger value="suscripcion" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden md:inline">Suscripción</span>
            </TabsTrigger>
          </TabsList>

          {/* Perfil */}
          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Actualiza tu información de perfil y foto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Cambiar Foto
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" defaultValue="María González" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nombre de usuario</Label>
                    <Input id="username" defaultValue="mariagonzalez" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" defaultValue="maria@ejemplo.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    placeholder="Cuéntanos sobre ti y tu música..."
                    defaultValue="Compositora y pianista especializada en música clásica contemporánea. Profesora en el Conservatorio Nacional."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ubicacion">Ubicación</Label>
                    <Input id="ubicacion" defaultValue="Madrid, España" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input id="website" defaultValue="https://mariagonzalez.music" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Géneros musicales</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Clásica</Badge>
                    <Badge variant="secondary">Contemporánea</Badge>
                    <Badge variant="secondary">Minimalismo</Badge>
                    <Button variant="outline" size="sm">
                      <Music className="w-4 h-4 mr-2" />
                      Añadir género
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                  <Button variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <div className="relative">
                    <Input id="current-password" type={showPassword ? "text" : "password"} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button>Actualizar Contraseña</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificaciones */}
          <TabsContent value="notificaciones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Notificaciones por email</Label>
                      <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Notificaciones push</Label>
                      <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Tipos de notificaciones</h4>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="colaboraciones">Invitaciones a colaborar</Label>
                      <p className="text-sm text-muted-foreground">
                        Cuando alguien te invite a colaborar en un proyecto
                      </p>
                    </div>
                    <Switch
                      id="colaboraciones"
                      checked={notifications.colaboraciones}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, colaboraciones: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="comentarios">Comentarios y menciones</Label>
                      <p className="text-sm text-muted-foreground">Cuando comenten en tus proyectos o te mencionen</p>
                    </div>
                    <Switch
                      id="comentarios"
                      checked={notifications.comentarios}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, comentarios: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="seguidores">Nuevos seguidores</Label>
                      <p className="text-sm text-muted-foreground">Cuando alguien comience a seguirte</p>
                    </div>
                    <Switch
                      id="seguidores"
                      checked={notifications.seguidores}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, seguidores: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="tendencias">Resumen de tendencias</Label>
                      <p className="text-sm text-muted-foreground">Resumen semanal de proyectos en tendencia</p>
                    </div>
                    <Switch
                      id="tendencias"
                      checked={notifications.tendencias}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, tendencias: checked })}
                    />
                  </div>
                </div>

                <Button>Guardar Preferencias</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacidad */}
          <TabsContent value="privacidad" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Privacidad</CardTitle>
                <CardDescription>Controla quién puede ver tu información y proyectos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="perfil-publico">Perfil público</Label>
                      <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil</p>
                    </div>
                    <Switch
                      id="perfil-publico"
                      checked={privacy.perfilPublico}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, perfilPublico: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mostrar-email">Mostrar email en perfil</Label>
                      <p className="text-sm text-muted-foreground">Otros usuarios podrán ver tu dirección de correo</p>
                    </div>
                    <Switch
                      id="mostrar-email"
                      checked={privacy.mostrarEmail}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, mostrarEmail: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mostrar-proyectos">Mostrar proyectos públicos</Label>
                      <p className="text-sm text-muted-foreground">Permite que otros vean tus proyectos públicos</p>
                    </div>
                    <Switch
                      id="mostrar-proyectos"
                      checked={privacy.mostrarProyectos}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, mostrarProyectos: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="permitir-colaboraciones">Permitir invitaciones a colaborar</Label>
                      <p className="text-sm text-muted-foreground">Otros usuarios pueden invitarte a colaborar</p>
                    </div>
                    <Switch
                      id="permitir-colaboraciones"
                      checked={privacy.permitirColaboraciones}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, permitirColaboraciones: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Gestión de datos</h4>

                  <div className="flex flex-col md:flex-row gap-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar mis datos
                    </Button>
                    <Button variant="outline" className="text-red-500">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar cuenta
                    </Button>
                  </div>
                </div>

                <Button>Guardar Configuración</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferencias */}
          <TabsContent value="preferencias" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de la Aplicación</CardTitle>
                <CardDescription>Personaliza tu experiencia en MelodicHub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tema">Tema</Label>
                    <Select
                      value={preferences.tema}
                      onValueChange={(value) => setPreferences({ ...preferences, tema: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idioma">Idioma</Label>
                    <Select
                      value={preferences.idioma}
                      onValueChange={(value) => setPreferences({ ...preferences, idioma: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="calidad">Calidad de audio</Label>
                    <Select
                      value={preferences.calidad}
                      onValueChange={(value) => setPreferences({ ...preferences, calidad: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja (128 kbps)</SelectItem>
                        <SelectItem value="media">Media (256 kbps)</SelectItem>
                        <SelectItem value="alta">Alta (320 kbps)</SelectItem>
                        <SelectItem value="lossless">Sin pérdida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Configuración del editor</h4>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoguardado">Autoguardado</Label>
                      <p className="text-sm text-muted-foreground">
                        Guarda automáticamente los cambios cada 30 segundos
                      </p>
                    </div>
                    <Switch
                      id="autoguardado"
                      checked={preferences.autoguardado}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, autoguardado: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sincronizacion">Sincronización en tiempo real</Label>
                      <p className="text-sm text-muted-foreground">
                        Sincroniza cambios con colaboradores instantáneamente
                      </p>
                    </div>
                    <Switch
                      id="sincronizacion"
                      checked={preferences.sincronizacion}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, sincronizacion: checked })}
                    />
                  </div>
                </div>

                <Button>Guardar Preferencias</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suscripción */}
          <TabsContent value="suscripcion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan Actual</CardTitle>
                <CardDescription>Gestiona tu suscripción y facturación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <div>
                    <h3 className="text-lg font-bold">Plan Pro</h3>
                    <p className="text-sm text-muted-foreground">Acceso completo a todas las funciones</p>
                  </div>
                  <Badge variant="default">Activo</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Detalles del plan</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Precio mensual:</span>
                        <span className="font-medium">€19.99</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Próxima facturación:</span>
                        <span className="font-medium">15 Dic 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Método de pago:</span>
                        <span className="font-medium">•••• 4242</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Funciones incluidas</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Proyectos ilimitados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Colaboradores ilimitados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Almacenamiento 100GB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Soporte prioritario</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-2">
                  <Button variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Actualizar método de pago
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar facturas
                  </Button>
                  <Button variant="outline" className="text-red-500">
                    Cancelar suscripción
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Otros planes disponibles</CardTitle>
                <CardDescription>Cambia a un plan que se adapte mejor a tus necesidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-bold mb-2">Básico</h3>
                    <p className="text-2xl font-bold mb-2">Gratis</p>
                    <p className="text-sm text-muted-foreground mb-4">Para empezar</p>
                    <ul className="text-sm space-y-1 mb-4">
                      <li>• 3 proyectos</li>
                      <li>• 1 colaborador</li>
                      <li>• 1GB almacenamiento</li>
                    </ul>
                    <Button variant="outline" className="w-full" disabled>
                      Plan actual
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-primary/5">
                    <h3 className="font-bold mb-2">Pro</h3>
                    <p className="text-2xl font-bold mb-2">€19.99/mes</p>
                    <p className="text-sm text-muted-foreground mb-4">Para profesionales</p>
                    <ul className="text-sm space-y-1 mb-4">
                      <li>• Proyectos ilimitados</li>
                      <li>• Colaboradores ilimitados</li>
                      <li>• 100GB almacenamiento</li>
                    </ul>
                    <Button className="w-full" disabled>
                      Plan actual
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-bold mb-2">Empresa</h3>
                    <p className="text-2xl font-bold mb-2">€49.99/mes</p>
                    <p className="text-sm text-muted-foreground mb-4">Para equipos</p>
                    <ul className="text-sm space-y-1 mb-4">
                      <li>• Todo de Pro</li>
                      <li>• 1TB almacenamiento</li>
                      <li>• Soporte 24/7</li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Actualizar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
