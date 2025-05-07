"use client"

import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

// Dynamically import Particles component with SSR disabled for better performance
const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10" />,
})

// Dynamically import the slim version of the particles engine
const loadSlimEngine = dynamic(() => import("tsparticles-slim").then((engine) => engine.loadSlimAsync), {
  ssr: false,
})

export function ParticlesBackground() {
  const { theme } = useTheme()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  // Only show particles after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlimEngine(engine)
  }, [])

  if (!mounted) return null

  // Reduce particle count on mobile for better performance
  const particleCount = isMobile ? 15 : 30

  return (
    <Particles
      className="absolute inset-0 -z-10"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: theme === "dark" ? "#60a5fa" : "#1e40af",
          },
          links: {
            color: theme === "dark" ? "#3b82f6" : "#1e40af",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
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
        detectRetina: true,
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
            resize: true,
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
      }}
    />
  )
}
