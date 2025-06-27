"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Music,
  MapPin,
  LinkIcon,
  Calendar,
  Star,
  GitFork,
  Eye,
  Users,
  Award,
  MessageSquare,
  Mail,
  Github,
  Twitter,
} from "lucide-react"
import { Header } from "@/components/header"

interface ProfilePageProps {
  username: string
}

export function ProfilePage({ username }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("repositories")

  const userProfile = {
    name: "María González",
    username: "mariagonzalez",
    bio: "Compositora clásica y arreglista. Especializada en música orquestal y de cámara. Profesora en el Conservatorio Superior de Madrid.",
    location: "Madrid, España",
    website: "https://mariagonzalez.music",
    joinDate: "Marzo 2023",
    avatar: "/placeholder.svg?height=120&width=120",
    followers: 234,
    following: 89,
    publicRepos: 12,
    totalStars: 456,
    totalForks: 123,
    contributions: 89,
    badges: ["Compositor del Mes", "Mentor Activo", "Colaborador Top"],
    socialLinks: {
      github: "mariagonzalez",
      twitter: "maria_composer",
      email: "maria@example.com",
    },
  }

  const repositories = [
    {
      name: "Sinfonía en Do Mayor",
      description: "Composición orquestal inspirada en el estilo clásico",
      language: "Classical",
      stars: 24,
      forks: 8,
      views: 156,
      updatedAt: "hace 2 horas",
      isPrivate: false,
    },
    {
      name: "Cuarteto de Cuerdas Op. 1",
      description: "Mi primer cuarteto de cuerdas en Re menor",
      language: "Chamber",
      stars: 18,
      forks: 5,
      views: 89,
      updatedAt: "hace 1 día",
      isPrivate: false,
    },
    {
      name: "Estudios para Piano",
      description: "Serie de estudios técnicos para piano avanzado",
      language: "Classical",
      stars: 31,
      forks: 15,
      views: 203,
      updatedAt: "hace 3 días",
      isPrivate: false,
    },
    {
      name: "Arreglos Navideños",
      description: "Arreglos modernos de villancicos tradicionales",
      language: "Arrangements",
      stars: 12,
      forks: 4,
      views: 67,
      updatedAt: "hace 1 semana",
      isPrivate: true,
    },
  ]

  const contributions = [
    {
      repo: "Electronic Symphony",
      author: "DJ Composer",
      type: "pull-request",
      title: "Añadir sección de cuerdas",
      date: "hace 2 días",
    },
    {
      repo: "Flamenco Fusion",
      author: "Carmen Vega",
      type: "issue",
      title: "Sugerencia para mejorar el ritmo",
      date: "hace 1 semana",
    },
    {
      repo: "Jazz Standards",
      author: "Carlos Ruiz",
      type: "review",
      title: "Revisión de armonías",
      date: "hace 2 semanas",
    },
  ]

  const achievements = [
    {
      title: "Compositor del Mes",
      description: "Reconocimiento por contribuciones excepcionales",
      date: "Noviembre 2024",
      icon: Award,
    },
    {
      title: "100 Estrellas",
      description: "Alcanzó 100 estrellas en sus repositorios",
      date: "Octubre 2024",
      icon: Star,
    },
    {
      title: "Mentor Activo",
      description: "Ayudó a más de 50 compositores novatos",
      date: "Septiembre 2024",
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">MG</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-bold">{userProfile.name}</h1>
                  <p className="text-muted-foreground">@{userProfile.username}</p>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="text-sm">{userProfile.bio}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{userProfile.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LinkIcon className="w-4 h-4" />
                    <Link href={userProfile.website} className="text-primary hover:underline">
                      {userProfile.website}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Se unió en {userProfile.joinDate}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold">{userProfile.followers}</div>
                    <div className="text-muted-foreground">seguidores</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{userProfile.following}</div>
                    <div className="text-muted-foreground">siguiendo</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Seguir
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enlaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <Github className="w-4 h-4" />
                  <span>@{userProfile.socialLinks.github}</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <Twitter className="w-4 h-4" />
                  <span>@{userProfile.socialLinks.twitter}</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                  <Mail className="w-4 h-4" />
                  <span>{userProfile.socialLinks.email}</span>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Logros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="w-full justify-center">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold">{userProfile.publicRepos}</div>
                  <div className="text-sm text-muted-foreground">Repositorios</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold">{userProfile.totalStars}</div>
                  <div className="text-sm text-muted-foreground">Estrellas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold">{userProfile.totalForks}</div>
                  <div className="text-sm text-muted-foreground">Forks</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold">{userProfile.contributions}</div>
                  <div className="text-sm text-muted-foreground">Contribuciones</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="repositories">Repositorios</TabsTrigger>
                <TabsTrigger value="contributions">Contribuciones</TabsTrigger>
                <TabsTrigger value="achievements">Logros</TabsTrigger>
                <TabsTrigger value="activity">Actividad</TabsTrigger>
              </TabsList>

              <TabsContent value="repositories" className="mt-6">
                <div className="space-y-4">
                  {repositories.map((repo, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link
                                href={`/repo/${username}/${repo.name.toLowerCase().replace(/\s+/g, "-")}`}
                                className="font-semibold text-primary hover:underline"
                              >
                                {repo.name}
                              </Link>
                              {repo.isPrivate && (
                                <Badge variant="secondary" className="text-xs">
                                  Privado
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{repo.language}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {repo.stars}
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />
                                {repo.forks}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {repo.views}
                              </div>
                              <span>Actualizado {repo.updatedAt}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="contributions" className="mt-6">
                <div className="space-y-4">
                  {contributions.map((contribution, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Music className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{contribution.type}</span>
                              <span className="text-muted-foreground">en</span>
                              <Link href="#" className="text-primary hover:underline">
                                {contribution.repo}
                              </Link>
                              <span className="text-muted-foreground">por {contribution.author}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{contribution.title}</p>
                            <p className="text-xs text-muted-foreground">{contribution.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                            <achievement.icon className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Gráfico de actividad próximamente</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
