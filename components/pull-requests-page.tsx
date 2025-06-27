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
  GitMerge,
  Plus,
  Search,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  GitBranch,
  Eye,
  AlertCircle,
} from "lucide-react"
import { RepoHeader } from "@/components/repo-header"

interface PullRequestsPageProps {
  owner: string
  name: string
}

export function PullRequestsPage({ owner, name }: PullRequestsPageProps) {
  const [activeTab, setActiveTab] = useState("open")
  const [searchQuery, setSearchQuery] = useState("")

  const pullRequests = [
    {
      number: 15,
      title: "Añadir instrumentos de percusión al segundo movimiento",
      author: "Carlos Ruiz",
      authorAvatar: "CR",
      status: "open",
      branch: "feature/percussion-section",
      targetBranch: "main",
      createdAt: "hace 2 horas",
      comments: 3,
      reviews: 1,
      changes: { additions: 45, deletions: 2 },
      labels: ["enhancement", "orchestration"],
      reviewStatus: "pending",
    },
    {
      number: 14,
      title: "Corregir articulaciones en la sección de cuerdas",
      author: "Ana Martín",
      authorAvatar: "AM",
      status: "open",
      branch: "fix/string-articulations",
      targetBranch: "main",
      createdAt: "hace 1 día",
      comments: 5,
      reviews: 2,
      changes: { additions: 12, deletions: 8 },
      labels: ["bug", "strings"],
      reviewStatus: "approved",
    },
    {
      number: 13,
      title: "Implementar variación temática en el desarrollo",
      author: "Luis Fernández",
      authorAvatar: "LF",
      status: "draft",
      branch: "feature/thematic-development",
      targetBranch: "main",
      createdAt: "hace 3 días",
      comments: 1,
      reviews: 0,
      changes: { additions: 78, deletions: 15 },
      labels: ["work-in-progress"],
      reviewStatus: "draft",
    },
    {
      number: 12,
      title: "Añadir dinámicas y expresiones",
      author: "Carmen Vega",
      authorAvatar: "CV",
      status: "merged",
      branch: "feature/dynamics",
      targetBranch: "main",
      createdAt: "hace 1 semana",
      mergedAt: "hace 5 días",
      comments: 8,
      reviews: 3,
      changes: { additions: 34, deletions: 5 },
      labels: ["enhancement"],
      reviewStatus: "approved",
    },
    {
      number: 11,
      title: "Corregir tempo en el tercer movimiento",
      author: "María González",
      authorAvatar: "MG",
      status: "closed",
      branch: "hotfix/tempo-fix",
      targetBranch: "main",
      createdAt: "hace 2 semanas",
      closedAt: "hace 1 semana",
      comments: 4,
      reviews: 1,
      changes: { additions: 6, deletions: 3 },
      labels: ["bug"],
      reviewStatus: "changes-requested",
    },
  ]

  const filteredPRs = pullRequests.filter((pr) => {
    const matchesSearch =
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.author.toLowerCase().includes(searchQuery.toLowerCase())

    switch (activeTab) {
      case "open":
        return matchesSearch && pr.status === "open"
      case "closed":
        return matchesSearch && (pr.status === "closed" || pr.status === "merged")
      case "draft":
        return matchesSearch && pr.status === "draft"
      default:
        return matchesSearch
    }
  })

  const getStatusIcon = (status: string, reviewStatus: string) => {
    if (status === "merged") return <GitMerge className="w-4 h-4 text-purple-500" />
    if (status === "closed") return <XCircle className="w-4 h-4 text-red-500" />
    if (status === "draft") return <Clock className="w-4 h-4 text-gray-500" />
    if (reviewStatus === "approved") return <CheckCircle className="w-4 h-4 text-green-500" />
    if (reviewStatus === "changes-requested") return <AlertCircle className="w-4 h-4 text-orange-500" />
    return <GitMerge className="w-4 h-4 text-blue-500" />
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "merged":
        return "Fusionado"
      case "closed":
        return "Cerrado"
      case "draft":
        return "Borrador"
      default:
        return "Abierto"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <RepoHeader owner={owner} name={name} currentPage="pulls" />

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <GitMerge className="w-6 h-6" />
              Pull Requests
            </h1>
          </div>
          <Button asChild>
            <Link href={`/repo/${owner}/${name}/compare`}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Pull Request
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="open" className="flex items-center gap-2">
                    <GitMerge className="w-4 h-4" />
                    Abiertos ({pullRequests.filter((pr) => pr.status === "open").length})
                  </TabsTrigger>
                  <TabsTrigger value="closed" className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Cerrados ({pullRequests.filter((pr) => pr.status === "closed" || pr.status === "merged").length})
                  </TabsTrigger>
                  <TabsTrigger value="draft" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Borradores ({pullRequests.filter((pr) => pr.status === "draft").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pull requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {filteredPRs.map((pr, index) => (
                <div key={pr.number}>
                  <div className="py-4">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-2 mt-1">{getStatusIcon(pr.status, pr.reviewStatus)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link
                                href={`/repo/${owner}/${name}/pull/${pr.number}`}
                                className="font-semibold text-primary hover:underline"
                              >
                                {pr.title}
                              </Link>
                              <span className="text-muted-foreground">#{pr.number}</span>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              {pr.labels.map((label, labelIndex) => (
                                <Badge key={labelIndex} variant="secondary" className="text-xs">
                                  {label}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Avatar className="w-4 h-4">
                                  <AvatarFallback className="text-xs">{pr.authorAvatar}</AvatarFallback>
                                </Avatar>
                                <span>{pr.author}</span>
                              </div>
                              <span>
                                {getStatusText(pr.status)} {pr.createdAt}
                              </span>
                              <div className="flex items-center gap-1">
                                <GitBranch className="w-3 h-3" />
                                <span>
                                  {pr.branch} → {pr.targetBranch}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {pr.reviews > 0 && (
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{pr.reviews}</span>
                              </div>
                            )}
                            {pr.comments > 0 && (
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{pr.comments}</span>
                              </div>
                            )}
                            <div className="text-xs">
                              <span className="text-green-600">+{pr.changes.additions}</span>{" "}
                              <span className="text-red-600">-{pr.changes.deletions}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < filteredPRs.length - 1 && <Separator />}
                </div>
              ))}

              {filteredPRs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <GitMerge className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No hay pull requests que coincidan con tu búsqueda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crear Pull Request</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Propón cambios comparando ramas y solicita revisión de colaboradores.
              </p>
              <Button asChild className="w-full">
                <Link href={`/repo/${owner}/${name}/compare`}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo PR
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revisiones Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {pullRequests.filter((pr) => pr.reviewStatus === "pending").length} PRs esperan tu revisión.
              </p>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Ver Pendientes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Abiertos:</span>
                  <span>{pullRequests.filter((pr) => pr.status === "open").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fusionados:</span>
                  <span>{pullRequests.filter((pr) => pr.status === "merged").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cerrados:</span>
                  <span>{pullRequests.filter((pr) => pr.status === "closed").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
