"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain } from "lucide-react"
import { SkillOrb } from "@/components/skills/skill-orb"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function SkillsPage() {
  const isMobile = useMobile()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activatingSkill, setActivatingSkill] = useState(false)
  const [unlockedSkill, setUnlockedSkill] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) {
      window.location.href = "/login"
      return
    }

    // Get user data
    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) {
      window.location.href = "/login"
      return
    }

    // Initialize skillPoints if not present
    if (user.skillPoints === undefined) {
      user.skillPoints = 5 // Starting skill points
      users[currentUser] = user
      localStorage.setItem("statusWindowUsers", JSON.stringify(users))
    }

    // Initialize unlockedSkills if not present
    if (!user.unlockedSkills) {
      user.unlockedSkills = []
      users[currentUser] = user
      localStorage.setItem("statusWindowUsers", JSON.stringify(users))
    }

    setUserData(user)
    setLoading(false)
  }, [])

  const handleActivateSkillOrb = () => {
    if (!userData || userData.skillPoints <= 0) return

    setActivatingSkill(true)

    // After the animation completes, unlock a random skill
    setTimeout(() => {
      unlockRandomSkill()
    }, 14000)
  }

  const unlockRandomSkill = () => {
    if (!userData) return

    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    // Available skills
    const availableSkills = [
      {
        name: "Focused Mind",
        description: "Increases intelligence gain by 10%",
        rarity: "Common",
        type: "intelligence",
      },
      { name: "Iron Body", description: "Increases strength gain by 10%", rarity: "Common", type: "strength" },
      { name: "Spirit Vessel", description: "Increases mana gain by 10%", rarity: "Common", type: "mana" },
      {
        name: "Quick Learner",
        description: "Gain 5% more XP from all activities",
        rarity: "Rare",
        type: "intelligence",
      },
      {
        name: "Endurance",
        description: "Strength activities require less recovery time",
        rarity: "Rare",
        type: "strength",
      },
      {
        name: "Meditation Master",
        description: "Mana activities provide bonus intelligence",
        rarity: "Rare",
        type: "mana",
      },
      {
        name: "Genius Intellect",
        description: "25% chance to double intelligence gain",
        rarity: "Epic",
        type: "intelligence",
      },
      {
        name: "Herculean Strength",
        description: "25% chance to double strength gain",
        rarity: "Epic",
        type: "strength",
      },
      { name: "Arcane Affinity", description: "25% chance to double mana gain", rarity: "Epic", type: "mana" },
      {
        name: "Time Dilation",
        description: "Activities take 15% less time to complete",
        rarity: "Legendary",
        type: "intelligence",
      },
      {
        name: "Titan's Might",
        description: "Strength activities have a chance to complete quests instantly",
        rarity: "Legendary",
        type: "strength",
      },
      {
        name: "Ethereal Connection",
        description: "Mana activities have a chance to restore all stats",
        rarity: "Legendary",
        type: "mana",
      },
      { name: "Omniscience", description: "Gain all stats from any activity", rarity: "Mythic", type: "intelligence" },
      { name: "Godlike Power", description: "All stat gains are increased by 50%", rarity: "Mythic", type: "strength" },
      { name: "Transcendence", description: "XP gain is doubled for all activities", rarity: "Mythic", type: "mana" },
    ]

    // Filter out already unlocked skills
    const unlockedSkillNames = user.unlockedSkills.map((skill: any) => skill.name)
    const availableToUnlock = availableSkills.filter((skill) => !unlockedSkillNames.includes(skill.name))

    if (availableToUnlock.length === 0) {
      setUnlockedSkill({
        name: "No More Skills",
        description: "You have unlocked all available skills!",
        rarity: "Mythic",
        type: "intelligence",
      })
      setActivatingSkill(false)
      return
    }

    // Select a random skill
    const randomSkill = availableToUnlock[Math.floor(Math.random() * availableToUnlock.length)]

    // Add to user's unlocked skills
    user.unlockedSkills.push(randomSkill)

    // Deduct a skill point
    user.skillPoints -= 1

    // Save updated user data
    users[currentUser] = user
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    // Update state
    setUserData(user)
    setUnlockedSkill(randomSkill)
    setActivatingSkill(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin"></div>
          <div className="text-white text-xl">Loading skills...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 text-white">
      {/* Navigation */}
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:text-blue-300">
              <ArrowLeft className="h-5 w-5 mr-2" />
              {isMobile ? "Back" : "Back to Dashboard"}
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-900/50 px-4 py-2 rounded-full border border-blue-700 flex items-center">
            <Brain className="h-5 w-5 text-blue-300 mr-2" />
            <span className="text-blue-100 font-medium">Skill Points: {userData.skillPoints}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Skill Orb Section */}
          <Card className="crystal-card border-blue-800/50 shadow-[0_0_15px_rgba(30,64,175,0.3)]">
            <CardHeader>
              <CardTitle className="text-blue-100 text-center">Skill Orb Activation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {userData.skillPoints > 0 ? (
                  <>
                    <p className="text-blue-300 mb-6 text-center">
                      Use a skill point to activate the Skill Orb and unlock a random skill.
                    </p>
                    <SkillOrb
                      onActivate={handleActivateSkillOrb}
                      isActivating={activatingSkill}
                      unlockedSkill={unlockedSkill}
                      disabled={userData.skillPoints <= 0}
                    />
                  </>
                ) : (
                  <p className="text-yellow-400 mb-6 text-center">
                    You need more skill points to activate the Skill Orb. Level up to earn more skill points!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Unlocked Skills Section */}
          <Card className="crystal-card border-blue-800/50 shadow-[0_0_15px_rgba(30,64,175,0.3)]">
            <CardHeader>
              <CardTitle className="text-blue-100">Unlocked Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {userData.unlockedSkills && userData.unlockedSkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.unlockedSkills.map((skill: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-md border ${
                        skill.rarity === "Common"
                          ? "border-gray-500 bg-gray-900/50"
                          : skill.rarity === "Rare"
                            ? "border-blue-500 bg-blue-900/50"
                            : skill.rarity === "Epic"
                              ? "border-purple-500 bg-purple-900/50"
                              : skill.rarity === "Legendary"
                                ? "border-orange-500 bg-orange-900/50"
                                : "border-pink-500 bg-pink-900/50" // Mythic
                      }`}
                    >
                      <div className="font-bold mb-1 text-lg">{skill.name}</div>
                      <div
                        className={`text-xs mb-2 ${
                          skill.rarity === "Common"
                            ? "text-gray-400"
                            : skill.rarity === "Rare"
                              ? "text-blue-400"
                              : skill.rarity === "Epic"
                                ? "text-purple-400"
                                : skill.rarity === "Legendary"
                                  ? "text-orange-400"
                                  : "text-pink-400" // Mythic
                        }`}
                      >
                        {skill.rarity}
                      </div>
                      <div className="text-sm text-blue-100">{skill.description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-blue-300 py-4">
                  No skills unlocked yet. Activate the Skill Orb to unlock skills!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
