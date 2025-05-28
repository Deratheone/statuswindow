"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { audioManager, type SoundType, type AudioSettings } from "@/utils/audioManager"

interface AudioContextType {
  settings: AudioSettings
  playSound: (soundType: SoundType) => Promise<void>
  setVolume: (volume: number) => void
  toggleMute: () => void
  toggleSound: (soundType: SoundType) => void
  setEnabled: (enabled: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

interface AudioProviderProps {
  children: ReactNode
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [settings, setSettings] = useState<AudioSettings>(audioManager.getSettings())

  useEffect(() => {
    // Update local state when settings change
    const updateSettings = () => {
      setSettings(audioManager.getSettings())
    }

    // Listen for settings changes (if needed)
    updateSettings()
  }, [])

  const playSound = async (soundType: SoundType): Promise<void> => {
    try {
      await audioManager.playSound(soundType)
    } catch (error) {
      console.warn("Failed to play sound:", error)
    }
  }

  const setVolume = (volume: number): void => {
    audioManager.setVolume(volume)
    setSettings(audioManager.getSettings())
  }

  const toggleMute = (): void => {
    audioManager.toggleMute()
    setSettings(audioManager.getSettings())
  }

  const toggleSound = (soundType: SoundType): void => {
    audioManager.toggleSound(soundType)
    setSettings(audioManager.getSettings())
  }

  const setEnabled = (enabled: boolean): void => {
    audioManager.setEnabled(enabled)
    setSettings(audioManager.getSettings())
  }

  const value: AudioContextType = {
    settings,
    playSound,
    setVolume,
    toggleMute,
    toggleSound,
    setEnabled,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio(): AudioContextType {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
