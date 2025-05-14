"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import styles from "./skill-orb.module.css"

interface SkillOrbProps {
  onActivate: () => void
  isActivating: boolean
  unlockedSkill: any
  disabled?: boolean
}

export function SkillOrb({ onActivate, isActivating, unlockedSkill, disabled = false }: SkillOrbProps) {
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const [showHolographicBox, setShowHolographicBox] = useState(false)
  const [showElectricPulse, setShowElectricPulse] = useState(false)

  useEffect(() => {
    if (isActivating) {
      // After orb animation completes
      const timer = setTimeout(() => {
        setShowElectricPulse(true)
        setShowHolographicBox(true)
      }, 14000) // Matches orb animation duration

      return () => clearTimeout(timer)
    } else {
      setShowElectricPulse(false)
      setShowHolographicBox(false)
    }
  }, [isActivating])

  useEffect(() => {
    if (isActivating && orbContainerRef.current) {
      generateParticles()
    }
  }, [isActivating])

  const generateParticles = () => {
    if (!orbContainerRef.current) return

    const totalParticles = 400
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

  return (
    <div className={styles.centerContainer}>
      <Button
        className={`${styles.startButton} ${isActivating ? styles.fade : ""}`}
        onClick={handleActivate}
        disabled={disabled || isActivating}
      >
        Activate The Skill Orb
      </Button>

      <div ref={orbContainerRef} className={`${styles.orbContainer} ${isActivating ? styles.active : ""}`}></div>

      <div className={`${styles.electricPulse} ${showElectricPulse ? styles.active : ""}`}></div>

      <div className={`${styles.holographicBox} ${showHolographicBox ? styles.active : ""}`}>
        <div className={styles.holographicText}>
          {unlockedSkill ? (
            <>
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
              <div className="text-blue-100 text-sm">{unlockedSkill.description}</div>
            </>
          ) : (
            "SKILL UNLOCKED"
          )}
        </div>
      </div>
    </div>
  )
}
