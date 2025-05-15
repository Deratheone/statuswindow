"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import styles from "./skill-orb.module.css"

interface SkillOrbProps {
  onActivate: () => void
  isActivating: boolean
  unlockedSkill: any
  disabled?: boolean
  isMobile?: boolean
  onReset?: () => void
}

export function SkillOrb({
  onActivate,
  isActivating,
  unlockedSkill,
  disabled = false,
  isMobile = false,
  onReset,
}: SkillOrbProps) {
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const [showHolographicBox, setShowHolographicBox] = useState(false)
  const [showElectricPulse, setShowElectricPulse] = useState(false)
  const [showSkillPopup, setShowSkillPopup] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isActivating) {
      // After orb animation completes
      const animationTime = isMobile ? 8000 : 14000
      const timer = setTimeout(() => {
        setShowElectricPulse(true)

        // Show holographic box after a short delay
        setTimeout(() => {
          setShowHolographicBox(true)
        }, 500)
      }, animationTime) // Matches orb animation duration

      return () => clearTimeout(timer)
    } else if (!isActivating && !unlockedSkill) {
      // Reset all states when not activating and no skill is unlocked
      setShowElectricPulse(false)
      setShowHolographicBox(false)
      setShowSkillPopup(false)
      setAnimationComplete(false)
    }
  }, [isActivating, isMobile, unlockedSkill])

  // Show skill popup when unlockedSkill changes
  useEffect(() => {
    if (unlockedSkill && showHolographicBox) {
      setTimeout(() => {
        setShowSkillPopup(true)
        setAnimationComplete(true)
      }, 1000)
    }
  }, [unlockedSkill, showHolographicBox])

  useEffect(() => {
    if (isActivating && orbContainerRef.current) {
      generateParticles()
    }
  }, [isActivating])

  const generateParticles = () => {
    if (!orbContainerRef.current) return

    // Reduce particle count on mobile for better performance
    const totalParticles = isMobile ? 200 : 400
    const radius = 100

    // Clear existing particles
    orbContainerRef.current.innerHTML = ""

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

      particle.style.setProperty("--x", `${x}px`)
      particle.style.setProperty("--y", `${y}px`)
      particle.style.setProperty("--z", `${z}px`)
      particle.style.setProperty("--delay", `${i * 0.01}s`)

      orbContainerRef.current.appendChild(particle)
    }
  }

  const handleActivate = () => {
    if (!disabled && !isActivating) {
      onActivate()
    }
  }

  const handleReset = () => {
    if (onReset) {
      onReset()
    }
  }

  return (
    <div className={styles.centerContainer}>
      {/* Only show the start button if not activating and no skill has been unlocked */}
      {!isActivating && !animationComplete && (
        <Button className={styles.startButton} onClick={handleActivate} disabled={disabled}>
          Activate The Skill Orb
        </Button>
      )}

      <div
        ref={orbContainerRef}
        className={`${styles.orbContainer} ${isActivating ? (isMobile ? styles.activeMobile : styles.active) : ""}`}
      ></div>

      <div className={`${styles.electricPulse} ${showElectricPulse ? styles.active : ""}`}></div>

      {/* Skill popup that appears in front of the orb */}
      {unlockedSkill && (
        <div className={`${styles.skillPopup} ${showSkillPopup ? styles.active : ""}`}>
          <div
            className={`text-2xl font-bold mb-2 ${
              unlockedSkill.rarity === "Common"
                ? "text-gray-300"
                : unlockedSkill.rarity === "Rare"
                  ? "text-blue-300"
                  : unlockedSkill.rarity === "Epic"
                    ? "text-purple-300"
                    : unlockedSkill.rarity === "Legendary"
                      ? "text-orange-300"
                      : "text-pink-300" // Mythic
            }`}
          >
            {unlockedSkill.name}
          </div>
          <div
            className={`text-sm mb-2 ${
              unlockedSkill.rarity === "Common"
                ? "text-gray-400"
                : unlockedSkill.rarity === "Rare"
                  ? "text-blue-400"
                  : unlockedSkill.rarity === "Epic"
                    ? "text-purple-400"
                    : unlockedSkill.rarity === "Legendary"
                      ? "text-orange-400"
                      : "text-pink-400" // Mythic
            }`}
          >
            {unlockedSkill.rarity}
          </div>
          <div className="text-blue-100 text-sm mb-4">{unlockedSkill.description}</div>

          {/* Continue button to reset and allow activating another skill */}
          {animationComplete && (
            <Button onClick={handleReset} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Continue
            </Button>
          )}
        </div>
      )}

      <div className={`${styles.holographicBox} ${showHolographicBox ? styles.active : ""}`}>
        <div className={styles.holographicText}>SKILL UNLOCKED</div>
      </div>
    </div>
  )
}
