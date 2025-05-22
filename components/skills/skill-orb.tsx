"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./skill-orb.module.css"

interface SkillOrbProps {
  onActivate?: () => void
  onComplete?: () => void
  disabled?: boolean
  isMobile?: boolean
  unlockedSkill?: {
    name: string
    rarity: string
    description: string
    type?: string
  } | null
  onReset?: () => void
}

export function SkillOrb({
  onActivate,
  onComplete,
  disabled = false,
  isMobile = false,
  unlockedSkill = null,
  onReset,
}: SkillOrbProps) {
  const [animationStage, setAnimationStage] = useState<
    "idle" | "orbAnimation" | "electricPulse" | "holographicBox" | "glitchEffect" | "skillResult"
  >("idle")
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const startButtonRef = useRef<HTMLButtonElement>(null)
  const electricPulseRef = useRef<HTMLDivElement>(null)
  const holographicBoxRef = useRef<HTMLDivElement>(null)
  const glitchOverlayRef = useRef<HTMLDivElement>(null)
  const skillResultRef = useRef<HTMLDivElement>(null)

  // Update the particle generation function to position particles better

  const generateParticles = () => {
    if (!orbContainerRef.current) return

    // Clear existing particles
    orbContainerRef.current.innerHTML = ""

    // Reduce particle count for mobile devices
    const totalParticles = isMobile ? 190 : 200
    const radius = isMobile ? 120 : 150 // Increased radius to spread particles wider
    const styleSheet = document.createElement("style")
    let styleRules = ""

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement("div")
      particle.className = styles.particle

      // Spherical coordinates with wider distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.7 + Math.random() * 0.3) // More varied radius

      // Convert to Cartesian coordinates
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      const animName = `p${i}`

      // Batch keyframes into a single style element for better performance
      styleRules += `
      @keyframes ${animName} {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0);
          background-color: hsla(190, 100%, 70%, 0);
          box-shadow: 0 0 5px hsla(190, 100%, 70%, 0);
        }
        10% {
          opacity: 1;
          transform: translate3d(${x}px, ${y}px, ${z}px);
          background-color: hsla(190, 100%, 70%, 0.9);
          box-shadow: 0 0 12px hsla(190, 100%, 70%, 0.9);
        }
        50% {
          background-color: hsla(30, 100%, 60%, 0.9);
          box-shadow: 0 0 15px hsla(30, 100%, 60%, 0.9);
        }
        85% {
          opacity: 1;
          transform: translate3d(${x}px, ${y}px, ${z}px);
        }
        100% {
          opacity: 0;
          transform: translate3d(${x * 0.5}px, ${y * 0.5}px, ${z * 0.5}px);
          background-color: hsla(30, 100%, 60%, 0);
          box-shadow: 0 0 5px hsla(30, 100%, 60%, 0);
        }
      }
    `

      // Use staggered delays to prevent GPU overload
      const delay = i * (isMobile ? 0.01 : 0.005)
      particle.style.animation = `${animName} 4s forwards linear ${delay}s`
      orbContainerRef.current.appendChild(particle)
    }

    // Append all keyframes at once
    styleSheet.textContent = styleRules
    document.head.appendChild(styleSheet)

    // Clean up the style element when component unmounts
    return () => {
      document.head.removeChild(styleSheet)
    }
  }

  // Generate particles after component mounts
  useEffect(() => {
    const cleanup = generateParticles()
    return cleanup
  }, [])

  // Prevent scrolling on mobile when animation is active
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (animationStage !== "idle") {
        e.preventDefault()
      }
    }

    document.body.addEventListener("touchmove", preventScroll, { passive: false })
    return () => {
      document.body.removeEventListener("touchmove", preventScroll)
    }
  }, [animationStage])

  // Reset animation when unlockedSkill is null
  useEffect(() => {
    if (unlockedSkill === null && animationStage !== "idle") {
      setAnimationStage("idle")
    }
  }, [unlockedSkill, animationStage])

  // Handle animation stages
  useEffect(() => {
    if (animationStage === "orbAnimation") {
      // Fade out button
      if (startButtonRef.current) {
        startButtonRef.current.classList.add(styles.fade)
      }

      // Activate orb
      if (orbContainerRef.current) {
        orbContainerRef.current.classList.add(styles.active)
      }

      // After orb animation completes (4s)
      const timer = setTimeout(() => {
        setAnimationStage("electricPulse")
      }, 4000)

      return () => clearTimeout(timer)
    } else if (animationStage === "electricPulse") {
      // Show electric pulse
      if (electricPulseRef.current) {
        electricPulseRef.current.classList.add(styles.active)
      }

      // Hide orb container after pulse
      if (orbContainerRef.current) {
        orbContainerRef.current.style.display = "none"
      }

      // Start holographic box expansion
      setAnimationStage("holographicBox")

      return () => {}
    } else if (animationStage === "holographicBox") {
      // Show holographic box
      if (holographicBoxRef.current) {
        holographicBoxRef.current.classList.add(styles.active)
      }

      // Trigger glitch effect when box is fully visible
      const timer = setTimeout(() => {
        setAnimationStage("glitchEffect")
      }, 800)

      return () => clearTimeout(timer)
    } else if (animationStage === "glitchEffect") {
      // Show glitch overlay
      if (glitchOverlayRef.current) {
        glitchOverlayRef.current.style.display = "block"
        requestAnimationFrame(() => {
          if (glitchOverlayRef.current) {
            glitchOverlayRef.current.style.opacity = "1"
          }
        })
      }

      // Hide glitch after animation
      const timer = setTimeout(() => {
        if (glitchOverlayRef.current) {
          glitchOverlayRef.current.style.display = "none"
        }

        // Call onComplete to unlock a random skill
        if (onComplete) {
          onComplete()
        }

        // Show skill result
        setAnimationStage("skillResult")
      }, 500)

      return () => clearTimeout(timer)
    } else if (animationStage === "skillResult" && unlockedSkill) {
      // Auto-reset after 1 second of showing the skill result
      const timer = setTimeout(() => {
        handleReset()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [animationStage, onComplete, unlockedSkill])

  const handleActivate = () => {
    if (disabled || animationStage !== "idle") return

    setAnimationStage("orbAnimation")
    if (onActivate) onActivate()
  }

  const handleReset = () => {
    // Reset all animation elements
    if (orbContainerRef.current) {
      orbContainerRef.current.classList.remove(styles.active)
      orbContainerRef.current.style.display = "block"
    }

    if (electricPulseRef.current) {
      electricPulseRef.current.classList.remove(styles.active)
    }

    if (holographicBoxRef.current) {
      holographicBoxRef.current.classList.remove(styles.active)
    }

    if (startButtonRef.current) {
      startButtonRef.current.classList.remove(styles.fade)
    }

    // Reset animation stage
    setAnimationStage("idle")

    // Call onReset callback
    if (onReset) {
      onReset()
    }
  }

  // Get color based on rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "#a0a0a0"
      case "uncommon":
        return "#1eff00"
      case "rare":
        return "#0070dd"
      case "epic":
        return "#a335ee"
      case "legendary":
        return "#ff8000"
      case "mythic":
        return "#e6cc80"
      default:
        return "#ffffff"
    }
  }

  // Also update the component structure to ensure proper layering
  return (
    <div className={styles.centerContainer}>
      <div ref={orbContainerRef} className={styles.orbContainer}></div>

      {animationStage === "idle" && (
        <button ref={startButtonRef} className={styles.startButton} onClick={handleActivate} disabled={disabled}>
          Activate The Skill Orb
        </button>
      )}

      <div ref={electricPulseRef} className={styles.electricPulse}></div>

      <div ref={glitchOverlayRef} className={styles.glitchOverlay}></div>

      <div ref={holographicBoxRef} className={styles.holographicBox}>
        <div className={styles.holographicText}>SKILL UNLOCKED</div>
      </div>

      {animationStage === "skillResult" && unlockedSkill && (
        <div className={styles.skillResultContainer}>
          <div
            className={styles.skillResultContent}
            style={{
              borderColor: getRarityColor(unlockedSkill.rarity),
              boxShadow: `0 0 30px ${getRarityColor(unlockedSkill.rarity)}, inset 0 0 15px rgba(255, 255, 255, 0.1)`,
            }}
          >
            <h2
              className={styles.skillName}
              style={{
                color: getRarityColor(unlockedSkill.rarity),
                textShadow: `0 0 10px ${getRarityColor(unlockedSkill.rarity)}`,
              }}
            >
              {unlockedSkill.name}
            </h2>
            <div
              className={styles.skillRarity}
              style={{
                color: getRarityColor(unlockedSkill.rarity),
              }}
            >
              {unlockedSkill.rarity}
            </div>
            <p className={styles.skillDescription}>{unlockedSkill.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
