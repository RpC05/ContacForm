import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface Consulta {
  id: number
  nombre: string
  apellido: string
  email: string
  empresa?: string
  tipo_consulta: "support" | "sales" | "partnership" | "demo" | "feedback" | "other"
  mensaje: string
  estado: "pendiente" | "en_proceso" | "respondido"
  prioridad: "alta" | "media" | "baja"
  created_at: string
  updated_at: string
}

export interface ConsultaInsert {
  nombre: string
  apellido: string
  email: string
  empresa?: string
  tipo_consulta: "support" | "sales" | "partnership" | "demo" | "feedback" | "other"
  mensaje: string
}
