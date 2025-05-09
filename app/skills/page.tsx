"use client"

import { useState } from "react"
import { SkillsCanvas } from "@/components/skills/skills-canvas"
import { SkillsOverlay } from "@/components/skills/skills-overlay"
import { SkillProvider } from "@/components/skills/skill-context"
import { motion } from "framer-motion"

export default function SkillsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <SkillProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-slate-900">
        {/* Parchment background with overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/textures/parchment.jpg')",
            backgroundBlendMode: "overlay",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

        {/* 3D Canvas */}
        <SkillsCanvas isMenuOpen={isMenuOpen} />

        {/* UI Overlay */}
        <SkillsOverlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>
      </div>
    </SkillProvider>
  )
}
