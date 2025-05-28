"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Play } from "lucide-react"
import { simpleAudio, type SoundType } from "@/utils/simple-audio"

export function SimpleAudioSettings() {
  const [volume, setVolume] = useState(0.7)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    setVolume(simpleAudio.getVolume())
    setEnabled(simpleAudio.isEnabled())
  }, [])

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    simpleAudio.setVolume(newVolume)
  }

  const handleToggleEnabled = () => {
    const newEnabled = !enabled
    setEnabled(newEnabled)
    simpleAudio.setEnabled(newEnabled)
  }

  const handleTestSound = async (soundType: SoundType) => {
    await simpleAudio.playSound(soundType)
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        {enabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        Audio Settings
      </h3>

      {/* Enable/Disable Audio */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-white font-medium">Enable Audio</span>
        <Button variant={enabled ? "default" : "outline"} onClick={handleToggleEnabled} className="min-w-[80px]">
          {enabled ? "On" : "Off"}
        </Button>
      </div>

      {/* Volume Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">Volume</span>
          <span className="text-white text-sm">{Math.round(volume * 100)}%</span>
        </div>
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={1}
          min={0}
          step={0.1}
          disabled={!enabled}
          className="w-full"
        />
      </div>

      {/* Sound Tests */}
      <div>
        <h4 className="text-white font-medium mb-4">Test Sounds</h4>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between">
            <span className="text-white">XP Gain</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleTestSound("xp-gain")}
              disabled={!enabled}
              className="flex items-center gap-2"
            >
              <Play size={16} />
              Test
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white">Level Up</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleTestSound("level-up")}
              disabled={!enabled}
              className="flex items-center gap-2"
            >
              <Play size={16} />
              Test
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white">Stat Increase</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleTestSound("stat-increase")}
              disabled={!enabled}
              className="flex items-center gap-2"
            >
              <Play size={16} />
              Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
