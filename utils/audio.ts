// Audio utility for playing sound effects
export function playSFX(filename: string) {
  try {
    const audio = new Audio(`/sfx/${filename}.mp3`)
    audio.volume = 0.5 // Set volume to 50%
    return audio.play()
  } catch (error) {
    console.error("Error playing sound effect:", error)
  }
}

// Preload audio files
export function preloadAudio(filenames: string[]) {
  filenames.forEach((filename) => {
    const audio = new Audio(`/sfx/${filename}.mp3`)
    audio.preload = "auto"
  })
}
