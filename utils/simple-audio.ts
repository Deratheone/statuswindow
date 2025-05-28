// Simple audio utility that doesn't depend on any other modules
export type SoundType = "xp-gain" | "level-up" | "stat-increase"

class SimpleAudio {
  private static instance: SimpleAudio
  private audioCache: Map<string, HTMLAudioElement> = new Map()
  private volume = 0.7
  private enabled = true

  private constructor() {
    this.loadSettings()
  }

  public static getInstance(): SimpleAudio {
    if (!SimpleAudio.instance) {
      SimpleAudio.instance = new SimpleAudio()
    }
    return SimpleAudio.instance
  }

  private loadSettings(): void {
    try {
      const settings = localStorage.getItem("statuswindow-simple-audio")
      if (settings) {
        const parsed = JSON.parse(settings)
        this.volume = parsed.volume || 0.7
        this.enabled = parsed.enabled !== false
      }
    } catch (error) {
      // Ignore errors, use defaults
    }
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(
        "statuswindow-simple-audio",
        JSON.stringify({
          volume: this.volume,
          enabled: this.enabled,
        }),
      )
    } catch (error) {
      // Ignore errors
    }
  }

  public async playSound(soundType: SoundType): Promise<void> {
    if (!this.enabled) return

    try {
      const soundUrls: Record<SoundType, string> = {
        "xp-gain": "/sfx/xp-gain.mp3",
        "level-up": "/sfx/level-up.mp3",
        "stat-increase": "/sfx/stat-increase.mp3",
      }

      const url = soundUrls[soundType]
      if (!url) return

      let audio = this.audioCache.get(url)
      if (!audio) {
        audio = new Audio(url)
        audio.volume = this.volume
        this.audioCache.set(url, audio)
      }

      audio.currentTime = 0
      audio.volume = this.volume
      await audio.play()
    } catch (error) {
      // Ignore audio errors
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume))
    this.saveSettings()

    // Update cached audio volumes
    this.audioCache.forEach((audio) => {
      audio.volume = this.volume
    })
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled
    this.saveSettings()
  }

  public getVolume(): number {
    return this.volume
  }

  public isEnabled(): boolean {
    return this.enabled
  }
}

export const simpleAudio = SimpleAudio.getInstance()
