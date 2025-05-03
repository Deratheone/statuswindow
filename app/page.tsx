"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Brain, Dumbbell, Sparkles } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 text-white">
      {/* Navigation */}
      <nav className="container mx-auto p-4 flex flex-wrap justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Sparkles className="h-6 w-6 text-yellow-400" />
          <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
            StatusWindow
          </h1>
        </motion.div>
        <div className="flex gap-2 sm:gap-4 mt-1 sm:mt-0">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400">
              Login
            </Button>
          </Link>
          <Link href="/onboarding">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
              >
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-3 py-12 sm:px-4 sm:py-20 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
        <div className="flex-1 space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0.9 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Level Up Your <span className="text-yellow-400">Real Life</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Transform your self-improvement journey into an epic adventure with StatusWindow, your personal RPG-inspired
            progress tracker.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <Link href="/onboarding">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
                >
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <a href="#how-it-works">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:bg-purple-900/20"
                >
                  Learn More
                </Button>
              </motion.div>
            </a>
          </div>
        </div>
        <motion.div
          className="flex-1 relative"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <motion.div
            className="relative bg-slate-800/70 backdrop-blur-sm border border-purple-500/50 rounded-lg p-6 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            whileHover={{ boxShadow: "0 0 25px rgba(168,85,247,0.7)" }}
          >
            <motion.div
              className="absolute -top-3 -left-3 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1 rounded-md text-white text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Character Status
            </motion.div>
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="text-2xl">🧙</span>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Mystic Seeker</h3>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">Level 12</span>
                  <div className="h-1.5 w-24 bg-gray-700 rounded-full">
                    <motion.div
                      className="h-full w-3/4 bg-yellow-400 rounded-full"
                      whileHover={{ width: "80%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Dumbbell className="h-4 w-4 text-red-400" /> Strength
                  </span>
                  <span className="text-red-400">45/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <motion.div
                    className="h-full w-[45%] bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                    whileHover={{ width: "50%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  ></motion.div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Brain className="h-4 w-4 text-blue-400" /> Intelligence
                  </span>
                  <span className="text-blue-400">72/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <motion.div
                    className="h-full w-[72%] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    whileHover={{ width: "77%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  ></motion.div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-purple-400" /> Mana
                  </span>
                  <span className="text-purple-400">58/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <motion.div
                    className="h-full w-[58%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                    whileHover={{ width: "63%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  ></motion.div>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-700 pt-4">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-yellow-400" /> Active Quests
                </span>
                <span className="text-yellow-400">3</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -right-4 bg-slate-800/70 backdrop-blur-sm border border-blue-500/50 rounded-lg p-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            whileHover={{ y: -5, x: -5, boxShadow: "0 0 20px rgba(59,130,246,0.7)" }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="text-sm font-medium text-blue-400">+15 XP</div>
            <div className="text-xs text-gray-400">Completed meditation</div>
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
            whileHover={{
              y: -10,
              boxShadow: "0 0 25px rgba(168,85,247,0.5)",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Dumbbell className="h-10 w-10 text-red-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Character Development</h3>
            <p className="text-gray-300">
              Create your character, track your stats, and watch yourself level up as you complete real-life activities.
            </p>
          </motion.div>
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            whileHover={{
              y: -10,
              boxShadow: "0 0 25px rgba(168,85,247,0.5)",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Award className="h-10 w-10 text-yellow-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Quest System</h3>
            <p className="text-gray-300">
              Take on weekly challenges tailored to your goals and earn rewards for completing them.
            </p>
          </motion.div>
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            whileHover={{
              y: -10,
              boxShadow: "0 0 25px rgba(168,85,247,0.5)",
              backgroundColor: "rgba(30, 41, 59, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Brain className="h-10 w-10 text-blue-400 mb-4" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Progress Analytics</h3>
            <p className="text-gray-300">
              Track your growth over time with beautiful visualizations and detailed statistics.
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
            <h3 className="text-xl font-bold mb-2">Create Character</h3>
            <p className="text-gray-300">Answer a few questions to establish your starting stats.</p>
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
            <p className="text-gray-300">Record your daily activities to gain XP and improve stats.</p>
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
            <p className="text-gray-300">Take on challenges to earn bonus rewards and level up faster.</p>
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
            <p className="text-gray-300">Watch your character grow and evolve as you improve in real life.</p>
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
            Ready to Begin Your Adventure?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Join thousands of others who are transforming their self-improvement journey into an epic quest for personal
            growth.
          </motion.p>
          <Link href="/onboarding">
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
              >
                Create Your Character <ArrowRight className="ml-2 h-5 w-5" />
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
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} StatusWindow. Level Up Your Life.</div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
