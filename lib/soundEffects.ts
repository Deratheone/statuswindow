import type { SoundEffectType } from "@/utils/audioManager"

// Sound effect definitions with data URLs for initial implementation
// These can be replaced with actual audio file URLs later

// Sound effect mapping
interface SoundEffect {
  id: SoundEffectType
  name: string
  description: string
  url: string
}

// Collection of sound effects
export const soundEffects: SoundEffect[] = [
  {
    id: "XP_GAIN",
    name: "XP Gain",
    description: "Plays when you gain experience points",
    url: "/sfx/xp-gain.mp3",
  },
  {
    id: "LEVEL_UP",
    name: "Level Up",
    description: "Plays when you level up",
    url: "/sfx/level-up.mp3",
  },
  {
    id: "QUEST_COMPLETE",
    name: "Quest Complete",
    description: "Plays when you complete a quest",
    url: "/sfx/stat-increase.mp3", // Reusing existing sound for now
  },
  {
    id: "ACTIVITY_LOG",
    name: "Activity Log",
    description: "Plays when you log an activity",
    url: "/sfx/xp-gain.mp3", // Reusing existing sound for now
  },
  {
    id: "UI_CLICK",
    name: "UI Click",
    description: "Plays when you click UI elements",
    url: "/sfx/stat-increase.mp3", // Reusing existing sound for now
  },
  {
    id: "NOTIFICATION",
    name: "Notification",
    description: "Plays when you receive a notification",
    url: "/sfx/level-up.mp3", // Reusing existing sound for now
  },
]

// Map of sound effect IDs to URLs for easy lookup
export const soundEffectUrls: Record<SoundEffectType, string> = soundEffects.reduce(
  (acc, sound) => ({
    ...acc,
    [sound.id]: sound.url,
  }),
  {} as Record<SoundEffectType, string>,
)

export default soundEffects
