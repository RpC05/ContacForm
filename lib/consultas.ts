import { supabase, type Consulta, type ConsultaInsert } from "./supabase"

// Obtener todas las consultas
export async function obtenerConsultas(): Promise<Consulta[]> {
  const { data, error } = await supabase.from("consultas").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener consultas:", error)
    throw error
  }

  return data || []
}

// Crear nueva consulta
export async function crearConsulta(consulta: ConsultaInsert): Promise<Consulta> {
  const { data, error } = await supabase.from("consultas").insert([consulta]).select().single()

  if (error) {
    console.error("Error al crear consulta:", error)
    throw error
  }

  return data
}

// Actualizar estado de consulta
export async function actualizarEstadoConsulta(id: number, estado: Consulta["estado"]): Promise<void> {
  const { error } = await supabase.from("consultas").update({ estado }).eq("id", id)

  if (error) {
    console.error("Error al actualizar estado:", error)
    throw error
  }
}

// Actualizar prioridad de consulta
export async function actualizarPrioridadConsulta(id: number, prioridad: Consulta["prioridad"]): Promise<void> {
  const { error } = await supabase.from("consultas").update({ prioridad }).eq("id", id)

  if (error) {
    console.error("Error al actualizar prioridad:", error)
    throw error
  }
}

// Eliminar consulta
export async function eliminarConsulta(id: number): Promise<void> {
  const { error } = await supabase.from("consultas").delete().eq("id", id)

  if (error) {
    console.error("Error al eliminar consulta:", error)
    throw error
  }
}

// Obtener estadísticas
export async function obtenerEstadisticasConsultas() {
  const { data, error } = await supabase.from("consultas").select("estado, tipo_consulta, created_at")

  if (error) {
    console.error("Error al obtener estadísticas:", error)
    throw error
  }

  const total = data?.length || 0
  const pendientes = data?.filter((c) => c.estado === "pendiente").length || 0
  const enProceso = data?.filter((c) => c.estado === "en_proceso").length || 0
  const respondidas = data?.filter((c) => c.estado === "respondido").length || 0

  // Calcular consultas del mes actual
  const inicioMes = new Date()
  inicioMes.setDate(1)
  inicioMes.setHours(0, 0, 0, 0)

  const consultasEsteMes = data?.filter((c) => new Date(c.created_at) >= inicioMes).length || 0

  // Calcular consultas del mes anterior
  const inicioMesAnterior = new Date(inicioMes)
  inicioMesAnterior.setMonth(inicioMesAnterior.getMonth() - 1)

  const finMesAnterior = new Date(inicioMes)
  finMesAnterior.setTime(finMesAnterior.getTime() - 1)

  const consultasMesAnterior =
    data?.filter((c) => {
      const fecha = new Date(c.created_at)
      return fecha >= inicioMesAnterior && fecha <= finMesAnterior
    }).length || 0

  const crecimiento =
    consultasMesAnterior > 0 ? Math.round(((consultasEsteMes - consultasMesAnterior) / consultasMesAnterior) * 100) : 0

  return {
    total,
    pendientes,
    enProceso,
    respondidas,
    crecimiento,
  }
}
