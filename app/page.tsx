"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Brain, Dumbbell, Sparkles, Star, Zap } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
      animate={{
        y: [-20, -100],
        x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 2,
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">{particles}</div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-6 h-6 bg-purple-400/20 rounded-full blur-sm pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation with enhanced styling */}
      <motion.nav
        className="container mx-auto p-4 flex flex-wrap justify-between items-center relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center gap-2 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400">
            StatusWindow
          </h1>
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-sm"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
        <div className="flex gap-2 sm:gap-4 mt-1 sm:mt-0">
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-purple-900/20">
                Login
              </Button>
            </motion.div>
          </Link>
          <Link href="/onboarding">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="container mx-auto px-3 py-8 sm:px-4 sm:py-20 flex flex-col md:flex-row items-center gap-6 sm:gap-12 relative z-10">
        <motion.div className="flex-1 space-y-4 sm:space-y-6 mobile-text-container" style={{ y: y1, opacity }}>
          <AnimatePresence>
            {isVisible && (
              <motion.h1
                className="text-3xl md:text-6xl font-bold leading-tight relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(168,85,247,0.8)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  Level Up Your{" "}
                </motion.span>
                <motion.span
                  className="text-yellow-400 inline-block relative"
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 30px rgba(251,191,36,0.8)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  Real Life
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg blur-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.span>

                {/* Floating icons around the title */}
                <motion.div
                  className="absolute -top-4 -right-4 text-yellow-400"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Star className="w-6 h-6" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-6 text-purple-400"
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.p
            className="text-base md:text-xl text-gray-300 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            whileHover={{
              x: 5,
              textShadow: "0 0 10px rgba(156,163,175,0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Transform your self-improvement journey into an epic adventure with StatusWindow, your personal
            manga-inspired progress tracker.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/onboarding">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(168,85,247,0.6)",
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full relative group"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto mobile-button bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent"
                    animate={{ x: [-200, 200] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <a href="#how-it-works">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(168,85,247,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto mobile-button border-purple-500 text-purple-300 hover:bg-purple-900/20 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  Learn More
                </Button>
              </motion.div>
            </a>
            <a href="#about">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(251,191,36,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto mobile-button border-yellow-500 text-yellow-300 hover:bg-yellow-900/20 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  About
                </Button>
              </motion.div>
            </a>
          </motion.div>
        </motion.div>

        {/* Enhanced Character Status Card */}
        <motion.div
          className="flex-1 relative w-full max-w-full sm:max-w-md mx-auto md:mx-0"
          style={{ y: y2 }}
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          whileHover={{
            y: -10,
            rotateY: 5,
            scale: 1.02,
          }}
        >
          <motion.div
            className="relative bg-slate-800/70 backdrop-blur-sm border border-purple-500/50 rounded-lg p-4 sm:p-6 shadow-[0_0_30px_rgba(168,85,247,0.5)] overflow-hidden"
            whileHover={{
              boxShadow: "0 0 50px rgba(168,85,247,0.8)",
              borderColor: "rgba(168,85,247,0.8)",
            }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(168,85,247,0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, rgba(59,130,246,0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 40% 80%, rgba(251,191,36,0.3) 0%, transparent 50%)`,
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            <motion.div
              className="absolute -top-3 -left-3 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-md text-white text-xs sm:text-sm font-medium relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              Status Window
            </motion.div>

            <div className="flex items-center gap-3 sm:gap-4 mb-4 relative z-10">
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden"
                whileHover={{
                  rotate: 5,
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(168,85,247,0.6)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <span className="text-xl sm:text-2xl relative z-10">🧙</span>
              </motion.div>
              <div>
                <motion.h3
                  className="text-lg sm:text-xl font-bold"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 10px rgba(255,255,255,0.5)",
                  }}
                >
                  Mystic Seeker
                </motion.h3>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="text-yellow-400 text-xs sm:text-sm font-bold"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(251,191,36,0.5)",
                        "0 0 15px rgba(251,191,36,0.8)",
                        "0 0 5px rgba(251,191,36,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Level 12
                  </motion.span>
                  <div className="h-1.5 w-16 sm:w-24 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full relative"
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                      whileHover={{ width: "80%" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                        animate={{ x: [-20, 100] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced stat bars */}
            <div className="space-y-3 sm:space-y-4 relative z-10">
              {[
                { name: "Strength", value: 45, max: 100, color: "red", icon: Dumbbell },
                { name: "Intelligence", value: 72, max: 100, color: "blue", icon: Brain },
                { name: "Mana", value: 58, max: 100, color: "purple", icon: Sparkles },
              ].map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="space-y-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                >
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="flex items-center gap-1">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 text-${stat.color}-400`} />
                      </motion.div>
                      {stat.name}
                    </span>
                    <motion.span
                      className={`text-${stat.color}-400 font-bold`}
                      animate={{
                        textShadow: [
                          `0 0 5px rgba(${stat.color === "red" ? "239,68,68" : stat.color === "blue" ? "59,130,246" : "168,85,247"},0.5)`,
                          `0 0 15px rgba(${stat.color === "red" ? "239,68,68" : stat.color === "blue" ? "59,130,246" : "168,85,247"},0.8)`,
                          `0 0 5px rgba(${stat.color === "red" ? "239,68,68" : stat.color === "blue" ? "59,130,246" : "168,85,247"},0.5)`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    >
                      {stat.value}/{stat.max}
                    </motion.span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400 rounded-full relative`}
                      initial={{ width: "0%" }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1.5, delay: 1.5 + index * 0.3, ease: "easeOut" }}
                      whileHover={{ width: `${Math.min(stat.value + 5, 100)}%` }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                        animate={{ x: [-20, 100] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                          delay: index * 0.5,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-3 sm:mt-4 border-t border-gray-700 pt-2 sm:pt-4 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                  </motion.div>
                  Active Quests
                </span>
                <motion.span
                  className="text-yellow-400 font-bold"
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      "0 0 5px rgba(251,191,36,0.5)",
                      "0 0 15px rgba(251,191,36,0.8)",
                      "0 0 5px rgba(251,191,36,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  3
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced floating XP notification */}
          <motion.div
            className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-slate-800/70 backdrop-blur-sm border border-blue-500/50 rounded-lg p-3 sm:p-4 shadow-[0_0_20px_rgba(59,130,246,0.5)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            whileHover={{
              y: -5,
              x: -5,
              boxShadow: "0 0 30px rgba(59,130,246,0.8)",
              scale: 1.05,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative z-10">
              <motion.div
                className="text-xs sm:text-sm font-medium text-blue-400 flex items-center gap-1"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(59,130,246,0.5)",
                    "0 0 15px rgba(59,130,246,0.8)",
                    "0 0 5px rgba(59,130,246,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{
                    rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>
                +15 XP
              </motion.div>
              <div className="text-xs text-gray-400">Completed meditation</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-3 py-12 sm:px-4 sm:py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
            Epic Features
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            whileHover={{
              y: -10,
              rotateX: 5,
              rotateY: 5,
              scale: 1.02,
              boxShadow: "0 0 25px rgba(168,85,247,0.5)",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              // Disable 3D effects on mobile for performance
              ...(typeof window !== "undefined" && window.innerWidth < 768
                ? {
                    whileHover: {
                      y: -5,
                      scale: 1.01,
                      boxShadow: "0 0 15px rgba(168,85,247,0.4)",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                    },
                  }
                : {}),
            }}
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Dumbbell className="h-10 w-10 text-red-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Status Window Progression</h3>
            <p className="text-gray-300">
              Track your real-life activities and watch your stats grow like a manhwa protagonist awakening their
              abilities.
            </p>
          </motion.div>
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            whileHover={{
              y: -10,
              rotateX: 5,
              rotateY: 5,
              scale: 1.02,
              boxShadow: "0 0 25px rgba(168,85,247,0.5)",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              // Disable 3D effects on mobile for performance
              ...(typeof window !== "undefined" && window.innerWidth < 768
                ? {
                    whileHover: {
                      y: -5,
                      scale: 1.01,
                      boxShadow: "0 0 15px rgba(168,85,247,0.4)",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                    },
                  }
                : {}),
            }}
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Award className="h-10 w-10 text-yellow-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Quest System</h3>
            <p className="text-gray-300">
              Complete daily challenges and missions that align with your personal growth goals.
            </p>
          </motion.div>
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            whileHover={{
              y: -10,
              rotateX: 5,
              rotateY: 5,
              scale: 1.02,
              boxShadow: "0 0 25px rgba(168,85,247,0.5)",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              // Disable 3D effects on mobile for performance
              ...(typeof window !== "undefined" && window.innerWidth < 768
                ? {
                    whileHover: {
                      y: -5,
                      scale: 1.01,
                      boxShadow: "0 0 15px rgba(168,85,247,0.4)",
                      backgroundColor: "rgba(30, 41, 59, 0.7)",
                    },
                  }
                : {}),
            }}
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Brain className="h-10 w-10 text-blue-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Progress Analytics</h3>
            <p className="text-gray-300">
              Visualize your growth journey with detailed charts and statistics like a status window interface.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-3 py-12 sm:px-4 sm:py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
            How It Works
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <motion.div
            className="text-center"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center mx-auto mb-4 border-2 border-purple-500"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(168,85,247,0.5)",
                borderColor: "rgba(168,85,247,0.8)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <span className="text-2xl">1</span>
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Awaken Your Status Window</h3>
            <p className="text-gray-300">Answer questions to establish your starting abilities and traits.</p>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center mx-auto mb-4 border-2 border-purple-500"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(168,85,247,0.5)",
                borderColor: "rgba(168,85,247,0.8)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <span className="text-2xl">2</span>
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Log Activities</h3>
            <p className="text-gray-300">Record your daily activities to gain experience and improve your abilities.</p>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center mx-auto mb-4 border-2 border-purple-500"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(168,85,247,0.5)",
                borderColor: "rgba(168,85,247,0.8)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <span className="text-2xl">3</span>
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Complete Quests</h3>
            <p className="text-gray-300">Take on challenges to earn bonus rewards and accelerate your growth.</p>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center mx-auto mb-4 border-2 border-purple-500"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(168,85,247,0.5)",
                borderColor: "rgba(168,85,247,0.8)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <span className="text-2xl">4</span>
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-300">Watch your abilities evolve as you improve yourself in real life.</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-3 py-12 sm:px-4 sm:py-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
            About StatusWindow
          </span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 mb-8"
            whileHover={{ boxShadow: "0 0 25px rgba(168,85,247,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Experience Your Own Manga-Style Status Window</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-yellow-400">Core Features</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Experience your own blue status window like manhwa protagonists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Track real-life activities and watch your abilities grow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Complete quests that align with your personal development goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Visualize your progress with manga-inspired interface design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Unlock skills and abilities as you level up in real life</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-purple-400">Advanced Features</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">🔄</span>
                    <span>
                      <strong>Data Export/Import:</strong> Transfer your progress between devices with complete backup
                      files
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">👤</span>
                    <span>
                      <strong>Selective Character Import:</strong> Choose specific characters to import from backup
                      files
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">🔐</span>
                    <span>
                      <strong>Password Recovery:</strong> Secure account recovery using personalized security questions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">🎮</span>
                    <span>
                      <strong>Manhwa-Style Progression:</strong> Level up your abilities as you improve yourself in real
                      life
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">📱</span>
                    <span>
                      <strong>Mobile Optimized:</strong> Fully responsive design that works seamlessly on all devices
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 mb-8"
            whileHover={{ boxShadow: "0 0 25px rgba(168,85,247,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400">Data Management & Security</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-green-400">📤 Export Your Progress</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>Never lose your progress again! StatusWindow allows you to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Export complete character data as JSON backup files</li>
                    <li>• Download timestamped backups for easy organization</li>
                    <li>• Include all progress, stats, quests, and achievements</li>
                    <li>• Create automatic backups before major changes</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-blue-400">📥 Import & Restore</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>Seamlessly transfer your adventure to any device:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Import backup files with full data validation</li>
                    <li>• Preview backup contents before importing</li>
                    <li>• Automatic conflict resolution and error handling</li>
                    <li>• Restore your complete progress and achievements</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h5 className="font-semibold text-yellow-400 mb-2">🔒 Account Security</h5>
              <p className="text-sm text-gray-300">
                Forgot your password? No problem! StatusWindow includes a secure password recovery system using
                personalized security questions that you set during character creation. Your account is protected while
                remaining easily recoverable.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 mb-8"
            whileHover={{ boxShadow: "0 0 25px rgba(168,85,247,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-orange-400">Our Commitment</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-400 mb-2">🚧 Under Active Development</h5>
                <p className="text-sm text-gray-300">
                  StatusWindow is continuously evolving with new features, improvements, and optimizations being added
                  regularly based on user feedback.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">💰 Completely Free</h5>
                <p className="text-sm text-gray-300">
                  StatusWindow will always remain free to use. No hidden costs, no premium tiers - just pure
                  self-improvement focused on your personal journey.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-400 mb-2">🔓 Open Source</h5>
                <p className="text-sm text-gray-300">
                  Our code is open for everyone to see, contribute to, and learn from. Transparency and community
                  collaboration drive our development.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <p className="text-lg text-gray-300 mb-6">
              Join our growing community of people who are leveling up their real lives with their own status window,
              one quest at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/Deratheone/statuswindow" target="_blank" rel="noopener noreferrer">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-900/20">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Source Code
                  </Button>
                </motion.div>
              </a>
              <Link href="/onboarding">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Start Your Adventure
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-3 py-12 sm:px-4 sm:py-20">
        <motion.div
          className="bg-gradient-to-r from-slate-800 to-purple-900 rounded-xl p-8 md:p-12 text-center shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          whileHover={{
            boxShadow: "0 0 40px rgba(168,85,247,0.5)",
            scale: 1.01,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Ready to Awaken Your Status Window?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Join thousands of others who are experiencing their own manga-style status window and transforming their
            self-improvement journey.
          </motion.p>
          <Link href="/onboarding">
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
              >
                Awaken Your Abilities <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center gap-2 mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
                StatusWindow
              </span>
            </motion.div>

            <div className="text-gray-400 text-sm text-center md:text-right">
              © {new Date().getFullYear()} StatusWindow. Level Up Your Life.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
