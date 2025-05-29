"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CelebrationEffectProps {
  show: boolean
  message: string
  onComplete: () => void
}

export function CelebrationEffect({ show, message, onComplete }: CelebrationEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>(
    [],
  )

  useEffect(() => {
    if (show) {
      // Generate particles
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: [
          "#fbbf24", // yellow
          "#60a5fa", // blue
          "#a855f7", // purple
          "#f87171", // red
          "#34d399", // green
        ][Math.floor(Math.random() * 5)],
      }))
      setParticles(newParticles)

      // Hide after animation completes
      const timer = setTimeout(() => {
        onComplete()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Particles */}
          <div className="fixed inset-0 pointer-events-none z-50">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  opacity: 1,
                  x: `50%`,
                  y: `50%`,
                  scale: 0,
                }}
                animate={{
                  opacity: 0,
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
                className="absolute"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm px-8 py-6 rounded-xl border-2 border-blue-500/50 shadow-lg text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{message}</div>
              <div className="text-blue-200 text-lg">Activity Completed!</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
