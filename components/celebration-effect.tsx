"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CelebrationEffectProps {
  show: boolean
  message: string
  onComplete: () => void
}

export function CelebrationEffect({ show, message, onComplete }: CelebrationEffectProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (show) {
      // Create random sparkles
      const newSparkles = []
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        })
      }
      setSparkles(newSparkles)

      // Hide after animation completes
      const timer = setTimeout(() => {
        onComplete()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={onComplete}
          />

          <div className="celebration-burst" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="celebration-text"
          >
            {message}
          </motion.div>

          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className={`sparkle sparkle-${(sparkle.id % 5) + 1}`}
              style={{
                top: `${sparkle.y}%`,
                left: `${sparkle.x}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}
