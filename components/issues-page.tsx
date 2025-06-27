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
  AlertCircle,
  Plus,
  Search,
  MessageSquare,
  CheckCircle,
  Clock,
  Tag,
  Bug,
  Lightbulb,
  HelpCircle,
} from "lucide-react"
import { RepoHeader } from "@/components/repo-header"

interface IssuesPageProps {
  owner: string
  name: string
}

export function IssuesPage({ owner, name }: IssuesPageProps) {
  const [activeTab, setActiveTab] = useState("open")
  const [searchQuery, setSearchQuery] = useState("")

  const issues = [
    {
      number: 23,
      title: "Revisar tempo en el tercer movimiento - suena demasiado rápido",
      author: "Luis Fernández",
      authorAvatar: "LF",
      status: "open",
      createdAt: "hace 3 horas",
      comments: 2,
      labels: ["enhancement", "tempo"],
      type: "enhancement",
      assignee: "María González",
      priority: "high",
    },
    {
      number: 22,
      title: "Falta indicación de pedal en compás 120 del piano",
      author: "Carmen Vega",
      authorAvatar: "CV",
      status: "open",
      createdAt: "hace 1 día",
      comments: 1,
      labels: ["bug", "piano"],
      type: "bug",
      assignee: null,
      priority: "medium",
    },
    {
      number: 21,
      title: "Añadir variaciones dinámicas en la sección de cuerdas",
      author: "Ana Martín",
      authorAvatar: "AM",
      status: "open",
      createdAt: "hace 2 días",
      comments: 5,
      labels: ["enhancement", "dynamics", "strings"],
      type: "enhancement",
      assignee: "Carlos Ruiz",
      priority: "low",
    },
    {
      number: 20,
      title: "Inconsistencia en las articulaciones de los vientos",
      author: "Carlos Ruiz",
      authorAvatar: "CR",
      status: "in-progress",
      createdAt: "hace 3 días",
      comments: 8,
      labels: ["bug", "winds", "articulation"],
      type: "bug",
      assignee: "Carlos Ruiz",
      priority: "high",
    },
    {
      number: 19,
      title: "Sugerencia: Añadir sección de percusión en el clímax",
      author: "Diego Morales",
      authorAvatar: "DM",
      status: "open",
      createdAt: "hace 1 semana",
      comments: 12,
      labels: ["enhancement", "percussion", "orchestration"],
      type: "enhancement",
      assignee: null,
      priority: "medium",
    },
    {
      number: 18,
      title: "Error en la exportación MIDI - notas duplicadas",
      author: "Elena Sánchez",
      authorAvatar: "ES",
      status: "closed",
      createdAt: "hace 2 semanas",
      closedAt: "hace 1 semana",
      comments: 6,
      labels: ["bug", "export", "midi"],
      type: "bug",
      assignee: "María González",
      priority: "high",
    },
  ]

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.author.toLowerCase().includes(searchQuery.toLowerCase())

    switch (activeTab) {
      case "open":
        return matchesSearch && (issue.status === "open" || issue.status === "in-progress")
      case "closed":
        return matchesSearch && issue.status === "closed"
      case "assigned":
        return matchesSearch && issue.assignee === "María González"
      default:
        return matchesSearch
    }
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "closed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <Bug className="w-4 h-4 text-red-500" />
      case "enhancement":
        return <Lightbulb className="w-4 h-4 text-yellow-500" />
      default:
        return <HelpCircle className="w-4 h-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <RepoHeader owner={owner} name={name} currentPage="issues" />

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Issues
            </h1>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Issue
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="open" className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Abiertos (
                    {issues.filter((issue) => issue.status === "open" || issue.status === "in-progress").length})
                  </TabsTrigger>
                  <TabsTrigger value="closed" className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Cerrados ({issues.filter((issue) => issue.status === "closed").length})
                  </TabsTrigger>
                  <TabsTrigger value="assigned" className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Asignados a mí ({issues.filter((issue) => issue.assignee === "María González").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {filteredIssues.map((issue, index) => (
                <div key={issue.number}>
                  <div className="py-4">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(issue.status)}
                        {getTypeIcon(issue.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link
                                href={`/repo/${owner}/${name}/issues/${issue.number}`}
                                className="font-semibold text-primary hover:underline"
                              >
                                {issue.title}
                              </Link>
                              <span className="text-muted-foreground">#{issue.number}</span>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>{issue.priority}</Badge>
                              {issue.labels.map((label, labelIndex) => (
                                <Badge key={labelIndex} variant="secondary" className="text-xs">
                                  {label}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Avatar className="w-4 h-4">
                                  <AvatarFallback className="text-xs">{issue.authorAvatar}</AvatarFallback>
                                </Avatar>
                                <span>{issue.author}</span>
                              </div>
                              <span>abierto {issue.createdAt}</span>
                              {issue.assignee && (
                                <div className="flex items-center gap-1">
                                  <span>asignado a</span>
                                  <Avatar className="w-4 h-4">
                                    <AvatarFallback className="text-xs">
                                      {issue.assignee
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{issue.assignee}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {issue.comments > 0 && (
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{issue.comments}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < filteredIssues.length - 1 && <Separator />}
                </div>
              ))}

              {filteredIssues.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No hay issues que coincidan con tu búsqueda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bug className="w-5 h-5 text-red-500" />
                Reportar Bug
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Reporta errores en la partitura o problemas técnicos.
              </p>
              <Button className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Bug
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Sugerir Mejora
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Propón mejoras musicales o nuevas características.</p>
              <Button className="w-full" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Sugerencia
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
                  <span>
                    {issues.filter((issue) => issue.status === "open" || issue.status === "in-progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cerrados:</span>
                  <span>{issues.filter((issue) => issue.status === "closed").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asignados:</span>
                  <span>{issues.filter((issue) => issue.assignee).length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtros Rápidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Bug className="w-4 h-4 mr-2" />
                  Solo Bugs
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Solo Mejoras
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Alta Prioridad
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
