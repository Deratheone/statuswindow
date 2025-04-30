"use client"

import { useState, useEffect } from "react"
import { Brain, Dumbbell, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatusWindowProps {
  userData: any
}

export function StatusWindow({ userData }: StatusWindowProps) {
  const [levelUpAnimation, setLevelUpAnimation] = useState(false)
  const [prevLevel, setPrevLevel] = useState(userData.level)

  useEffect(() => {
    // Check if level has increased
    if (userData.level > prevLevel) {
      setLevelUpAnimation(true)

      // Reset animation after it completes
      const timer = setTimeout(() => {
        setLevelUpAnimation(false)
        setPrevLevel(userData.level)
      }, 3000)

      return () => clearTimeout(timer)
    }

    setPrevLevel(userData.level)
  }, [userData.level, prevLevel])

  // Calculate XP percentage
  const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100

  return (
    <Card
      className={`relative border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] overflow-hidden ${
        levelUpAnimation ? "animate-pulse" : ""
      }`}
    >
      {levelUpAnimation && (
        <div className="absolute inset-0 bg-yellow-500/20 z-10 pointer-events-none flex items-center justify-center">
          <div className="text-4xl font-bold text-yellow-400 animate-bounce">LEVEL UP!</div>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
            {userData.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold">{userData.characterName}</h2>
            <div className="text-sm text-gray-400">
              {userData.characterClass.charAt(0).toUpperCase() + userData.characterClass.slice(1)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400 text-sm font-medium">Level {userData.level}</span>
              <div className="h-1.5 w-24 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, xpPercentage)}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">
                {userData.xp}/{userData.xpToNextLevel} XP
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Dumbbell className="h-4 w-4 text-red-400" /> Strength
              </span>
              <span className="text-red-400">{userData.stats.strength}/100</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, userData.stats.strength)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Brain className="h-4 w-4 text-blue-400" /> Intelligence
              </span>
              <span className="text-blue-400">{userData.stats.intelligence}/100</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, userData.stats.intelligence)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-purple-400" /> Mana
              </span>
              <span className="text-purple-400">{userData.stats.mana}/100</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, userData.stats.mana)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm text-gray-400">Strength</div>
              <div className="text-lg font-bold text-red-400">{userData.stats.strength}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Intelligence</div>
              <div className="text-lg font-bold text-blue-400">{userData.stats.intelligence}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Mana</div>
              <div className="text-lg font-bold text-purple-400">{userData.stats.mana}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
