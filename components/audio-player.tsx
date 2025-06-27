"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  className?: string
  src?: string
}

export function AudioPlayer({ className = "", src = "" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src || "/placeholder.mp3")
    audioRef.current = audio

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const setAudioEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", setAudioEnded)

    // Set initial volume
    audio.volume = volume / 100

    return () => {
      audio.pause()
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", setAudioEnded)
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
    }
    if (value[0] === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100
      } else {
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }
    return "0:00"
  }

  return (
    <div className={`bg-muted/30 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={togglePlay} className="h-8 w-8 p-0">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs w-8 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="flex-1"
          />
          <span className="text-xs w-8">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>

      <div className="mt-2">
        <div className="w-full h-12 bg-muted/50 rounded-md flex items-center justify-center">
          <div className="flex gap-1">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary/60"
                style={{
                  height: `${4 + Math.sin(i * 0.5) * 8 + Math.random() * 6}px`,
                  opacity: currentTime > 0 && isPlaying ? 1 : 0.3,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
