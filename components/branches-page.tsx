"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  GitBranch,
  Plus,
  Search,
  GitMerge,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
} from "lucide-react"
import { RepoHeader } from "@/components/repo-header"

interface BranchesPageProps {
  owner: string
  name: string
}

export function BranchesPage({ owner, name }: BranchesPageProps) {
  const [activeFilter, setActiveFilter] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const branches = [
    {
      name: "main",
      isDefault: true,
      lastCommit: "Añadir sección de desarrollo en el segundo movimiento",
      author: "María González",
      lastUpdate: "hace 2 horas",
      ahead: 0,
      behind: 0,
      status: "up-to-date",
      pullRequest: null,
    },
    {
      name: "feature/orquesta-completa",
      isDefault: false,
      lastCommit: "Implementar sección de vientos en el primer movimiento",
      author: "Carlos Ruiz",
      lastUpdate: "hace 1 día",
      ahead: 3,
      behind: 1,
      status: "ahead",
      pullRequest: {
        number: 12,
        title: "Añadir instrumentos de viento",
        status: "open",
      },
    },
    {
      name: "feature/version-piano",
      isDefault: false,
      lastCommit: "Adaptar melodía principal para piano solo",
      author: "Ana Martín",
      lastUpdate: "hace 3 días",
      ahead: 5,
      behind: 2,
      status: "ahead",
      pullRequest: null,
    },
    {
      name: "hotfix/tempo-corrections",
      isDefault: false,
      lastCommit: "Corregir indicaciones de tempo en compases 45-60",
      author: "Luis Fernández",
      lastUpdate: "hace 1 semana",
      ahead: 1,
      behind: 5,
      status: "behind",
      pullRequest: {
        number: 8,
        title: "Correcciones de tempo",
        status: "merged",
      },
    },
    {
      name: "experiment/jazz-fusion",
      isDefault: false,
      lastCommit: "Experimentar con armonías de jazz",
      author: "Carmen Vega",
      lastUpdate: "hace 2 semanas",
      ahead: 8,
      behind: 12,
      status: "diverged",
      pullRequest: null,
    },
  ]

  const filteredBranches = branches.filter((branch) => {
    const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase())

    switch (activeFilter) {
      case "yours":
        return matchesSearch && branch.author === "María González"
      case "active":
        return matchesSearch && new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) < new Date()
      case "stale":
        return matchesSearch && new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) > new Date()
      default:
        return matchesSearch
    }
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up-to-date":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "ahead":
        return <ArrowUp className="w-4 h-4 text-blue-500" />
      case "behind":
        return <ArrowDown className="w-4 h-4 text-orange-500" />
      case "diverged":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (branch: any) => {
    if (branch.status === "up-to-date") return "Actualizada"
    if (branch.status === "ahead") return `${branch.ahead} commits por delante`
    if (branch.status === "behind") return `${branch.behind} commits por detrás`
    if (branch.status === "diverged") return `${branch.ahead} por delante, ${branch.behind} por detrás`
    return "Estado desconocido"
  }

  return (
    <div className="min-h-screen bg-background">
      <RepoHeader owner={owner} name={name} currentPage="branches" />

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <GitBranch className="w-6 h-6" />
              Ramas
            </h1>
            <Badge variant="secondary">{branches.length} ramas</Badge>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva rama
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Tabs value={activeFilter} onValueChange={setActiveFilter}>
                  <TabsList>
                    <TabsTrigger value="overview">Resumen</TabsTrigger>
                    <TabsTrigger value="yours">Tuyas</TabsTrigger>
                    <TabsTrigger value="active">Activas</TabsTrigger>
                    <TabsTrigger value="stale">Obsoletas</TabsTrigger>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ramas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {filteredBranches.map((branch, index) => (
                <div key={branch.name}>
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(branch.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/repo/${owner}/${name}/tree/${branch.name}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {branch.name}
                            </Link>
                            {branch.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                Principal
                              </Badge>
                            )}
                            {branch.pullRequest && (
                              <Badge
                                variant={branch.pullRequest.status === "open" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                PR #{branch.pullRequest.number}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {getStatusText(branch)} • {branch.lastUpdate}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{branch.lastCommit}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Avatar className="w-4 h-4">
                            <AvatarFallback className="text-xs">
                              {branch.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {branch.author}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {branch.pullRequest ? (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/repo/${owner}/${name}/pull/${branch.pullRequest.number}`}>
                              <GitMerge className="w-4 h-4 mr-2" />
                              Ver PR
                            </Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <GitMerge className="w-4 h-4 mr-2" />
                            Crear PR
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < filteredBranches.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branch Protection Rules */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Reglas de Protección de Ramas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">main</div>
                  <div className="text-sm text-muted-foreground">
                    Requiere revisión de pull request • Requiere verificación de estado
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
