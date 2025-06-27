import { supabase } from "./supabase"

export interface AdminUser {
  id: string
  email: string
  nombre?: string
  apellido?: string
  ultimo_acceso: string
}

export interface LoginCredentials {
  email: string
  password: string
}

// Verificar credenciales usando Supabase Auth
export async function verificarCredencialesAdmin(credentials: LoginCredentials): Promise<AdminUser | null> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error || !data.user) {
      console.error("Error de autenticación:", error)
      return null
    }

    // Retornar usuario autenticado
    return {
      id: data.user.id,
      email: data.user.email || "",
      nombre: data.user.user_metadata?.nombre || "Usuario",
      apellido: data.user.user_metadata?.apellido || "Admin",
      ultimo_acceso: new Date().toISOString(),
    } as AdminUser
  } catch (error) {
    console.error("Error al verificar credenciales:", error)
    return null
  }
}

// Cerrar sesión
export async function cerrarSesionAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
  }
}

// Obtener usuario actual
export async function obtenerUsuarioActual(): Promise<AdminUser | null> {
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
    console.error("Error al obtener usuario actual:", error)
    return null
  }
}
