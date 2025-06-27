"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { GitBranch, ArrowRight, GitMerge, FileText, Music, CheckCircle, Eye } from "lucide-react"
import { RepoHeader } from "@/components/repo-header"

interface ComparePageProps {
  owner: string
  name: string
}

export function ComparePage({ owner, name }: ComparePageProps) {
  const [baseBranch, setBaseBranch] = useState("main")
  const [compareBranch, setCompareBranch] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const branches = ["main", "develop", "feature/percussion-section", "feature/string-improvements", "hotfix/tempo-fix"]

  const changes = [
    {
      file: "movements/second-movement.xml",
      additions: 32,
      deletions: 1,
      status: "modified",
    },
    {
      file: "parts/timpani.xml",
      additions: 8,
      deletions: 0,
      status: "added",
    },
    {
      file: "parts/percussion.xml",
      additions: 5,
      deletions: 1,
      status: "modified",
    },
  ]

  const canCreatePR = baseBranch && compareBranch && baseBranch !== compareBranch && title.trim()

  const handleCreatePR = () => {
    if (canCreatePR) {
      // Simular creación de PR
      alert("Pull Request creado exitosamente!")
      // Redireccionar a la nueva PR
      window.location.href = `/repo/${owner}/${name}/pull/16`
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <RepoHeader owner={owner} name={name} currentPage="pulls" />

      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Comparar cambios</h1>
          <p className="text-muted-foreground">Compara ramas y crea un pull request para proponer cambios.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Branch Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Seleccionar ramas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Rama base</label>
                    <Select value={baseBranch} onValueChange={setBaseBranch}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-center pt-6">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Rama a comparar</label>
                    <Select value={compareBranch} onValueChange={setCompareBranch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rama" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches
                          .filter((branch) => branch !== baseBranch)
                          .map((branch) => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {baseBranch && compareBranch && baseBranch !== compareBranch && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>
                        Comparando <Badge variant="outline">{compareBranch}</Badge> con{" "}
                        <Badge variant="outline">{baseBranch}</Badge>
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Changes Preview */}
            {compareBranch && baseBranch !== compareBranch && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Cambios detectados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="default">
                        {changes.length} archivo{changes.length !== 1 ? "s" : ""} modificado
                        {changes.length !== 1 ? "s" : ""}
                      </Badge>
                      <span className="text-green-600">
                        +{changes.reduce((sum, change) => sum + change.additions, 0)} adiciones
                      </span>
                      <span className="text-red-600">
                        -{changes.reduce((sum, change) => sum + change.deletions, 0)} eliminaciones
                      </span>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      {changes.map((change, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                change.status === "added"
                                  ? "default"
                                  : change.status === "modified"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {change.status}
                            </Badge>
                            <span className="font-mono text-sm">{change.file}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-green-600">+{change.additions}</span>{" "}
                            <span className="text-red-600">-{change.deletions}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PR Form */}
            {compareBranch && baseBranch !== compareBranch && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitMerge className="w-5 h-5" />
                    Crear Pull Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Título *</label>
                    <Input
                      placeholder="Describe brevemente los cambios..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Descripción</label>
                    <Textarea
                      placeholder="Describe detalladamente los cambios, motivación y contexto..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={handleCreatePR} disabled={!canCreatePR}>
                      <GitMerge className="w-4 h-4 mr-2" />
                      Crear Pull Request
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Vista previa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Music className="w-4 h-4 mr-2" />
                  Reproducir cambios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver diff completo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Cambiar rama base
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consejos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Título descriptivo</div>
                    <div className="text-muted-foreground">Usa un título claro que explique el cambio principal</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Descripción detallada</div>
                    <div className="text-muted-foreground">Explica el contexto y la motivación de los cambios</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Revisores apropiados</div>
                    <div className="text-muted-foreground">Asigna revisores que conozcan el área modificada</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent PRs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">PRs recientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">#15 Percusión segundo movimiento</div>
                  <div className="text-muted-foreground">feature/percussion → main</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">#14 Corrección articulaciones</div>
                  <div className="text-muted-foreground">fix/strings → main</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">#13 Variación temática</div>
                  <div className="text-muted-foreground">feature/development → main</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
