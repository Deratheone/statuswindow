"use client"
import { simpleAudio, type SoundType } from "@/utils/simple-audio"

export function useSimpleAudio() {
  const playXPGain = () => simpleAudio.playSound("xp-gain")
  const playLevelUp = () => simpleAudio.playSound("level-up")
  const playStatIncrease = () => simpleAudio.playSound("stat-increase")

  return {
    playXPGain,
    playLevelUp,
    playStatIncrease,
    playSound: (soundType: SoundType) => simpleAudio.playSound(soundType),
  }
}
