"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Download,
  ZoomIn,
  ZoomOut,
  Volume2,
  SkipBack,
  SkipForward,
  Square,
  FileText,
  Music,
  Eye,
  Share2,
} from "lucide-react"

interface SheetMusicViewerProps {
  branch: string
}

export function SheetMusicViewer({ branch }: SheetMusicViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoom, setZoom] = useState([100])
  const [volume, setVolume] = useState([80])

  return (
    <div className="space-y-4">
      {/* Viewer Toolbar - Read Only */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Visualizador de Partituras
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Solo lectura</Badge>
              <Badge variant="outline">Rama: {branch}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Read-only Toolbar */}
          <div className="flex items-center justify-between">
            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setZoom([Math.max(25, zoom[0] - 25)])}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm w-12 text-center">{zoom[0]}%</span>
              <Button size="sm" variant="outline" onClick={() => setZoom([Math.min(400, zoom[0] + 25)])}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={() => setIsPlaying(!isPlaying)} className="px-4">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline">
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Square className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <div className="w-20">
                  <Slider value={volume} onValueChange={setVolume} max={100} min={0} step={1} className="w-full" />
                </div>
              </div>
            </div>

            {/* Export Actions */}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sheet Music Display - Read Only */}
      <Card className="min-h-[700px]">
        <CardContent className="p-0">
          <div
            className="bg-white dark:bg-gray-50 min-h-[700px] relative overflow-auto"
            style={{ zoom: `${zoom[0]}%` }}
          >
            {/* Page Header */}
            <div className="text-center py-8 px-8">
              <h1 className="text-3xl font-bold mb-2">Sinfonía en Do Mayor</h1>
              <h2 className="text-xl mb-1">I. Allegro con brio</h2>
              <p className="text-sm text-gray-600">María González</p>
              <div className="mt-4 text-xs text-gray-500">
                Rama: {branch} • Solo lectura • Para editar, usa el botón "Editar archivo"
              </div>
            </div>

            {/* Musical Score - Same as before but read-only */}
            <div className="px-8 pb-8 space-y-8">
              {/* System 1 */}
              <div className="relative">
                {/* Treble Clef Staff */}
                <div className="relative h-24 mb-4">
                  {/* Staff Lines */}
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="absolute w-full h-px bg-black" style={{ top: `${16 + line * 16}px` }} />
                  ))}

                  {/* Treble Clef */}
                  <div className="absolute left-4 top-2 text-4xl font-bold">𝄞</div>

                  {/* Time Signature */}
                  <div className="absolute left-20 top-3 text-xl font-bold">
                    <div>4</div>
                    <div>4</div>
                  </div>

                  {/* Measures with Notes */}
                  <div className="absolute left-32 top-0 w-full h-full">
                    {/* Measure 1 */}
                    <div className="absolute left-0 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-8 text-xl">♩</div>
                      <div className="absolute left-12 top-4 text-xl">♩</div>
                      <div className="absolute left-20 top-6 text-xl">♩</div>
                      <div className="absolute left-28 top-2 text-xl">♩</div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">1</div>
                    </div>

                    {/* Measure 2 */}
                    <div className="absolute left-32 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-6 text-xl">𝅗𝅥</div>
                      <div className="absolute left-20 top-4 text-xl">𝅗𝅥</div>
                      <div className="absolute left-4 top-20 text-sm font-bold italic">mf</div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">2</div>
                    </div>

                    {/* Measure 3 */}
                    <div className="absolute left-64 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-2 top-5 text-lg">♪</div>
                      <div className="absolute left-6 top-7 text-lg">♪</div>
                      <div className="absolute left-10 top-5 text-lg">♪</div>
                      <div className="absolute left-14 top-3 text-lg">♪</div>
                      <div className="absolute left-2 top-4 w-12 h-px bg-black"></div>
                      <div className="absolute left-20 top-6 text-lg">𝄽</div>
                      <div className="absolute left-3 top-12 w-1 h-1 bg-black rounded-full"></div>
                      <div className="absolute left-7 top-14 w-1 h-1 bg-black rounded-full"></div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">3</div>
                    </div>

                    {/* Measure 4 */}
                    <div className="absolute left-96 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-8 top-6 text-2xl">𝅝</div>
                      <div className="absolute left-10 top-1 text-lg">𝄐</div>
                      <div className="absolute left-4 top-18 text-xs italic">cresc.</div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">4</div>
                    </div>
                  </div>
                </div>

                {/* Bass Clef Staff */}
                <div className="relative h-24">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="absolute w-full h-px bg-black" style={{ top: `${16 + line * 16}px` }} />
                  ))}

                  <div className="absolute left-4 top-1 text-4xl font-bold">𝄢</div>

                  <div className="absolute left-20 top-3 text-xl font-bold">
                    <div>4</div>
                    <div>4</div>
                  </div>

                  <div className="absolute left-32 top-0 w-full h-full">
                    <div className="absolute left-0 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-12 text-xl">♩</div>
                      <div className="absolute left-12 top-14 text-xl">♩</div>
                      <div className="absolute left-20 top-12 text-xl">♩</div>
                      <div className="absolute left-28 top-10 text-xl">♩</div>
                    </div>

                    <div className="absolute left-32 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-10 text-xl">𝅗𝅥</div>
                      <div className="absolute left-20 top-12 text-xl">𝅗𝅥</div>
                    </div>

                    <div className="absolute left-64 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-11 text-lg">♪</div>
                      <div className="absolute left-8 top-13 text-lg">♪</div>
                      <div className="absolute left-12 top-11 text-lg">♪</div>
                      <div className="absolute left-16 top-9 text-lg">♪</div>
                      <div className="absolute left-4 top-10 w-12 h-px bg-black"></div>
                      <div className="absolute left-24 top-11 text-lg">𝄽</div>
                    </div>

                    <div className="absolute left-96 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-8 top-10 text-2xl">𝅝</div>
                      <div className="absolute left-10 top-5 text-lg">𝄐</div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-0 h-48 w-2 flex items-center">
                  <div className="text-6xl">⎨</div>
                </div>
              </div>

              {/* System 2 */}
              <div className="relative">
                <div className="relative h-24 mb-4">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="absolute w-full h-px bg-black" style={{ top: `${16 + line * 16}px` }} />
                  ))}

                  <div className="absolute left-4 top-2 text-4xl font-bold">𝄞</div>

                  <div className="absolute left-16 top-0 w-full h-full">
                    <div className="absolute left-0 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-2 top-4 text-sm">𝅘𝅥𝅯</div>
                      <div className="absolute left-5 top-6 text-sm">𝅘𝅥𝅯</div>
                      <div className="absolute left-8 top-4 text-sm">𝅘𝅥𝅯</div>
                      <div className="absolute left-11 top-2 text-sm">𝅘𝅥𝅯</div>
                      <div className="absolute left-2 top-3 w-9 h-px bg-black"></div>
                      <div className="absolute left-2 top-2 w-9 h-px bg-black"></div>
                      <div className="absolute left-3 top-1 text-xs">&gt;</div>
                      <div className="absolute left-9 top-1 text-xs">&gt;</div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">5</div>
                    </div>

                    <div className="absolute left-32 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-5 text-xl">♩</div>
                      <div className="absolute left-20 top-5 text-xl">♩</div>
                      <div className="absolute left-8 top-4 w-8 h-2 border-t-2 border-black rounded-t-full"></div>
                      <div className="absolute left-4 top-2 w-20 h-3 border-t-2 border-black rounded-t-full"></div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">6</div>
                    </div>

                    <div className="absolute left-64 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-6 text-lg">♪</div>
                      <div className="absolute left-10 top-4 text-lg">♪</div>
                      <div className="absolute left-16 top-6 text-lg">♪</div>
                      <div className="absolute left-4 top-1 w-12 h-px bg-black"></div>
                      <div className="absolute left-9 top-0 text-xs">3</div>
                      <div className="absolute left-4 top-18 text-sm font-bold italic">f</div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">7</div>
                    </div>

                    <div className="absolute left-96 top-0 w-32 h-full border-r-2 border-black">
                      <div className="absolute left-8 top-6 text-2xl">𝅝</div>
                      <div className="absolute left-10 top-1 text-lg">𝄐</div>
                      <div className="absolute left-4 top-18 text-sm font-bold italic">ff</div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">8</div>
                      <div className="absolute right-2 top-0 w-1 h-full bg-black"></div>
                      <div className="absolute right-0 top-0 w-1 h-full bg-black"></div>
                    </div>
                  </div>
                </div>

                <div className="relative h-24">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="absolute w-full h-px bg-black" style={{ top: `${16 + line * 16}px` }} />
                  ))}

                  <div className="absolute left-4 top-1 text-4xl font-bold">𝄢</div>

                  <div className="absolute left-16 top-0 w-full h-full">
                    <div className="absolute left-0 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-10 text-xl">♩</div>
                      <div className="absolute left-12 top-12 text-xl">♩</div>
                      <div className="absolute left-20 top-10 text-xl">♩</div>
                      <div className="absolute left-28 top-8 text-xl">♩</div>
                    </div>
                    <div className="absolute left-32 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-9 text-xl">𝅗𝅥</div>
                      <div className="absolute left-20 top-11 text-xl">𝅗𝅥</div>
                    </div>
                    <div className="absolute left-64 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-10 text-xl">♩</div>
                      <div className="absolute left-12 top-8 text-xl">♩</div>
                      <div className="absolute left-20 top-10 text-xl">♩</div>
                      <div className="absolute left-28 top-12 text-xl">♩</div>
                    </div>
                    <div className="absolute left-96 top-0 w-32 h-full border-r-2 border-black">
                      <div className="absolute left-8 top-10 text-2xl">𝅝</div>
                      <div className="absolute right-2 top-0 w-1 h-full bg-black"></div>
                      <div className="absolute right-0 top-0 w-1 h-full bg-black"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 top-0 h-48 w-2 flex items-center">
                  <div className="text-6xl">⎨</div>
                </div>
              </div>
            </div>

            {/* Read-only overlay */}
            <div className="absolute inset-0 pointer-events-none bg-transparent">
              {/* Subtle overlay to indicate read-only mode */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Panel */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm">partitura-principal.musicxml</span>
              </div>
              <div className="text-sm text-muted-foreground">
                45.2 KB • Última modificación hace 2 horas por María González
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descargar archivo
              </Button>
              <Button size="sm" variant="outline">
                <Music className="w-4 h-4 mr-2" />
                Ver historial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
