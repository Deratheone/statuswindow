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
  const [animationTriggered, setAnimationTriggered] = useState(false)
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const [showHolographicBox, setShowHolographicBox] = useState(false)
  const [showElectricPulse, setShowElectricPulse] = useState(false)
  const [showGlitchOverlay, setShowGlitchOverlay] = useState(false)
  const [showSkillResult, setShowSkillResult] = useState(false)

  // Reset component when unlockedSkill changes to null
  useEffect(() => {
    if (unlockedSkill === null && animationTriggered) {
      setAnimationTriggered(false)
      setShowHolographicBox(false)
      setShowElectricPulse(false)
      setShowGlitchOverlay(false)
      setShowSkillResult(false)
    }
  }, [unlockedSkill, animationTriggered])

  // Show skill result when unlockedSkill is provided
  useEffect(() => {
    if (unlockedSkill && !showSkillResult && animationTriggered) {
      setShowSkillResult(true)
    }
  }, [unlockedSkill, showSkillResult, animationTriggered])

  // Generate particles in 3D spherical distribution
  const generateParticles = () => {
    if (!orbContainerRef.current) return

    // Clear existing particles
    orbContainerRef.current.innerHTML = ""

    // Reduce particle count for mobile devices
    const totalParticles = isMobile ? 190 : 200
    const radius = isMobile ? 80 : 100

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement("div")
      particle.className = styles.particle

      // Spherical coordinates with tighter distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.85 + Math.random() * 0.15)

      // Convert to Cartesian coordinates
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      // Use staggered delays to prevent GPU overload
      const delay = i * (isMobile ? 0.01 : 0.005)

      particle.style.setProperty("--x", `${x}px`)
      particle.style.setProperty("--y", `${y}px`)
      particle.style.setProperty("--z", `${z}px`)
      particle.style.setProperty("--delay", `${delay}s`)

      orbContainerRef.current.appendChild(particle)
    }
  }

  // Generate particles after component mounts
  useEffect(() => {
    const timer = setTimeout(generateParticles, 100)
    return () => clearTimeout(timer)
  }, [])

  // Prevent scrolling on mobile when animation is active
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (animationTriggered) {
        e.preventDefault()
      }
    }

    document.body.addEventListener("touchmove", preventScroll, { passive: false })
    return () => {
      document.body.removeEventListener("touchmove", preventScroll)
    }
  }, [animationTriggered])

  const handleActivate = () => {
    if (disabled || animationTriggered) return

    setAnimationTriggered(true)
    if (onActivate) onActivate()

    // Activate orb animation
    // After orb animation completes (4s)
    setTimeout(() => {
      // Show electric pulse
      setShowElectricPulse(true)

      // Start holographic box expansion
      setShowHolographicBox(true)

      // Trigger glitch effect when box is fully visible
      setTimeout(() => {
        setShowGlitchOverlay(true)

        // Hide glitch after animation
        setTimeout(() => {
          setShowGlitchOverlay(false)
          if (onComplete) onComplete()
        }, 500)
      }, 800) // Match box expansion time
    }, 4000) // Reduced orb animation duration to 4s
  }

  const handleContinue = () => {
    setShowSkillResult(false)
    setAnimationTriggered(false)
    setShowHolographicBox(false)
    setShowElectricPulse(false)

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

  return (
    <div className={styles.centerContainer}>
      {!animationTriggered && (
        <button className={styles.startButton} onClick={handleActivate} disabled={disabled}>
          Activate The Skill Orb
        </button>
      )}

      <div
        ref={orbContainerRef}
        className={`${styles.orbContainer} ${animationTriggered ? styles.active : ""}`}
        style={{ display: animationTriggered && showElectricPulse ? "none" : "block" }}
      ></div>

      <div className={`${styles.electricPulse} ${showElectricPulse ? styles.active : ""}`}></div>

      {showGlitchOverlay && <div className={styles.glitchOverlay}></div>}

      <div className={`${styles.holographicBox} ${showHolographicBox ? styles.active : ""}`}>
        <div className={styles.holographicText}>SKILL UNLOCKED</div>
      </div>

      {showSkillResult && unlockedSkill && (
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
            <button
              className={styles.continueButton}
              onClick={handleContinue}
              style={{
                borderColor: getRarityColor(unlockedSkill.rarity),
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
