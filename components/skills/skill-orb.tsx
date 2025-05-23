"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./skill-orb.module.css"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  isMobile: propIsMobile = false,
  unlockedSkill = null,
  onReset,
}: SkillOrbProps) {
  const startButtonRef = useRef<HTMLButtonElement>(null)
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const holoBoxRef = useRef<HTMLDivElement>(null)
  const electricPulseRef = useRef<HTMLDivElement>(null)
  const glitchOverlayRef = useRef<HTMLDivElement>(null)
  const [animationTriggered, setAnimationTriggered] = useState(false)
  const [skillResultVisible, setSkillResultVisible] = useState(false)

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(propIsMobile)

  useEffect(() => {
    const checkMobile = () => {
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      )
    }

    setIsMobile(propIsMobile || checkMobile())

    // Add resize listener
    const handleResize = () => {
      setIsMobile(propIsMobile || checkMobile())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [propIsMobile])

  // Generate particles
  useEffect(() => {
    if (!orbContainerRef.current) return

    // Clear existing particles
    orbContainerRef.current.innerHTML = ""

    // Reduce particle count for mobile devices
    const totalParticles = isMobile ? 190 : 200
    const radius = isMobile ? 80 : 100
    const styleSheet = document.createElement("style")
    let styleRules = ""

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
  }, [isMobile])

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

  // Handle animation sequence
  const handleActivate = () => {
    if (disabled || animationTriggered) return

    setAnimationTriggered(true)

    if (onActivate) {
      onActivate()
    }

    // Fade out button
    if (startButtonRef.current) {
      startButtonRef.current.classList.add(styles.fade)
    }

    // Activate orb
    if (orbContainerRef.current) {
      orbContainerRef.current.classList.add(styles.active)
    }

    // After orb animation completes (4s)
    setTimeout(() => {
      // Show electric pulse
      if (electricPulseRef.current) {
        electricPulseRef.current.classList.add(styles.active)
      }

      // Start holographic box expansion
      if (holoBoxRef.current) {
        holoBoxRef.current.classList.add(styles.active)
      }

      // Trigger glitch effect when box is fully visible
      setTimeout(() => {
        if (glitchOverlayRef.current) {
          glitchOverlayRef.current.style.display = "block"

          requestAnimationFrame(() => {
            if (glitchOverlayRef.current) {
              glitchOverlayRef.current.style.opacity = "1"
            }

            // Hide glitch after animation
            setTimeout(() => {
              if (glitchOverlayRef.current) {
                glitchOverlayRef.current.style.display = "none"
              }

              // Call onComplete to unlock a random skill
              if (onComplete) {
                onComplete()
              }

              // Show skill result
              setSkillResultVisible(true)

              // Auto-reset after 1 second
              setTimeout(() => {
                resetAnimation()
              }, 1000)
            }, 500)
          })
        }
      }, 800) // Match box expansion time

      // Hide orb container after pulse
      setTimeout(() => {
        if (orbContainerRef.current) {
          orbContainerRef.current.style.display = "none"
        }
      }, 600)
    }, 4000) // Orb animation duration
  }

  // Reset animation
  const resetAnimation = () => {
    setAnimationTriggered(false)
    setSkillResultVisible(false)

    // Reset all elements
    if (startButtonRef.current) {
      startButtonRef.current.classList.remove(styles.fade)
    }

    if (orbContainerRef.current) {
      orbContainerRef.current.classList.remove(styles.active)
      orbContainerRef.current.style.display = "block"
    }

    if (electricPulseRef.current) {
      electricPulseRef.current.classList.remove(styles.active)
    }

    if (holoBoxRef.current) {
      holoBoxRef.current.classList.remove(styles.active)
    }

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
    <TooltipProvider>
      <div className={styles.centerContainer}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button ref={startButtonRef} className={styles.startButton} onClick={handleActivate} disabled={disabled}>
              Activate The Skill Orb
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to activate the Skill Orb and unlock a random skill</p>
          </TooltipContent>
        </Tooltip>

        <div ref={orbContainerRef} className={styles.orbContainer}></div>

        <div ref={electricPulseRef} className={styles.electricPulse}></div>
        <div ref={glitchOverlayRef} className={styles.glitchOverlay}></div>

        <div ref={holoBoxRef} className={styles.holographicBox}>
          <div className={styles.holographicText}>SKILL UNLOCKED</div>
        </div>

        {skillResultVisible && unlockedSkill && (
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
    </TooltipProvider>
  )
}
