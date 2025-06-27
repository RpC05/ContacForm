"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Upload,
  Download,
  Play,
  Pause,
  Save,
  FileText,
  Music,
  Camera,
  Wand2,
  Volume2,
  SkipBack,
  SkipForward,
  Type,
  MousePointer,
  Users,
  Edit3,
  BarChart3,
  CloverIcon as Clef,
} from "lucide-react"

export function SheetMusicEditor() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showOCRDemo, setShowOCRDemo] = useState(false)
  const [selectedTool, setSelectedTool] = useState("select")
  const [zoom, setZoom] = useState([100])
  const [selectedInstrument, setSelectedInstrument] = useState("piano")
  const [tempo, setTempo] = useState([120])
  const [volume, setVolume] = useState([80])
  const [autoSave, setAutoSave] = useState(true)

  const handleOCRUpload = () => {
    setShowOCRDemo(true)
    setTimeout(() => {
      setShowOCRDemo(false)
    }, 3000)
  }

  const tools = [
    { id: "select", label: "Seleccionar", icon: MousePointer },
    { id: "notes", label: "Notas", icon: Music },
    { id: "rests", label: "Silencios", icon: Pause },
    { id: "text", label: "Texto", icon: Type },
    { id: "dynamics", label: "Dinámicas", icon: Volume2 },
    { id: "articulations", label: "Articulaciones", icon: Edit3 },
    { id: "measures", label: "Compases", icon: BarChart3 },
    { id: "clefs", label: "Claves", icon: Clef },
  ]

  const noteFigures = [
    { symbol: "𝅝", name: "Redonda", duration: "4" },
    { symbol: "𝅗𝅥", name: "Blanca", duration: "2" },
    { symbol: "♩", name: "Negra", duration: "1" },
    { symbol: "♪", name: "Corchea", duration: "1/2" },
    { symbol: "𝅘𝅥𝅯", name: "Semicorchea", duration: "1/4" },
    { symbol: "𝅘𝅥𝅰", name: "Fusa", duration: "1/8" },
  ]

  const accidentals = [
    { symbol: "♭", name: "Bemol" },
    { symbol: "♮", name: "Becuadro" },
    { symbol: "♯", name: "Sostenido" },
  ]

  return (
    <div className="w-full space-y-4">
      {/* Header del Editor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Editor Profesional de Partituras</h3>
          {autoSave && (
            <Badge variant="secondary" className="text-xs">
              Guardado automático
            </Badge>
          )}
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <Users className="w-3 h-3" />2 colaboradores en línea
          </Badge>
        </div>
        <Button size="sm">
          <Save className="w-4 h-4 mr-2" />
          Guardar
        </Button>
      </div>

      {/* Herramientas - Ahora responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Herramientas principales */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Herramientas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool(tool.id)}
                  className="flex flex-col items-center gap-1 h-auto py-2"
                >
                  <tool.icon className="w-4 h-4" />
                  <span className="text-xs">{tool.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Figuras y alteraciones */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Figuras y Alteraciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Figuras musicales */}
            <div>
              <h4 className="text-xs font-medium mb-2">Figuras:</h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {noteFigures.map((figure, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2"
                    title={`${figure.name} (${figure.duration})`}
                  >
                    <span className="text-lg">{figure.symbol}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Alteraciones */}
            <div>
              <h4 className="text-xs font-medium mb-2">Alteraciones:</h4>
              <div className="grid grid-cols-3 gap-2">
                {accidentals.map((accidental, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center gap-1 h-auto py-2"
                    title={accidental.name}
                  >
                    <span className="text-lg">{accidental.symbol}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Área de la partitura */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-muted-foreground/20 rounded-lg min-h-[400px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Área de Composición</p>
              <p className="text-sm">Selecciona una herramienta y comienza a componer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles adicionales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4/4</div>
              <div className="text-xs text-muted-foreground">Compás</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">C</div>
              <div className="text-xs text-muted-foreground">Tonalidad</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">120</div>
              <div className="text-xs text-muted-foreground">BPM</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">32</div>
              <div className="text-xs text-muted-foreground">Compases</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sheet Music Canvas */}
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
            </div>

            {/* Musical Score */}
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

                  {/* Key Signature (C Major - no sharps/flats) */}
                  <div className="absolute left-16 top-4 text-2xl">{/* C Major has no key signature */}</div>

                  {/* Time Signature */}
                  <div className="absolute left-20 top-3 text-xl font-bold">
                    <div>4</div>
                    <div>4</div>
                  </div>

                  {/* Measures with Notes */}
                  <div className="absolute left-32 top-0 w-full h-full">
                    {/* Measure 1 */}
                    <div className="absolute left-0 top-0 w-32 h-full border-r border-black">
                      {/* Notes: C-E-G-C (C major chord) */}
                      <div className="absolute left-4 top-8 text-xl">♩</div>
                      <div className="absolute left-12 top-4 text-xl">♩</div>
                      <div className="absolute left-20 top-6 text-xl">♩</div>
                      <div className="absolute left-28 top-2 text-xl">♩</div>
                      {/* Measure number */}
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">1</div>
                    </div>

                    {/* Measure 2 */}
                    <div className="absolute left-32 top-0 w-32 h-full border-r border-black">
                      {/* Half notes */}
                      <div className="absolute left-4 top-6 text-xl">𝅗𝅥</div>
                      <div className="absolute left-20 top-4 text-xl">𝅗𝅥</div>
                      {/* Dynamic marking */}
                      <div className="absolute left-4 top-20 text-sm font-bold italic">mf</div>
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">2</div>
                    </div>

                    {/* Measure 3 */}
                    <div className="absolute left-64 top-0 w-32 h-full border-r border-black">
                      {/* Eighth notes with beam */}
                      <div className="absolute left-2 top-5 text-lg">♪</div>
                      <div className="absolute left-6 top-7 text-lg">♪</div>
                      <div className="absolute left-10 top-5 text-lg">♪</div>
                      <div className="absolute left-14 top-3 text-lg">♪</div>
                      {/* Beam line */}
                      <div className="absolute left-2 top-4 w-12 h-px bg-black"></div>
                      {/* Quarter rest */}
                      <div className="absolute left-20 top-6 text-lg">𝄽</div>
                      {/* Staccato dots */}
                      <div className="absolute left-3 top-12 w-1 h-1 bg-black rounded-full"></div>
                      <div className="absolute left-7 top-14 w-1 h-1 bg-black rounded-full"></div>
                      {/* Measure number */}
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">3</div>
                    </div>

                    {/* Measure 4 */}
                    <div className="absolute left-96 top-0 w-32 h-full border-r border-black">
                      {/* Whole note */}
                      <div className="absolute left-8 top-6 text-2xl">𝅝</div>
                      {/* Fermata */}
                      <div className="absolute left-10 top-1 text-lg">𝄐</div>
                      {/* Crescendo */}
                      <div className="absolute left-4 top-18 text-xs italic">cresc.</div>
                      {/* Measure number */}
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">4</div>
                    </div>
                  </div>
                </div>

                {/* Bass Clef Staff */}
                <div className="relative h-24">
                  {/* Staff Lines */}
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="absolute w-full h-px bg-black" style={{ top: `${16 + line * 16}px` }} />
                  ))}

                  {/* Bass Clef */}
                  <div className="absolute left-4 top-1 text-4xl font-bold">𝄢</div>

                  {/* Time Signature */}
                  <div className="absolute left-20 top-3 text-xl font-bold">
                    <div>4</div>
                    <div>4</div>
                  </div>

                  {/* Bass Notes */}
                  <div className="absolute left-32 top-0 w-full h-full">
                    {/* Measure 1 - Bass line */}
                    <div className="absolute left-0 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-12 text-xl">♩</div>
                      <div className="absolute left-12 top-14 text-xl">♩</div>
                      <div className="absolute left-20 top-12 text-xl">♩</div>
                      <div className="absolute left-28 top-10 text-xl">♩</div>
                    </div>

                    {/* Measure 2 */}
                    <div className="absolute left-32 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-10 text-xl">𝅗𝅥</div>
                      <div className="absolute left-20 top-12 text-xl">𝅗𝅥</div>
                    </div>

                    {/* Measure 3 */}
                    <div className="absolute left-64 top-0 w-32 h-full border-r border-black">
                      <div className="absolute left-4 top-11 text-lg">♪</div>
                      <div className="absolute left-8 top-13 text-lg">♪</div>
                      <div className="absolute left-12 top-11 text-lg">♪</div>
                      <div className="absolute left-16 top-9 text-lg">♪</div>
                      <div className="absolute left-4 top-10 w-12 h-px bg-black"></div>
                      <div className="absolute left-24 top-11 text-lg">𝄽</div>
                    </div>

                    {/* Measure 4 */}
                    <div className="absolute left-96 top-0 w-32 h-full border-r-2 border-black">
                      <div className="absolute left-8 top-10 text-2xl">𝅝</div>
                      <div className="absolute left-10 top-5 text-lg">𝄐</div>
                    </div>
                  </div>
                </div>

                {/* System Brace */}
                <div className="absolute left-0 top-0 h-48 w-2 flex items-center">
                  <div className="text-6xl">⎨</div>
                </div>
              </div>

              {/* System 2 */}
              <div className="relative">
                {/* Similar structure for second system */}
                <div className="relative h-24 mb-4">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="absolute w-full h-px bg-black" style={{ top: `${16 + line * 16}px` }} />
                  ))}

                  <div className="absolute left-4 top-2 text-4xl font-bold">𝄞</div>

                  <div className="absolute left-16 top-0 w-full h-full">
                    {/* Measures 5-8 with more complex notation */}
                    <div className="absolute left-0 top-0 w-32 h-full border-r border-black">
                      {/* Sixteenth notes */}
                      <div className="absolute left-2 top-4 text-sm">𝅘𝅥𝅯</div>
                      <div className="absolute left-5 top-6 text-sm">𝅘𝅥𝅯</div>
                      <div className="absolute left-8 top-4 text-sm">𝅘𝅥𝅯</div>
                      <div className="absolute left-11 top-2 text-sm">𝅘𝅥𝅯</div>
                      {/* Beam */}
                      <div className="absolute left-2 top-3 w-9 h-px bg-black"></div>
                      <div className="absolute left-2 top-2 w-9 h-px bg-black"></div>
                      {/* Accent marks */}
                      <div className="absolute left-3 top-1 text-xs">&gt;</div>
                      <div className="absolute left-9 top-1 text-xs">&gt;</div>
                      {/* Measure number */}
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">5</div>
                    </div>

                    <div className="absolute left-32 top-0 w-32 h-full border-r border-black">
                      {/* Tied notes */}
                      <div className="absolute left-4 top-5 text-xl">♩</div>
                      <div className="absolute left-20 top-5 text-xl">♩</div>
                      {/* Tie */}
                      <div className="absolute left-8 top-4 w-8 h-2 border-t-2 border-black rounded-t-full"></div>
                      {/* Slur */}
                      <div className="absolute left-4 top-2 w-20 h-3 border-t-2 border-black rounded-t-full"></div>
                      {/* Measure number */}
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">6</div>
                    </div>

                    <div className="absolute left-64 top-0 w-32 h-full border-r border-black">
                      {/* Triplet */}
                      <div className="absolute left-4 top-6 text-lg">♪</div>
                      <div className="absolute left-10 top-4 text-lg">♪</div>
                      <div className="absolute left-16 top-6 text-lg">♪</div>
                      {/* Triplet bracket */}
                      <div className="absolute left-4 top-1 w-12 h-px bg-black"></div>
                      <div className="absolute left-9 top-0 text-xs">3</div>
                      {/* Forte marking */}
                      <div className="absolute left-4 top-18 text-sm font-bold italic">f</div>
                      {/* Measure number */}
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">7</div>
                    </div>

                    <div className="absolute left-96 top-0 w-32 h-full border-r-2 border-black">
                      {/* Final measure with double bar */}
                      <div className="absolute left-8 top-6 text-2xl">𝅝</div>
                      <div className="absolute left-10 top-1 text-lg">𝄐</div>
                      {/* Fortissimo */}
                      <div className="absolute left-4 top-18 text-sm font-bold italic">ff</div>
                      {/* Measure number */}
                      <div className="absolute -top-6 left-2 text-xs text-gray-600">8</div>
                      {/* Double bar line */}
                      <div className="absolute right-2 top-0 w-1 h-full bg-black"></div>
                      <div className="absolute right-0 top-0 w-1 h-full bg-black"></div>
                    </div>
                  </div>
                </div>

                {/* Bass clef for system 2 */}
                <div className="relative h-24">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="absolute w-full h-px bg-black" style={{ top: `${16 + line * 16}px` }} />
                  ))}

                  <div className="absolute left-4 top-1 text-4xl font-bold">𝄢</div>

                  {/* Corresponding bass notes for measures 5-8 */}
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
          </div>
        </CardContent>
      </Card>

      {/* Bottom Toolbar */}
      <Card>
        <CardContent className="pt-4">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="properties">Propiedades</TabsTrigger>
              <TabsTrigger value="import-export">Importar/Exportar</TabsTrigger>
              <TabsTrigger value="collaboration">Colaboración</TabsTrigger>
              <TabsTrigger value="playback">Reproducción</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tonalidad</label>
                  <Select defaultValue="c-major">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c-major">Do Mayor</SelectItem>
                      <SelectItem value="g-major">Sol Mayor</SelectItem>
                      <SelectItem value="d-major">Re Mayor</SelectItem>
                      <SelectItem value="a-minor">La menor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compás</label>
                  <Select defaultValue="4/4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4/4">4/4</SelectItem>
                      <SelectItem value="3/4">3/4</SelectItem>
                      <SelectItem value="2/4">2/4</SelectItem>
                      <SelectItem value="6/8">6/8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tempo</label>
                  <div className="flex items-center gap-2">
                    <Slider value={tempo} onValueChange={setTempo} max={200} min={60} step={1} className="flex-1" />
                    <span className="w-12 text-sm">{tempo[0]} BPM</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Volumen</label>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <Slider value={volume} onValueChange={setVolume} max={100} min={0} step={1} className="flex-1" />
                    <span className="w-8 text-sm">{volume[0]}%</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="import-export" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Importar</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={handleOCRUpload}>
                      <Camera className="w-4 h-4 mr-2" />
                      OCR Musical (Imagen)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      MusicXML
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Music className="w-4 h-4 mr-2" />
                      MIDI
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      MuseScore
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Exportar</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      MusicXML
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Music className="w-4 h-4 mr-2" />
                      MIDI
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Audio (MP3)
                    </Button>
                  </div>
                </div>
              </div>

              {showOCRDemo && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wand2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Procesando imagen con OCR Musical...</span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Reconociendo notas, compases, dinámicas y articulaciones...
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="collaboration" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Colaboradores Activos</h3>
                  <Button size="sm">Invitar</Button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    MG
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">María González</div>
                    <div className="text-xs text-muted-foreground">Editando compás 3-4</div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    CR
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Carlos Ruiz</div>
                    <div className="text-xs text-muted-foreground">Revisando dinámicas</div>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="playback" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Configuración de Reproducción</h3>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instrumento de reproducción</label>
                    <Select defaultValue="acoustic-piano">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acoustic-piano">Piano Acústico</SelectItem>
                        <SelectItem value="electric-piano">Piano Eléctrico</SelectItem>
                        <SelectItem value="harpsichord">Clavecín</SelectItem>
                        <SelectItem value="organ">Órgano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Metrónomo</label>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <span className="text-sm">Activado</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Progreso de reproducción</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">0:00</span>
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div className="w-1/4 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm">3:45</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
