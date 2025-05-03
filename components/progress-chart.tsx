"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Dumbbell, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

interface ProgressChartProps {
  userData: any
  detailed?: boolean
}

export function ProgressChart({ userData, detailed = false }: ProgressChartProps) {
  const [showAnimation, setShowAnimation] = useState(false)
  const [prevStats, setPrevStats] = useState({
    strength: userData.stats.strength,
    intelligence: userData.stats.intelligence,
    mana: userData.stats.mana,
  })

  // Check if stats have increased
  useEffect(() => {
    if (
      userData.stats.strength > prevStats.strength ||
      userData.stats.intelligence > prevStats.intelligence ||
      userData.stats.mana > prevStats.mana
    ) {
      setShowAnimation(true)
      const timer = setTimeout(() => {
        setShowAnimation(false)
      }, 2000)

      return () => clearTimeout(timer)
    }

    setPrevStats({
      strength: userData.stats.strength,
      intelligence: userData.stats.intelligence,
      mana: userData.stats.mana,
    })
  }, [userData.stats, prevStats])

  // Prepare data for bar chart
  const barData = [
    {
      name: "Strength",
      value: userData.stats.strength,
      fill: "url(#strengthGradient)",
    },
    {
      name: "Intelligence",
      value: userData.stats.intelligence,
      fill: "url(#intelligenceGradient)",
    },
    {
      name: "Mana",
      value: userData.stats.mana,
      fill: "url(#manaGradient)",
    },
  ]

  // Generate historical data for line chart (simulated)
  const generateHistoricalData = () => {
    const data = []
    const days = 7

    // Start with values that are 70-90% of current values
    const startStrength = Math.floor(userData.stats.strength * (0.7 + Math.random() * 0.2))
    const startIntelligence = Math.floor(userData.stats.intelligence * (0.7 + Math.random() * 0.2))
    const startMana = Math.floor(userData.stats.mana * (0.7 + Math.random() * 0.2))

    for (let i = 0; i < days; i++) {
      // Calculate progress over time
      const progress = i / (days - 1)
      const strength = Math.floor(startStrength + (userData.stats.strength - startStrength) * progress)
      const intelligence = Math.floor(startIntelligence + (userData.stats.intelligence - startIntelligence) * progress)
      const mana = Math.floor(startMana + (userData.stats.mana - startMana) * progress)

      // Add some randomness for a more natural progression
      const randomFactor = 0.95 + Math.random() * 0.1

      data.push({
        name: `Day ${i + 1}`,
        strength: Math.floor(strength * randomFactor),
        intelligence: Math.floor(intelligence * randomFactor),
        mana: Math.floor(mana * randomFactor),
      })
    }

    return data
  }

  const lineData = generateHistoricalData()

  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-2 border border-slate-700 rounded-md shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            Value: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-3 text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              transition={{ repeat: 3, duration: 0.5 }}
              className="text-yellow-400 font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Stats Increased!
              <Sparkles className="h-5 w-5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!detailed && (
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-2 p-3 rounded-md bg-gradient-to-br from-red-900/30 to-red-700/10 border border-red-500/30"
          >
            <Dumbbell className="h-5 w-5 text-red-400" />
            <div>
              <div className="text-sm text-gray-400">Strength</div>
              <motion.div
                key={userData.stats.strength}
                initial={{ scale: 1.2, color: "#f87171" }}
                animate={{ scale: 1, color: "#f87171" }}
                className="text-lg font-bold"
              >
                {userData.stats.strength}
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-2 p-3 rounded-md bg-gradient-to-br from-blue-900/30 to-blue-700/10 border border-blue-500/30"
          >
            <Brain className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-sm text-gray-400">Intelligence</div>
              <motion.div
                key={userData.stats.intelligence}
                initial={{ scale: 1.2, color: "#60a5fa" }}
                animate={{ scale: 1, color: "#60a5fa" }}
                className="text-lg font-bold"
              >
                {userData.stats.intelligence}
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-2 p-3 rounded-md bg-gradient-to-br from-purple-900/30 to-purple-700/10 border border-purple-500/30"
          >
            <Sparkles className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm text-gray-400">Mana</div>
              <motion.div
                key={userData.stats.mana}
                initial={{ scale: 1.2, color: "#c084fc" }}
                animate={{ scale: 1, color: "#c084fc" }}
                className="text-lg font-bold"
              >
                {userData.stats.mana}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="relative w-full h-[300px] bg-slate-800/50 rounded-lg border border-slate-700 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="strengthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="intelligenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="manaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} animationDuration={1500} animationEasing="ease-in-out" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {detailed && (
        <>
          <div className="relative w-full h-[300px] bg-slate-800/50 rounded-lg border border-slate-700 p-4 mt-6">
            <h3 className="text-lg font-medium mb-2">Progress Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569" }}
                  labelStyle={{ color: "#f8fafc" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="strength"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={2000}
                />
                <Line
                  type="monotone"
                  dataKey="intelligence"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={2000}
                />
                <Line
                  type="monotone"
                  dataKey="mana"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="border-red-500/30 bg-gradient-to-br from-slate-800 to-red-900/10 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-4 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="h-5 w-5 text-red-400" />
                    <h3 className="font-medium">Strength</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Physical activities that build your body and endurance.</p>
                  <motion.div
                    key={userData.stats.strength}
                    initial={{ scale: 1.2, color: "#f87171" }}
                    animate={{ scale: 1, color: "#f87171" }}
                    className="text-2xl font-bold text-red-400"
                  >
                    {userData.stats.strength}
                  </motion.div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-red-500/10 blur-xl"></div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="border-blue-500/30 bg-gradient-to-br from-slate-800 to-blue-900/10 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-4 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-blue-400" />
                    <h3 className="font-medium">Intelligence</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Mental activities that expand your knowledge and skills.</p>
                  <motion.div
                    key={userData.stats.intelligence}
                    initial={{ scale: 1.2, color: "#60a5fa" }}
                    animate={{ scale: 1, color: "#60a5fa" }}
                    className="text-2xl font-bold text-blue-400"
                  >
                    {userData.stats.intelligence}
                  </motion.div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"></div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="border-purple-500/30 bg-gradient-to-br from-slate-800 to-purple-900/10 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-4 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h3 className="font-medium">Mana</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    Mindfulness activities that nurture your mental wellbeing.
                  </p>
                  <motion.div
                    key={userData.stats.mana}
                    initial={{ scale: 1.2, color: "#c084fc" }}
                    animate={{ scale: 1, color: "#c084fc" }}
                    className="text-2xl font-bold text-purple-400"
                  >
                    {userData.stats.mana}
                  </motion.div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-purple-500/10 blur-xl"></div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}
