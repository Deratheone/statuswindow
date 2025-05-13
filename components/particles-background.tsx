"use client"

import { useCallback, useEffect, useState } from "react"
import Particles from "react-particles"
import type { Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme()
  const isMobile = useMobile()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadFull(engine)
    } catch (error) {
      console.error("Error initializing particles:", error)
    }
  }, [])

  if (!isClient) return null

  const isDark = resolvedTheme === "dark"
  const particleColor = isDark ? "#60a5fa" : "#1e40af"
  const linkColor = isDark ? "#3b82f6" : "#1e40af"
  const particleCount = isMobile ? 15 : 30

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10 h-full w-full"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: particleCount,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
