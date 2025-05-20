"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import styles from "./skill-orb.module.css"

interface SkillOrbProps {
  onActivate?: () => void
  onComplete?: () => void
  disabled?: boolean
  isMobile?: boolean
  skillResult?: {
    name: string
    rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythic"
    description: string
  }
}

export function SkillOrb({ onActivate, onComplete, disabled = false, isMobile = false, skillResult }: SkillOrbProps) {
  const [animationTriggered, setAnimationTriggered] = useState(false)
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const [showHolographicBox, setShowHolographicBox] = useState(false)
  const [showElectricPulse, setShowElectricPulse] = useState(false)
  const [showGlitchOverlay, setShowGlitchOverlay] = useState(false)
  const [showSkillResult, setShowSkillResult] = useState(false)

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

          // Show skill result after a short delay
          setTimeout(() => {
            setShowSkillResult(true)
            if (onComplete) onComplete()
          }, 300)
        }, 500)
      }, 800) // Match box expansion time
    }, 4000) // Reduced orb animation duration to 4s
  }

  // Get color based on rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "#a0a0a0"
      case "Uncommon":
        return "#1eff00"
      case "Rare":
        return "#0070dd"
      case "Epic":
        return "#a335ee"
      case "Legendary":
        return "#ff8000"
      case "Mythic":
        return "#e6cc80"
      default:
        return "#ffffff"
    }
  }

  // Get glow intensity based on rarity
  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "0 0 5px"
      case "Uncommon":
        return "0 0 8px"
      case "Rare":
        return "0 0 10px"
      case "Epic":
        return "0 0 15px"
      case "Legendary":
        return "0 0 20px"
      case "Mythic":
        return "0 0 25px"
      default:
        return "0 0 5px"
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

      {showSkillResult && skillResult && (
        <div className={styles.skillResultContainer}>
          <div
            className={styles.skillResultContent}
            style={
              {
                "--rarity-color": getRarityColor(skillResult.rarity),
                "--rarity-glow": getRarityGlow(skillResult.rarity),
              } as React.CSSProperties
            }
          >
            <h2 className={styles.skillName}>{skillResult.name}</h2>
            <div className={styles.skillRarity}>{skillResult.rarity}</div>
            <p className={styles.skillDescription}>{skillResult.description}</p>
            <button className={styles.continueButton} onClick={() => window.location.reload()}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
