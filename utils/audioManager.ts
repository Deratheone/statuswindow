export type SoundType = "XP_GAIN" | "LEVEL_UP" | "QUEST_COMPLETE" | "ACTIVITY_LOG" | "UI_CLICK" | "NOTIFICATION"

export interface AudioSettings {
  isEnabled: boolean
  volume: number
  isMuted: boolean
  soundToggles: Record<SoundType, boolean>
}

class AudioManager {
  private static instance: AudioManager
  private audioContext: AudioContext | null = null
  private audioCache: Map<string, HTMLAudioElement> = new Map()
  private settings: AudioSettings

  private constructor() {
    this.settings = this.loadSettings()
    this.initializeAudioContext()
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }

  private loadSettings(): AudioSettings {
    try {
      const saved = localStorage.getItem("statuswindow-audio-settings")
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.warn("Failed to load audio settings:", error)
    }

    return {
      isEnabled: true,
      volume: 0.7,
      isMuted: false,
      soundToggles: {
        XP_GAIN: true,
        LEVEL_UP: true,
        QUEST_COMPLETE: true,
        ACTIVITY_LOG: true,
        UI_CLICK: true,
        NOTIFICATION: true,
      },
    }
  }

  private saveSettings(): void {
    try {
      localStorage.setItem("statuswindow-audio-settings", JSON.stringify(this.settings))
    } catch (error) {
      console.warn("Failed to save audio settings:", error)
    }
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn("Web Audio API not supported, falling back to HTML5 audio")
    }
  }

  public async loadAudio(url: string): Promise<HTMLAudioElement> {
    if (this.audioCache.has(url)) {
      return this.audioCache.get(url)!
    }

    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audio.preload = "auto"
      audio.volume = this.settings.volume

      audio.addEventListener("canplaythrough", () => {
        this.audioCache.set(url, audio)
        resolve(audio)
      })

      audio.addEventListener("error", () => {
        reject(new Error(`Failed to load audio: ${url}`))
      })

      audio.src = url
    })
  }

  public async playSound(soundType: SoundType, url?: string): Promise<void> {
    if (!this.settings.isEnabled || this.settings.isMuted || !this.settings.soundToggles[soundType]) {
      return
    }

    try {
      // Use existing sound files from the project
      const soundUrls: Record<SoundType, string> = {
        XP_GAIN: "/sfx/xp-gain.mp3",
        LEVEL_UP: "/sfx/level-up.mp3",
        QUEST_COMPLETE: "/sfx/stat-increase.mp3",
        ACTIVITY_LOG: "/sfx/xp-gain.mp3",
        UI_CLICK: "/sfx/stat-increase.mp3",
        NOTIFICATION: "/sfx/xp-gain.mp3",
      }

      const audioUrl = url || soundUrls[soundType]
      const audio = await this.loadAudio(audioUrl)

      audio.currentTime = 0
      audio.volume = this.settings.volume
      await audio.play()
    } catch (error) {
      console.warn(`Failed to play sound ${soundType}:`, error)
    }
  }

  public setVolume(volume: number): void {
    this.settings.volume = Math.max(0, Math.min(1, volume))
    this.saveSettings()

    // Update volume for cached audio elements
    this.audioCache.forEach((audio) => {
      audio.volume = this.settings.volume
    })
  }

  public toggleMute(): void {
    this.settings.isMuted = !this.settings.isMuted
    this.saveSettings()
  }

  public toggleSound(soundType: SoundType): void {
    this.settings.soundToggles[soundType] = !this.settings.soundToggles[soundType]
    this.saveSettings()
  }

  public setEnabled(enabled: boolean): void {
    this.settings.isEnabled = enabled
    this.saveSettings()
  }

  public getSettings(): AudioSettings {
    return { ...this.settings }
  }
}

export const audioManager = AudioManager.getInstance()
