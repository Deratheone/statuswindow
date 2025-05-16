"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./skill-orb.module.css"

export function SkillOrbAnimation() {
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const [animationTriggered, setAnimationTriggered] = useState(false)
  const [showHolographicBox, setShowHolographicBox] = useState(false)
  const [showElectricPulse, setShowElectricPulse] = useState(false)
  const [showGlitchOverlay, setShowGlitchOverlay] = useState(false)

  // Detect mobile device for particle count optimization
  const isMobile =
    typeof navigator !== "undefined"
      ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      : false

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

  useEffect(() => {
    // Generate particles after a slight delay to ensure smooth page load
    const timer = setTimeout(generateParticles, 100)

    // Prevent scrolling on mobile devices when animation is triggered
    const preventScroll = (e: TouchEvent) => {
      if (animationTriggered) {
        e.preventDefault()
      }
    }

    document.body.addEventListener("touchmove", preventScroll, { passive: false })

    return () => {
      clearTimeout(timer)
      document.body.removeEventListener("touchmove", preventScroll)
    }
  }, [animationTriggered])

  const handleActivate = () => {
    if (animationTriggered) return
    setAnimationTriggered(true)

    // After orb animation completes (adjusted to 4s)
    setTimeout(() => {
      // Show electric pulse
      setShowElectricPulse(true)

      // Start holographic box expansion immediately after pulse
      // REDUCED DELAY: Show holographic box sooner
      setTimeout(() => {
        setShowHolographicBox(true)

        // Trigger glitch effect when box is fully visible
        // REDUCED DELAY: Show glitch effect sooner
        setTimeout(() => {
          setShowGlitchOverlay(true)

          // Hide glitch after animation
          setTimeout(() => {
            setShowGlitchOverlay(false)
          }, 500)
        }, 300) // Reduced from 800ms to 300ms
      }, 200) // Reduced delay to 200ms (was implicit before)

      // Hide orb container after pulse
      setTimeout(() => {
        orbContainerRef.current?.classList.remove(styles.active)
        orbContainerRef.current?.classList.remove(styles.activeMobile)

        // Hide orb container completely
        setTimeout(() => {
          if (orbContainerRef.current) {
            orbContainerRef.current.style.display = "none"
          }
        }, 100)
      }, 600)
    }, 4000) // Keep the original orb animation duration at 4s
  }

  return (
    <div className={styles.centerContainer}>
      <button className={`${styles.startButton} ${animationTriggered ? styles.fade : ""}`} onClick={handleActivate}>
        Activate The Skill Orb
      </button>

      <div
        ref={orbContainerRef}
        className={`${styles.orbContainer} ${animationTriggered ? (isMobile ? styles.activeMobile : styles.active) : ""}`}
      ></div>

      <div className={`${styles.electricPulse} ${showElectricPulse ? styles.active : ""}`}></div>

      <div
        className={`${styles.glitchOverlay} ${showGlitchOverlay ? styles.active : ""}`}
        style={{ display: showGlitchOverlay ? "block" : "none" }}
      ></div>

      <div className={`${styles.holographicBox} ${showHolographicBox ? styles.active : ""}`}>
        <div className={styles.holographicText}>SKILL UNLOCKED</div>
      </div>
    </div>
  )
}

export default SkillOrbAnimation
