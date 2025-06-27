"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, GitCommit, Star, GitFork, Eye, Activity } from "lucide-react"
import { RepoHeader } from "@/components/repo-header"

interface InsightsPageProps {
  owner: string
  name: string
}

export function InsightsPage({ owner, name }: InsightsPageProps) {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = {
    totalViews: 1247,
    uniqueVisitors: 892,
    stars: 45,
    forks: 12,
    downloads: 234,
    commits: 89,
    contributors: 5,
    issues: 8,
    pullRequests: 15,
  }

  const contributors = [
    { name: "María González", avatar: "MG", commits: 34, additions: 1250, deletions: 340 },
    { name: "Carlos Ruiz", avatar: "CR", commits: 28, additions: 890, deletions: 120 },
    { name: "Ana Martín", avatar: "AM", commits: 15, additions: 560, deletions: 89 },
    { name: "Luis Fernández", avatar: "LF", commits: 8, additions: 320, deletions: 45 },
    { name: "Carmen Vega", avatar: "CV", commits: 4, additions: 180, deletions: 23 },
  ]

  const popularFiles = [
    { name: "movements/first-movement.xml", views: 234, percentage: 85 },
    { name: "movements/second-movement.xml", views: 189, percentage: 68 },
    { name: "parts/violin-1.xml", views: 156, percentage: 56 },
    { name: "parts/piano.xml", views: 134, percentage: 48 },
    { name: "arrangements/chamber-version.xml", views: 98, percentage: 35 },
  ]

  const trafficSources = [
    { source: "Búsqueda directa", visitors: 345, percentage: 39 },
    { source: "Redes sociales", visitors: 267, percentage: 30 },
    { source: "Referencias", visitors: 178, percentage: 20 },
    { source: "Comunidad MelodicHub", visitors: 102, percentage: 11 },
  ]

  const weeklyActivity = [
    { day: "Lun", commits: 5, views: 45 },
    { day: "Mar", commits: 8, views: 67 },
    { day: "Mié", commits: 12, views: 89 },
    { day: "Jue", commits: 6, views: 56 },
    { day: "Vie", commits: 15, views: 123 },
    { day: "Sáb", commits: 3, views: 34 },
    { day: "Dom", commits: 2, views: 28 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <RepoHeader owner={owner} name={name} currentPage="insights" />

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Insights
            </h1>
            <p className="text-muted-foreground">Analíticas y estadísticas del repositorio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setTimeRange("7d")}>
              7 días
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeRange("30d")}>
              30 días
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeRange("90d")}>
              90 días
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="traffic">Tráfico</TabsTrigger>
            <TabsTrigger value="contributors">Colaboradores</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="community">Comunidad</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Visualizaciones</p>
                      <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +12% vs mes anterior
                      </p>
                    </div>
                    <Eye className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Estrellas</p>
                      <p className="text-2xl font-bold">{stats.stars}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +8% vs mes anterior
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Forks</p>
                      <p className="text-2xl font-bold">{stats.forks}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +25% vs mes anterior
                      </p>
                    </div>
                    <GitFork className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Commits</p>
                      <p className="text-2xl font-bold">{stats.commits}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +15% vs mes anterior
                      </p>
                    </div>
                    <GitCommit className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Actividad semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 text-xs text-muted-foreground">Commits</div>
                          <Progress value={(day.commits / 15) * 100} className="flex-1 h-2" />
                          <div className="w-8 text-xs text-right">{day.commits}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 text-xs text-muted-foreground">Vistas</div>
                          <Progress value={(day.views / 123) * 100} className="flex-1 h-2" />
                          <div className="w-8 text-xs text-right">{day.views}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Principales colaboradores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributors.slice(0, 3).map((contributor, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{contributor.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{contributor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {contributor.commits} commits • +{contributor.additions} -{contributor.deletions}
                        </div>
                      </div>
                      <Badge variant="secondary">{index + 1}°</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            {/* Traffic Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visitantes únicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stats.uniqueVisitors.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">En los últimos 30 días</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Descargas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stats.downloads.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Archivos descargados</p>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Fuentes de tráfico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="font-medium">{source.source}</div>
                        <div className="text-sm text-muted-foreground">{source.visitors} visitantes</div>
                      </div>
                      <div className="w-24">
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                      <div className="w-12 text-sm text-right">{source.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Content */}
            <Card>
              <CardHeader>
                <CardTitle>Contenido más popular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="font-mono text-sm">{file.name}</div>
                        <div className="text-sm text-muted-foreground">{file.views} visualizaciones</div>
                      </div>
                      <div className="w-24">
                        <Progress value={file.percentage} className="h-2" />
                      </div>
                      <div className="w-12 text-sm text-right">{file.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Todos los colaboradores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>{contributor.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-lg">{contributor.name}</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {contributor.commits} commits en los últimos 30 días
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600">+{contributor.additions} adiciones</span>
                          <span className="text-red-600">-{contributor.deletions} eliminaciones</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {index === 0 ? "Top Contributor" : `#${index + 1}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Archivos por tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Partituras (.xml)</span>
                      <Badge variant="secondary">24 archivos</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audio (.mp3)</span>
                      <Badge variant="secondary">8 archivos</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Documentación (.md)</span>
                      <Badge variant="secondary">5 archivos</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Imágenes (.png)</span>
                      <Badge variant="secondary">12 archivos</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de código</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total de líneas</span>
                      <span className="font-mono">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compases totales</span>
                      <span className="font-mono">342</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Instrumentos</span>
                      <span className="font-mono">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Movimientos</span>
                      <span className="font-mono">4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Estrellas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stats.stars}</div>
                  <p className="text-sm text-muted-foreground">+8 este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitFork className="w-5 h-5" />
                    Forks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{stats.forks}</div>
                  <p className="text-sm text-muted-foreground">+3 este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Watchers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">28</div>
                  <p className="text-sm text-muted-foreground">+5 este mes</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Actividad de la comunidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Issues abiertas</span>
                    </div>
                    <Badge variant="secondary">{stats.issues}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Pull Requests</span>
                    </div>
                    <Badge variant="secondary">{stats.pullRequests}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Discusiones</span>
                    </div>
                    <Badge variant="secondary">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
