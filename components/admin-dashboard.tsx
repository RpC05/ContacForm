"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MessageSquare,
  Clock,
  Search,
  MoreHorizontal,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  LogOut,
  Shield,
} from "lucide-react"
import {
  obtenerConsultas,
  obtenerEstadisticasConsultas,
  actualizarEstadoConsulta,
  eliminarConsulta,
} from "@/lib/consultas"
import { obtenerSesionAdmin, cerrarSesionAdmin, estaAutenticadoAdmin } from "@/lib/admin-session"
import type { Consulta } from "@/lib/supabase"
import type { AdminUser } from "@/lib/admin-auth"

const tiposConsulta = {
  support: { label: "Soporte Técnico", color: "bg-red-500" },
  sales: { label: "Ventas", color: "bg-green-500" },
  partnership: { label: "Partnerships", color: "bg-blue-500" },
  demo: { label: "Demo", color: "bg-purple-500" },
  feedback: { label: "Feedback", color: "bg-yellow-500" },
  other: { label: "Otro", color: "bg-gray-500" },
}

const estadosConsulta = {
  pendiente: { label: "Pendiente", color: "bg-yellow-500", icon: Clock },
  en_proceso: { label: "En Proceso", color: "bg-blue-500", icon: AlertCircle },
  respondido: { label: "Respondido", color: "bg-green-500", icon: CheckCircle },
}

const prioridades = {
  alta: { label: "Alta", color: "text-red-500" },
  media: { label: "Media", color: "text-yellow-500" },
  baja: { label: "Baja", color: "text-green-500" },
}

