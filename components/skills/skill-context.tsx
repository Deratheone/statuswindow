"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Skill {
  id: string
  name: string
  description: string
  icon: string
  color: string
  position: [number, number, number]
  unlocked: boolean
  level: number
  maxLevel: number
}

interface SkillContextType {
  skills: Skill[]
  selectedSkill: Skill | null
  setSelectedSkill: (skill: Skill | null) => void
  unlockSkill: (skillId: string) => void
  skillPoints: number
}

const SkillContext = createContext<SkillContextType | undefined>(undefined)

export function SkillProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "strength",
      name: "Strength",
      description: "Increases physical power and endurance. Each level adds 10% to strength gains.",
      icon: "💪",
      color: "#ff2e4d",
      position: [3, 1, 0],
      unlocked: false,
      level: 0,
      maxLevel: 5,
    },
    {
      id: "intelligence",
      name: "Intelligence",
      description: "Enhances learning speed and knowledge retention. Each level adds 10% to intelligence gains.",
      icon: "🧠",
      color: "#4a90e2",
      position: [-1.5, 2.5, 0],
      unlocked: false,
      level: 0,
      maxLevel: 5,
    },
    {
      id: "mana",
      name: "Mana",
      description: "Improves mental clarity and focus. Each level adds 10% to mana regeneration.",
      icon: "✨",
      color: "#2ecc71",
      position: [-1.5, -2.5, 0],
      unlocked: false,
      level: 0,
      maxLevel: 5,
    },
  ])
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [skillPoints, setSkillPoints] = useState(3)
  const [userData, setUserData] = useState<any>(null)

  // Load user data and sync skills
  useEffect(() => {
    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    setUserData(user)

    // Initialize skills in user data if they don't exist
    if (!user.skills) {
      user.skills = {
        strength: { unlocked: false, level: 0 },
        intelligence: { unlocked: false, level: 0 },
        mana: { unlocked: false, level: 0 },
        skillPoints: 3,
      }
      users[currentUser] = user
      localStorage.setItem("statusWindowUsers", JSON.stringify(users))
    }

    // Sync skills with user data
    setSkills((prevSkills) =>
      prevSkills.map((skill) => ({
        ...skill,
        unlocked: user.skills[skill.id]?.unlocked || false,
        level: user.skills[skill.id]?.level || 0,
      })),
    )

    // Set skill points
    setSkillPoints(user.skills.skillPoints || 3)
  }, [])

  // Unlock or level up a skill
  const unlockSkill = (skillId: string) => {
    if (skillPoints <= 0) return

    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    // Initialize skills if they don't exist
    if (!user.skills) {
      user.skills = {
        strength: { unlocked: false, level: 0 },
        intelligence: { unlocked: false, level: 0 },
        mana: { unlocked: false, level: 0 },
        skillPoints: 3,
      }
    }

    // Update skill in user data
    if (!user.skills[skillId]) {
      user.skills[skillId] = { unlocked: true, level: 1 }
    } else {
      user.skills[skillId].unlocked = true
      user.skills[skillId].level += 1
    }

    // Decrease skill points
    user.skills.skillPoints = (user.skills.skillPoints || 3) - 1

    // Save user data
    users[currentUser] = user
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    // Update local state
    setSkills((prevSkills) =>
      prevSkills.map((skill) => {
        if (skill.id === skillId) {
          return {
            ...skill,
            unlocked: true,
            level: skill.level + 1,
          }
        }
        return skill
      }),
    )
    setSkillPoints((prev) => prev - 1)

    // Update selected skill
    if (selectedSkill && selectedSkill.id === skillId) {
      setSelectedSkill({
        ...selectedSkill,
        unlocked: true,
        level: selectedSkill.level + 1,
      })
    }
  }

  return (
    <SkillContext.Provider
      value={{
        skills,
        selectedSkill,
        setSelectedSkill,
        unlockSkill,
        skillPoints,
      }}
    >
      {children}
    </SkillContext.Provider>
  )
}

export function useSkills() {
  const context = useContext(SkillContext)
  if (context === undefined) {
    throw new Error("useSkills must be used within a SkillProvider")
  }
  return context
}
