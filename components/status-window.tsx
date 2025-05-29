"use client"

import { useState, useEffect, useRef } from "react"
import { Brain, Dumbbell, Sparkles, VolumeX, Volume2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { playSFX, preloadAudio } from "@/utils/audio"
import { useMobile } from "@/hooks/use-mobile"

interface StatusWindowProps {
  userData: any
}

interface StatChangeAnimation {
  id: string
  stat: string
  value: number
  timestamp: number
}

interface SystemMessage {
  id: string
  text: string
  type: "info" | "warning" | "success"
  timestamp: number
}

export function StatusWindow({ userData }: StatusWindowProps) {
  const isMobile = useMobile()
  const [levelUpAnimation, setLevelUpAnimation] = useState(false)
  const [prevStats, setPrevStats] = useState({
    strength: userData.stats.strength,
    intelligence: userData.stats.intelligence,
    mana: userData.stats.mana,
  })
  const [prevLevel, setPrevLevel] = useState(userData.level)
  const [statAnimations, setStatAnimations] = useState<StatChangeAnimation[]>([])
  const [systemMessages, setSystemMessages] = useState<SystemMessage[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const lastUpdateRef = useRef(Date.now())

  // Calculate stat max based on level (100 base + 20 per level above 1)
  const statMax = 100 + (userData.level - 1) * 20

  // Preload audio files
  useEffect(() => {
    preloadAudio(["xp-gain", "level-up", "stat-increase"])
  }, [])

  // Check for stat and level changes
  useEffect(() => {
    // Don't run on first render
    if (lastUpdateRef.current === Date.now()) return

    // Check if level has increased
    if (userData.level > prevLevel) {
      setLevelUpAnimation(true)
      if (soundEnabled) playSFX("level-up")

      // Add system message for level up
      addSystemMessage({
        text: `Congratulations! You've reached level ${userData.level}!`,
        type: "success",
      })

      // Reset animation after it completes
      const timer = setTimeout(() => {
        setLevelUpAnimation(false)
        setPrevLevel(userData.level)
      }, 3000)

      return () => clearTimeout(timer)
    }

    // Check for stat increases
    const newAnimations: StatChangeAnimation[] = []

    if (userData.stats.strength > prevStats.strength) {
      newAnimations.push({
        id: `str-${Date.now()}`,
        stat: "strength",
        value: userData.stats.strength - prevStats.strength,
        timestamp: Date.now(),
      })

      if (soundEnabled) playSFX("stat-increase")

      // Add system message for significant strength gain
      if (userData.stats.strength - prevStats.strength >= 5) {
        addSystemMessage({
          text: "Your muscles grow stronger! Physical prowess increased significantly.",
          type: "info",
        })
      }
    }

    if (userData.stats.intelligence > prevStats.intelligence) {
      newAnimations.push({
        id: `int-${Date.now()}`,
        stat: "intelligence",
        value: userData.stats.intelligence - prevStats.intelligence,
        timestamp: Date.now(),
      })

      if (soundEnabled) playSFX("stat-increase")

      // Add system message for significant intelligence gain
      if (userData.stats.intelligence - prevStats.intelligence >= 5) {
        addSystemMessage({
          text: "Your mind expands! Knowledge acquisition rate increased.",
          type: "info",
        })
      }
    }

    if (userData.stats.mana > prevStats.mana) {
      newAnimations.push({
        id: `mana-${Date.now()}`,
        stat: "mana",
        value: userData.stats.mana - prevStats.mana,
        timestamp: Date.now(),
      })

      if (soundEnabled) playSFX("stat-increase")

      // Add system message for significant mana gain
      if (userData.stats.mana - prevStats.mana >= 5) {
        addSystemMessage({
          text: "Your spiritual energy flows more freely! Mental clarity improved.",
          type: "info",
        })
      }
    }

    if (newAnimations.length > 0) {
      setStatAnimations((prev) => [...prev, ...newAnimations])

      // Clean up old animations after they've played
      setTimeout(() => {
        setStatAnimations((prev) => prev.filter((anim) => Date.now() - anim.timestamp < 2000))
      }, 2000)
    }

    // Update previous stats
    setPrevStats({
      strength: userData.stats.strength,
      intelligence: userData.stats.intelligence,
      mana: userData.stats.mana,
    })

    lastUpdateRef.current = Date.now()
  }, [userData.level, userData.stats, prevLevel, prevStats, soundEnabled])

  // Calculate XP percentage
  const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100

  // Add a system message
  const addSystemMessage = ({ text, type = "info" }: { text: string; type?: "info" | "warning" | "success" }) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      text,
      type,
      timestamp: Date.now(),
    }

    setSystemMessages((prev) => [newMessage, ...prev].slice(0, 5))

    // Remove old messages
    setTimeout(() => {
      setSystemMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id))
    }, 10000)
  }

  // Generate random system messages occasionally
  useEffect(() => {
    const randomMessages = [
      { text: "The System notices your dedication. +5% XP bonus for 1 hour.", type: "success" as const },
      { text: "Warning: Fatigue detected. Mana recovery recommended.", type: "warning" as const },
      { text: "Your consistency is impressive. Stats are growing steadily.", type: "info" as const },
      { text: "A new skill is almost within your grasp. Keep training!", type: "info" as const },
      { text: "Your potential is expanding. Stat caps increased.", type: "success" as const },
    ]

    const interval = setInterval(() => {
      // 10% chance to show a random message every 30 seconds
      if (Math.random() < 0.1) {
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)]
        addSystemMessage(randomMessage)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Get unlocked skills based on level and stats
  const getUnlockedSkills = () => {
    const skills = []

    // Level-based skills
    if (userData.level >= 5) {
      skills.push({ name: "Night Owl", level: 1, description: "2X XP after midnight" })
    }

    if (userData.level >= 10) {
      skills.push({ name: "Gamer's Focus", level: 1, description: "Study timer with auto-breaks" })
    }

    // Stat-based skills
    if (userData.stats.strength >= 30) {
      skills.push({
        name: "Iron Body",
        level: Math.floor(userData.stats.strength / 30),
        description: "Increased stamina recovery",
      })
    }

    if (userData.stats.intelligence >= 30) {
      skills.push({
        name: "Quick Learning",
        level: Math.floor(userData.stats.intelligence / 30),
        description: "Faster skill acquisition",
      })
    }

    if (userData.stats.mana >= 30) {
      skills.push({
        name: "Mental Clarity",
        level: Math.floor(userData.stats.mana / 30),
        description: "Enhanced focus duration",
      })
    }

    return skills
  }

  const skills = getUnlockedSkills()

  return (
    <div className="relative">
      <div className="relative">
        {/* Sound toggle button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10 text-white/70 hover:text-white"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </Button>

        <Card className={`relative border-0 overflow-hidden ${levelUpAnimation ? "animate-pulse" : ""}`}>
          {/* Background with blue crystal effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-950 z-0"></div>

          {/* Beveled edges */}
          <div className="absolute inset-0 border-[6px] border-blue-800 rounded-lg z-0"></div>
          <div className="absolute inset-[6px] border-[2px] border-blue-600 rounded-md z-0"></div>

          {/* Inner glow */}
          <div className="absolute inset-0 bg-blue-500/5 z-0"></div>

          {/* Header with crystal design */}
          <div className="relative z-10 bg-blue-800 mx-4 mt-4 py-2 px-4 text-center border-b-4 border-blue-700 rounded-t-md">
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-300 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full"></div>
            <h2 className="text-xl font-bold text-blue-100 tracking-wider">STATUS</h2>
          </div>

          {/* Main content */}
          <div className="relative z-10 p-4 sm:p-6 text-blue-100">
            {levelUpAnimation && (
              <div className="absolute inset-0 bg-yellow-500/20 z-10 pointer-events-none flex items-center justify-center">
                <div className="text-4xl font-bold text-yellow-400 animate-bounce">LEVEL UP!</div>
              </div>
            )}

            {/* Character info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-3xl border-4 border-blue-600 overflow-hidden">
                {userData.avatar && userData.avatar.startsWith("data:") ? (
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{userData.avatar}</span>
                )}
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  <div className="bg-blue-900/50 px-3 py-1 rounded border border-blue-700">
                    <div className="text-xs text-blue-300 uppercase">LEVEL</div>
                    <div className="text-xl font-bold">{userData.level}</div>
                  </div>

                  <div className="bg-blue-900/50 px-3 py-1 rounded border border-blue-700">
                    <div className="text-xs text-blue-300 uppercase">CLASS</div>
                    <div className="text-xl font-bold capitalize truncate">{userData.characterClass}</div>
                  </div>

                  <div className="bg-blue-900/50 px-3 py-1 rounded border border-blue-700 col-span-2">
                    <div className="text-xs text-blue-300 uppercase">NAME</div>
                    <div className="text-xl font-bold truncate">{userData.characterName}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-300">EXPERIENCE</span>
                <span className="text-blue-200">
                  {userData.xp}/{userData.xpToNextLevel} XP
                </span>
              </div>
              <div className="h-3 bg-blue-900/50 rounded-full border border-blue-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, xpPercentage)}%` }}
                ></div>
              </div>
            </div>

            {/* Stats section */}
            <div className="mb-6">
              <div className="text-lg font-bold text-blue-200 border-b-2 border-blue-700 pb-1 mb-3">STATS</div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1 text-red-300">
                        <Dumbbell className="h-4 w-4" /> STRENGTH
                      </span>
                      <span className="text-red-200 relative">
                        {userData.stats.strength}/{statMax}
                        {/* Stat increase animations */}
                        <AnimatePresence>
                          {statAnimations
                            .filter((anim) => anim.stat === "strength")
                            .map((anim) => (
                              <motion.div
                                key={anim.id}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: -20 }}
                                exit={{ opacity: 0 }}
                                className="absolute -right-4 -top-1 text-yellow-400 font-bold"
                              >
                                +{anim.value}
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </span>
                    </div>
                    <div className="h-3 bg-blue-900/50 rounded-full border border-blue-700 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (userData.stats.strength / statMax) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1 text-blue-300">
                        <Brain className="h-4 w-4" /> INTELLIGENCE
                      </span>
                      <span className="text-blue-200 relative">
                        {userData.stats.intelligence}/{statMax}
                        {/* Stat increase animations */}
                        <AnimatePresence>
                          {statAnimations
                            .filter((anim) => anim.stat === "intelligence")
                            .map((anim) => (
                              <motion.div
                                key={anim.id}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: -20 }}
                                exit={{ opacity: 0 }}
                                className="absolute -right-4 -top-1 text-yellow-400 font-bold"
                              >
                                +{anim.value}
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </span>
                    </div>
                    <div className="h-3 bg-blue-900/50 rounded-full border border-blue-700 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (userData.stats.intelligence / statMax) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1 text-purple-300">
                        <Sparkles className="h-4 w-4" /> MANA
                      </span>
                      <span className="text-purple-200 relative">
                        {userData.stats.mana}/{statMax}
                        {/* Stat increase animations */}
                        <AnimatePresence>
                          {statAnimations
                            .filter((anim) => anim.stat === "mana")
                            .map((anim) => (
                              <motion.div
                                key={anim.id}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: -20 }}
                                exit={{ opacity: 0 }}
                                className="absolute -right-4 -top-1 text-yellow-400 font-bold"
                              >
                                +{anim.value}
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </span>
                    </div>
                    <div className="h-3 bg-blue-900/50 rounded-full border border-blue-700 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (userData.stats.mana / statMax) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills section */}
            <div className="mb-6">
              <div className="text-lg font-bold text-blue-200 border-b-2 border-blue-700 pb-1 mb-3">SKILLS</div>

              {skills.length > 0 ? (
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="bg-blue-900/30 border border-blue-800 rounded p-2">
                      <div className="flex justify-between">
                        <span className="font-medium truncate mr-2">{skill.name}</span>
                        <span className="text-yellow-400 whitespace-nowrap">Lv {skill.level}</span>
                      </div>
                      <div className="text-xs text-blue-300 line-clamp-1">{skill.description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-blue-400 py-2 text-sm">
                  No skills unlocked yet. Level up to gain skills!
                </div>
              )}
            </div>

            {/* System messages */}
            <div>
              <div className="text-lg font-bold text-blue-200 border-b-2 border-blue-700 pb-1 mb-3">SYSTEM</div>

              <div className="bg-blue-950/70 border border-blue-800 rounded p-2 h-[100px] overflow-y-auto font-mono text-sm">
                <AnimatePresence>
                  {systemMessages.length > 0 ? (
                    systemMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mb-1 ${
                          msg.type === "warning"
                            ? "text-yellow-400"
                            : msg.type === "success"
                              ? "text-green-400"
                              : "text-blue-300"
                        }`}
                      >
                        &gt; {msg.text}
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-blue-500">&gt; System ready. Awaiting input...</div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StatusWindow
