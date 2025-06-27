import { supabase } from "./supabase"
import type { AdminUser } from "./admin-auth"

// Verificar si está autenticado usando Supabase Auth
export async function estaAutenticadoAdmin(): Promise<boolean> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    return !error && !!session
  } catch (error) {
    console.error("Error al verificar autenticación:", error)
    return false
  }
}

// Obtener datos del admin actual
export async function obtenerDatosAdmin(): Promise<AdminUser | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return {
      id: user.id,
      email: user.email || "",
      nombre: user.user_metadata?.nombre || "Usuario",
      apellido: user.user_metadata?.apellido || "Admin",
      ultimo_acceso: new Date().toISOString(),
    } as AdminUser
  } catch (error) {
    console.error("Error al obtener datos del admin:", error)
    return null
  }
}

// Obtener sesión del admin (alias para compatibilidad)
export async function obtenerSesionAdmin(): Promise<AdminUser | null> {
  return await obtenerDatosAdmin()
}

// Cerrar sesión del admin
export async function cerrarSesionAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
  }
}

// Limpiar sesión (alias para compatibilidad)
export function limpiarSesionAdmin(): void {
  // Con Supabase Auth, esto se maneja automáticamente
  // Pero mantenemos la función para compatibilidad
}