export function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    pendientes: 0,
    enProceso: 0,
    respondidas: 0,
    crecimiento: 0,
  })
  const [cargando, setCargando] = useState(true)
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [consultaSeleccionada, setConsultaSeleccionada] = useState<Consulta | null>(null)
  const router = useRouter()

  // Verificar autenticación al cargar
  useEffect(() => {
    if (!estaAutenticadoAdmin()) {
      router.push("/admin/login")
      return
    }

    const user = obtenerSesionAdmin()
    if (user) {
      setAdminUser(user)
      cargarDatos()
    }
  }, [router])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const [consultasData, estadisticasData] = await Promise.all([obtenerConsultas(), obtenerEstadisticasConsultas()])

      setConsultas(consultasData)
      setEstadisticas(estadisticasData)
    } catch (error) {
      console.error("Error al cargar datos:", error)
    } finally {
      setCargando(false)
    }
  }

  const handleLogout = () => {
    cerrarSesionAdmin()
    router.push("/admin/login")
  }

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      await actualizarEstadoConsulta(id, nuevoEstado as any)
      setConsultas(consultas.map((c) => (c.id === id ? { ...c, estado: nuevoEstado as any } : c)))

      const nuevasEstadisticas = await obtenerEstadisticasConsultas()
      setEstadisticas(nuevasEstadisticas)
    } catch (error) {
      console.error("Error al cambiar estado:", error)
      alert("Error al actualizar el estado")
    }
  }

  const eliminarConsultaHandler = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta consulta?")) return

    try {
      await eliminarConsulta(id)
      setConsultas(consultas.filter((c) => c.id !== id))

      const nuevasEstadisticas = await obtenerEstadisticasConsultas()
      setEstadisticas(nuevasEstadisticas)
    } catch (error) {
      console.error("Error al eliminar consulta:", error)
      alert("Error al eliminar la consulta")
    }
  }

  const consultasFiltradas = consultas.filter((consulta) => {
    const coincideBusqueda =
      consulta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      consulta.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      consulta.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      (consulta.empresa && consulta.empresa.toLowerCase().includes(busqueda.toLowerCase()))

    const coincideEstado = filtroEstado === "todos" || consulta.estado === filtroEstado
    const coincideTipo = filtroTipo === "todos" || consulta.tipo_consulta === filtroTipo

    return coincideBusqueda && coincideEstado && coincideTipo
  })

  const {
    total: totalConsultas,
    pendientes: consultasPendientes,
    enProceso: consultasEnProceso,
    respondidas: consultasRespondidas,
    crecimiento,
  } = estadisticas

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (cargando) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  if (!adminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header con información del admin */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona las consultas de contacto</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {adminUser.nombre} {adminUser.apellido}
              </span>
              <Badge variant="outline">@{adminUser.username}</Badge>
            </div>
            <Badge variant="outline" className="text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date().toLocaleDateString("es-ES")}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Consultas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConsultas}</div>
              <p className="text-xs text-muted-foreground">
                {crecimiento >= 0 ? "+" : ""}
                {crecimiento}% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{consultasPendientes}</div>
              <p className="text-xs text-muted-foreground">Requieren atención</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{consultasEnProceso}</div>
              <p className="text-xs text-muted-foreground">Siendo atendidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Respondidas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{consultasRespondidas}</div>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Consultas de Contacto</CardTitle>
            <CardDescription>Gestiona y responde a las consultas recibidas del formulario de contacto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, email o empresa..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en_proceso">En Proceso</SelectItem>
                  <SelectItem value="respondido">Respondido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="support">Soporte</SelectItem>
                  <SelectItem value="sales">Ventas</SelectItem>
                  <SelectItem value="partnership">Partnerships</SelectItem>
                  <SelectItem value="demo">Demo</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultasFiltradas.map((consulta) => {
                    const tipoInfo = tiposConsulta[consulta.tipo_consulta as keyof typeof tiposConsulta]
                    const estadoInfo = estadosConsulta[consulta.estado as keyof typeof estadosConsulta]
                    const prioridadInfo = prioridades[consulta.prioridad as keyof typeof prioridades]
                    const IconoEstado = estadoInfo.icon

                    return (
                      <TableRow key={consulta.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {consulta.nombre} {consulta.apellido}
                            </div>
                            <div className="text-sm text-muted-foreground">{consulta.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{consulta.empresa || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${tipoInfo.color} text-white`}>
                            {tipoInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <IconoEstado className="h-4 w-4" />
                            <Badge variant="outline" className={`${estadoInfo.color} text-white`}>
                              {estadoInfo.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${prioridadInfo.color}`}>{prioridadInfo.label}</span>
                        </TableCell>
                        <TableCell className="text-sm">{formatearFecha(consulta.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setConsultaSeleccionada(consulta)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => cambiarEstado(consulta.id, "en_proceso")}>
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Marcar en proceso
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => cambiarEstado(consulta.id, "respondido")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marcar respondido
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => eliminarConsultaHandler(consulta.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {consultasFiltradas.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold">No hay consultas</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  No se encontraron consultas que coincidan con los filtros.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de detalles */}
        <Dialog open={!!consultaSeleccionada} onOpenChange={() => setConsultaSeleccionada(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de la Consulta</DialogTitle>
              <DialogDescription>Información completa de la consulta recibida</DialogDescription>
            </DialogHeader>

            {consultaSeleccionada && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Cliente</label>
                    <p className="text-sm text-muted-foreground">
                      {consultaSeleccionada.nombre} {consultaSeleccionada.apellido}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{consultaSeleccionada.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Empresa</label>
                    <p className="text-sm text-muted-foreground">{consultaSeleccionada.empresa || "No especificada"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Fecha</label>
                    <p className="text-sm text-muted-foreground">{formatearFecha(consultaSeleccionada.created_at)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Tipo de Consulta</label>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={`${tiposConsulta[consultaSeleccionada.tipo_consulta as keyof typeof tiposConsulta].color} text-white`}
                    >
                      {tiposConsulta[consultaSeleccionada.tipo_consulta as keyof typeof tiposConsulta].label}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Mensaje</label>
                  <div className="mt-1 p-3 bg-muted rounded-md">
                    <p className="text-sm">{consultaSeleccionada.mensaje}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => cambiarEstado(consultaSeleccionada.id, "en_proceso")} variant="outline">
                    Marcar en Proceso
                  </Button>
                  <Button onClick={() => cambiarEstado(consultaSeleccionada.id, "respondido")}>
                    Marcar como Respondido
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
