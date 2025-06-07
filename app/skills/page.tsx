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
  }

  const handleOrbAnimationComplete = () => {
    unlockRandomSkill()
  }

  const resetSkillOrb = () => {
    setUnlockedSkill(null)
    setActivatingSkill(false)
  }

  const unlockRandomSkill = () => {
    if (!userData) return

    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    // Available skills with rarity weights - EXPANDED VERSION
    const availableSkills = [
      // ===== COMMON SKILLS (50% chance) =====

      // Intelligence Common Skills
      {
        name: "Focused Mind",
        description: "Increases intelligence gain by 10%",
        rarity: "Common",
        type: "intelligence",
        weight: 50,
      },
      {
        name: "Study Habit",
        description: "Intelligence activities are 5% more effective",
        rarity: "Common",
        type: "intelligence",
        weight: 50,
      },
      {
        name: "Quick Reader",
        description: "Reading activities complete 10% faster",
        rarity: "Common",
        type: "intelligence",
        weight: 50,
      },
      {
        name: "Memory Palace",
        description: "Retain 15% more knowledge from learning activities",
        rarity: "Common",
        type: "intelligence",
        weight: 50,
      },
      {
        name: "Note Taker",
        description: "Writing activities provide bonus intelligence",
        rarity: "Common",
        type: "intelligence",
        weight: 50,
      },
      {
        name: "Curious Mind",
        description: "Research activities are 8% more effective",
        rarity: "Common",
        type: "intelligence",
        weight: 50,
      },

      // Strength Common Skills
      {
        name: "Iron Body",
        description: "Increases strength gain by 10%",
        rarity: "Common",
        type: "strength",
        weight: 50,
      },
      {
        name: "Workout Routine",
        description: "Strength activities are 5% more effective",
        rarity: "Common",
        type: "strength",
        weight: 50,
      },
      {
        name: "Morning Jogger",
        description: "Cardio activities complete 10% faster",
        rarity: "Common",
        type: "strength",
        weight: 50,
      },
      {
        name: "Steady Pace",
        description: "Endurance activities provide bonus XP",
        rarity: "Common",
        type: "strength",
        weight: 50,
      },
      {
        name: "Proper Form",
        description: "Weight training activities are 8% more effective",
        rarity: "Common",
        type: "strength",
        weight: 50,
      },
      {
        name: "Active Lifestyle",
        description: "All physical activities provide small mana bonus",
        rarity: "Common",
        type: "strength",
        weight: 50,
      },

      // Mana Common Skills
      {
        name: "Spirit Vessel",
        description: "Increases mana gain by 10%",
        rarity: "Common",
        type: "mana",
        weight: 50,
      },
      {
        name: "Meditation Routine",
        description: "Mana activities are 5% more effective",
        rarity: "Common",
        type: "mana",
        weight: 50,
      },
      {
        name: "Deep Breathing",
        description: "Relaxation activities complete 10% faster",
        rarity: "Common",
        type: "mana",
        weight: 50,
      },
      {
        name: "Inner Peace",
        description: "Mindfulness activities provide bonus intelligence",
        rarity: "Common",
        type: "mana",
        weight: 50,
      },
      {
        name: "Zen Garden",
        description: "Nature activities are 8% more effective",
        rarity: "Common",
        type: "mana",
        weight: 50,
      },
      {
        name: "Calm Spirit",
        description: "Stress relief activities provide bonus XP",
        rarity: "Common",
        type: "mana",
        weight: 50,
      },

      // ===== RARE SKILLS (30% chance) =====

      // Intelligence Rare Skills
      {
        name: "Quick Learner",
        description: "Gain 5% more XP from all activities",
        rarity: "Rare",
        type: "intelligence",
        weight: 30,
      },
      {
        name: "Knowledge Retention",
        description: "Intelligence gains have a 10% chance to be doubled",
        rarity: "Rare",
        type: "intelligence",
        weight: 30,
      },
      {
        name: "Speed Reader",
        description: "Reading activities complete 25% faster",
        rarity: "Rare",
        type: "intelligence",
        weight: 30,
      },
      {
        name: "Pattern Recognition",
        description: "Problem-solving activities are 20% more effective",
        rarity: "Rare",
        type: "intelligence",
        weight: 30,
      },
      {
        name: "Analytical Mind",
        description: "Critical thinking activities provide bonus strength",
        rarity: "Rare",
        type: "intelligence",
        weight: 30,
      },
      {
        name: "Information Synthesis",
        description: "Learning activities have 15% chance to complete quests faster",
        rarity: "Rare",
        type: "intelligence",
        weight: 30,
      },
      {
        name: "Mental Agility",
        description: "Switch between different study topics without penalty",
        rarity: "Rare",
        type: "intelligence",
        weight: 30,
      },

      // Strength Rare Skills
      {
        name: "Endurance",
        description: "Strength activities require less recovery time",
        rarity: "Rare",
        type: "strength",
        weight: 30,
      },
      {
        name: "Physical Conditioning",
        description: "Strength gains have a 10% chance to be doubled",
        rarity: "Rare",
        type: "strength",
        weight: 30,
      },
      {
        name: "Muscle Memory",
        description: "Repeated exercises become 20% more effective",
        rarity: "Rare",
        type: "strength",
        weight: 30,
      },
      {
        name: "Power Burst",
        description: "High-intensity activities provide bonus mana",
        rarity: "Rare",
        type: "strength",
        weight: 30,
      },
      {
        name: "Athletic Form",
        description: "Sports activities are 25% more effective",
        rarity: "Rare",
        type: "strength",
        weight: 30,
      },
      {
        name: "Recovery Master",
        description: "Rest periods between workouts are 30% shorter",
        rarity: "Rare",
        type: "strength",
        weight: 30,
      },
      {
        name: "Coordination",
        description: "Complex movements provide bonus intelligence",
        rarity: "Rare",
        type: "strength",
        weight: 30,
      },

      // Mana Rare Skills
      {
        name: "Meditation Master",
        description: "Mana activities provide bonus intelligence",
        rarity: "Rare",
        type: "mana",
        weight: 30,
      },
      {
        name: "Mental Clarity",
        description: "Mana gains have a 10% chance to be doubled",
        rarity: "Rare",
        type: "mana",
        weight: 30,
      },
      {
        name: "Emotional Balance",
        description: "Stress management activities are 25% more effective",
        rarity: "Rare",
        type: "mana",
        weight: 30,
      },
      {
        name: "Spiritual Insight",
        description: "Reflection activities provide bonus strength",
        rarity: "Rare",
        type: "mana",
        weight: 30,
      },
      {
        name: "Energy Flow",
        description: "Yoga and stretching activities are 20% more effective",
        rarity: "Rare",
        type: "mana",
        weight: 30,
      },
      {
        name: "Mindful Presence",
        description: "All activities have 5% chance to restore some mana",
        rarity: "Rare",
        type: "mana",
        weight: 30,
      },
      {
        name: "Chakra Alignment",
        description: "Meditation activities have chance to boost all stats",
        rarity: "Rare",
        type: "mana",
        weight: 30,
      },

      // ===== EPIC SKILLS (15% chance) =====

      // Intelligence Epic Skills
      {
        name: "Genius Intellect",
        description: "15% chance to double intelligence gain",
        rarity: "Epic",
        type: "intelligence",
        weight: 15,
      },
      {
        name: "Scholarly Insight",
        description: "Intelligence activities have a chance to complete quests faster",
        rarity: "Epic",
        type: "intelligence",
        weight: 15,
      },
      {
        name: "Photographic Memory",
        description: "Never forget learned information, 30% bonus to review activities",
        rarity: "Epic",
        type: "intelligence",
        weight: 15,
      },
      {
        name: "Eureka Moment",
        description: "Creative activities have 20% chance to instantly complete",
        rarity: "Epic",
        type: "intelligence",
        weight: 15,
      },
      {
        name: "Master Strategist",
        description: "Planning activities provide massive XP bonus",
        rarity: "Epic",
        type: "intelligence",
        weight: 15,
      },
      {
        name: "Polymath",
        description: "Learning multiple subjects simultaneously with no penalty",
        rarity: "Epic",
        type: "intelligence",
        weight: 15,
      },
      {
        name: "Neural Network",
        description: "Connect different knowledge areas for compound learning bonus",
        rarity: "Epic",
        type: "intelligence",
        weight: 15,
      },

      // Strength Epic Skills
      {
        name: "Herculean Strength",
        description: "15% chance to double strength gain",
        rarity: "Epic",
        type: "strength",
        weight: 15,
      },
      {
        name: "Warrior's Spirit",
        description: "Strength activities have a chance to complete quests faster",
        rarity: "Epic",
        type: "strength",
        weight: 15,
      },
      {
        name: "Unstoppable Force",
        description: "High-intensity workouts have 20% chance to instantly complete",
        rarity: "Epic",
        type: "strength",
        weight: 15,
      },
      {
        name: "Perfect Technique",
        description: "All physical activities are 35% more effective",
        rarity: "Epic",
        type: "strength",
        weight: 15,
      },
      {
        name: "Iron Will",
        description: "Never skip workouts, consistency bonus stacks infinitely",
        rarity: "Epic",
        type: "strength",
        weight: 15,
      },
      {
        name: "Adaptive Training",
        description: "Automatically optimize workout intensity for maximum gains",
        rarity: "Epic",
        type: "strength",
        weight: 15,
      },
      {
        name: "Champion's Heart",
        description: "Competitive activities provide massive stat bonuses",
        rarity: "Epic",
        type: "strength",
        weight: 15,
      },

      // Mana Epic Skills
      {
        name: "Arcane Affinity",
        description: "15% chance to double mana gain",
        rarity: "Epic",
        type: "mana",
        weight: 15,
      },
      {
        name: "Mystic Connection",
        description: "Mana activities have a chance to complete quests faster",
        rarity: "Epic",
        type: "mana",
        weight: 15,
      },
      {
        name: "Enlightened State",
        description: "Meditation has 20% chance to instantly restore all stats",
        rarity: "Epic",
        type: "mana",
        weight: 15,
      },
      {
        name: "Spiritual Mastery",
        description: "All self-care activities are 35% more effective",
        rarity: "Epic",
        type: "mana",
        weight: 15,
      },
      {
        name: "Harmony Keeper",
        description: "Maintain perfect work-life balance with automatic optimization",
        rarity: "Epic",
        type: "mana",
        weight: 15,
      },
      {
        name: "Energy Conductor",
        description: "Channel excess energy between different stat types",
        rarity: "Epic",
        type: "mana",
        weight: 15,
      },
      {
        name: "Zen Master",
        description: "Achieve flow state in any activity for massive bonuses",
        rarity: "Epic",
        type: "mana",
        weight: 15,
      },

      // ===== LEGENDARY SKILLS (4% chance) =====

      // Intelligence Legendary Skills
      {
        name: "Time Dilation",
        description: "Activities take 15% less time to complete",
        rarity: "Legendary",
        type: "intelligence",
        weight: 4,
      },
      {
        name: "Quantum Mind",
        description: "Intelligence gains are increased by 25%",
        rarity: "Legendary",
        type: "intelligence",
        weight: 4,
      },
      {
        name: "Infinite Library",
        description: "Access to unlimited knowledge, all learning activities doubled",
        rarity: "Legendary",
        type: "intelligence",
        weight: 4,
      },
      {
        name: "Temporal Scholar",
        description: "Learn from past and future simultaneously",
        rarity: "Legendary",
        type: "intelligence",
        weight: 4,
      },
      {
        name: "Omniscient Gaze",
        description: "See optimal solutions to all problems instantly",
        rarity: "Legendary",
        type: "intelligence",
        weight: 4,
      },
      {
        name: "Reality Hacker",
        description: "Manipulate the laws of learning and knowledge acquisition",
        rarity: "Legendary",
        type: "intelligence",
        weight: 4,
      },

      // Strength Legendary Skills
      {
        name: "Titan's Might",
        description: "Strength activities have a chance to complete quests instantly",
        rarity: "Legendary",
        type: "strength",
        weight: 4,
      },
      {
        name: "Olympian Power",
        description: "Strength gains are increased by 25%",
        rarity: "Legendary",
        type: "strength",
        weight: 4,
      },
      {
        name: "Limitless Potential",
        description: "Break through all physical limitations and plateaus",
        rarity: "Legendary",
        type: "strength",
        weight: 4,
      },
      {
        name: "Divine Physique",
        description: "Achieve perfect physical form with supernatural abilities",
        rarity: "Legendary",
        type: "strength",
        weight: 4,
      },
      {
        name: "Eternal Vigor",
        description: "Never experience fatigue or physical limitations",
        rarity: "Legendary",
        type: "strength",
        weight: 4,
      },
      {
        name: "World Shaker",
        description: "Physical activities affect the environment around you",
        rarity: "Legendary",
        type: "strength",
        weight: 4,
      },

      // Mana Legendary Skills
      {
        name: "Ethereal Connection",
        description: "Mana activities have a chance to restore all stats",
        rarity: "Legendary",
        type: "mana",
        weight: 4,
      },
      {
        name: "Astral Projection",
        description: "Mana gains are increased by 25%",
        rarity: "Legendary",
        type: "mana",
        weight: 4,
      },
      {
        name: "Soul Resonance",
        description: "Connect with universal energy for infinite mana potential",
        rarity: "Legendary",
        type: "mana",
        weight: 4,
      },
      {
        name: "Dimensional Gateway",
        description: "Access higher planes of existence for spiritual growth",
        rarity: "Legendary",
        type: "mana",
        weight: 4,
      },
      {
        name: "Cosmic Harmony",
        description: "Align with universal forces for perfect balance",
        rarity: "Legendary",
        type: "mana",
        weight: 4,
      },
      {
        name: "Void Walker",
        description: "Transcend physical limitations through spiritual mastery",
        rarity: "Legendary",
        type: "mana",
        weight: 4,
      },

      // ===== MYTHIC SKILLS (1% chance) =====

      {
        name: "Omniscience",
        description: "Gain all stats from any activity",
        rarity: "Mythic",
        type: "intelligence",
        weight: 1,
      },
      {
        name: "Godlike Power",
        description: "All stat gains are increased by 50%",
        rarity: "Mythic",
        type: "strength",
        weight: 1,
      },
      {
        name: "Transcendence",
        description: "XP gain is doubled for all activities",
        rarity: "Mythic",
        type: "mana",
        weight: 1,
      },
      {
        name: "Reality Weaver",
        description: "Reshape reality itself through pure will and determination",
        rarity: "Mythic",
        type: "intelligence",
        weight: 1,
      },
      {
        name: "Infinite Existence",
        description: "Exist beyond mortal limitations, all activities become effortless",
        rarity: "Mythic",
        type: "strength",
        weight: 1,
      },
      {
        name: "Universal Consciousness",
        description: "Become one with the universe, achieving perfect enlightenment",
        rarity: "Mythic",
        type: "mana",
        weight: 1,
      },
      {
        name: "Eternal Champion",
        description: "Master of all domains, every action becomes legendary",
        rarity: "Mythic",
        type: "intelligence",
        weight: 1,
      },
      {
        name: "Primordial Force",
        description: "Wield the fundamental forces that created existence itself",
        rarity: "Mythic",
        type: "strength",
        weight: 1,
      },
      {
        name: "Absolute Serenity",
        description: "Achieve perfect peace that transcends all understanding",
        rarity: "Mythic",
        type: "mana",
        weight: 1,
      },
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

    // Create a weighted selection based on rarity
    const totalWeight = availableToUnlock.reduce((sum, skill) => sum + skill.weight, 0)
    let randomWeight = Math.random() * totalWeight
    let selectedSkill = availableToUnlock[0]

    for (const skill of availableToUnlock) {
      randomWeight -= skill.weight
      if (randomWeight <= 0) {
        selectedSkill = skill
        break
      }
    }

    // Add to user's unlocked skills
    user.unlockedSkills.push(selectedSkill)

    // Deduct a skill point
    user.skillPoints -= 1

    // Save updated user data
    users[currentUser] = user
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    // Update state
    setUserData(user)
    setUnlockedSkill(selectedSkill)
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
                      onComplete={handleOrbAnimationComplete}
                      unlockedSkill={unlockedSkill}
                      disabled={userData.skillPoints <= 0}
                      isMobile={isMobile}
                      onReset={resetSkillOrb}
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
