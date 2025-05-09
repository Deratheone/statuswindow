"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useSkills } from "./skill-context"

interface SkillsOverlayProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

export function SkillsOverlay({ isMenuOpen, setIsMenuOpen }: SkillsOverlayProps) {
  const { skills, selectedSkill, unlockSkill, skillPoints } = useSkills()

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/80 text-white shadow-lg backdrop-blur-sm"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
        >
          {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M12 5v14M5 12h14" />}
        </svg>
      </motion.button>

      {/* Skill points indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4 z-50 rounded-full bg-slate-800/80 px-4 py-2 text-white backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Skill Points:</span>
          <span className="text-lg font-bold text-yellow-400">{skillPoints}</span>
        </div>
      </motion.div>

      {/* Skill details panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-0 left-0 right-0 z-40 rounded-t-3xl bg-slate-900/90 p-6 backdrop-blur-lg"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Skill Tree</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">Available Points:</span>
                <span className="text-lg font-bold text-yellow-400">{skillPoints}</span>
              </div>
            </div>

            {selectedSkill ? (
              <div className="mb-6">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                    style={{ backgroundColor: `${selectedSkill.color}40`, color: selectedSkill.color }}
                  >
                    {selectedSkill.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-sm text-gray-300">{selectedSkill.description}</p>
                  </div>
                </div>

                {/* Skill level indicator */}
                <div className="mb-4">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Level {selectedSkill.level}/{selectedSkill.maxLevel}
                    </span>
                    <span className="text-sm text-gray-300">
                      {selectedSkill.level === selectedSkill.maxLevel
                        ? "MAXED"
                        : `Next: +${selectedSkill.level + 1}0% Effect`}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${(selectedSkill.level / selectedSkill.maxLevel) * 100}%`,
                        backgroundColor: selectedSkill.color,
                      }}
                    />
                  </div>
                </div>

                {/* Unlock button */}
                <button
                  className={`relative w-full rounded-lg py-3 px-4 text-center font-bold text-white transition-all duration-300 ${
                    skillPoints > 0 && selectedSkill.level < selectedSkill.maxLevel
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      : "bg-slate-700 cursor-not-allowed opacity-50"
                  }`}
                  onClick={() => unlockSkill(selectedSkill.id)}
                  disabled={skillPoints <= 0 || selectedSkill.level >= selectedSkill.maxLevel}
                  style={{
                    boxShadow:
                      skillPoints > 0 && selectedSkill.level < selectedSkill.maxLevel
                        ? `0 0 15px ${selectedSkill.color}80, 0 0 5px ${selectedSkill.color}40`
                        : "none",
                  }}
                >
                  {selectedSkill.level === selectedSkill.maxLevel
                    ? "Skill Mastered"
                    : skillPoints <= 0
                      ? "No Skill Points Available"
                      : "Unlock Skill Level"}

                  {/* Animated border */}
                  {skillPoints > 0 && selectedSkill.level < selectedSkill.maxLevel && (
                    <span
                      className="absolute inset-0 block rounded-lg border-2"
                      style={{
                        borderColor: selectedSkill.color,
                        animation: "pulse 2s infinite",
                      }}
                    />
                  )}
                </button>
              </div>
            ) : (
              <div className="mb-6 text-center text-gray-300">
                <p>Select a skill node to view details</p>
              </div>
            )}

            {/* All skills list */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`rounded-lg border-2 p-4 transition-all duration-300 ${
                    selectedSkill?.id === skill.id ? "border-white bg-slate-800/80" : "border-slate-700 bg-slate-800/40"
                  }`}
                  style={{
                    borderColor: selectedSkill?.id === skill.id ? skill.color : "",
                    boxShadow: selectedSkill?.id === skill.id ? `0 0 10px ${skill.color}40` : "",
                  }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-xl"
                      style={{ backgroundColor: `${skill.color}40`, color: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{skill.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(skill.maxLevel)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 w-1.5 rounded-full ${i < skill.level ? "bg-white" : "bg-slate-600"}`}
                            style={{ backgroundColor: i < skill.level ? skill.color : "" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300">{skill.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Touch instructions overlay - only shown initially */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="mb-4 text-4xl"
              >
                👆
              </motion.div>
              <p className="text-lg font-medium">Tap and drag to rotate</p>
              <p className="text-sm text-gray-300">Tap a skill to select it</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
