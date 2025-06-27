"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { estaAutenticadoAdmin } from "@/lib/admin-session"

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const autenticado = await estaAutenticadoAdmin()

        if (!autenticado) {
          router.push("/admin/login")
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    verificarAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span>Verificando acceso...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Se redirigirá al login
  }

  return <AdminDashboard />
}
