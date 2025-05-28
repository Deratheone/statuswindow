/**
 * Audio Integration Utility
 *
 * This file provides helper functions to integrate audio into existing components
 * without modifying their core functionality.
 */

import { useAudio } from "@/contexts/AudioContext"

/**
 * Hook to add audio to activity form submissions
 */
export function useActivityFormAudio() {
  const { playSound } = useAudio()

  return {
    playActivityLogSound: () => {
      playSound("ACTIVITY_LOG").catch(() => {})
    },
  }
}

/**
 * Hook to add audio to celebration effects
 */
export function useCelebrationAudio() {
  const { playSound } = useAudio()

  return {
    playXpGainSound: () => {
      playSound("XP_GAIN").catch(() => {})
    },
  }
}

/**
 * Hook to add audio to status window
 */
export function useStatusWindowAudio() {
  const { playSound } = useAudio()

  return {
    playLevelUpSound: () => {
      playSound("LEVEL_UP").catch(() => {})
    },
  }
}

/**
 * Hook to add audio to quest completion
 */
export function useQuestAudio() {
  const { playSound } = useAudio()

  return {
    playQuestCompleteSound: () => {
      playSound("QUEST_COMPLETE").catch(() => {})
    },
  }
}

/**
 * Hook to add audio to UI interactions
 */
export function useUiAudio() {
  const { playSound } = useAudio()

  return {
    playClickSound: () => {
      playSound("UI_CLICK").catch(() => {})
    },
  }
}

/**
 * Hook to add audio to notifications
 */
export function useNotificationAudio() {
  const { playSound } = useAudio()

  return {
    playNotificationSound: () => {
      playSound("NOTIFICATION").catch(() => {})
    },
  }
}
