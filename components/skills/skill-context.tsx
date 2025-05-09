"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type SkillType = "strength" | "intelligence" | "mana"

export interface Skill {
  id: SkillType
  name: string
  description: string
  level: number
  maxLevel: number
  color: string
  position: [number, number, number]
  unlocked: boolean
  icon: string
}

interface SkillContextType {
  skills: Skill[]
  selectedSkill: Skill | null
  setSelectedSkill: (skill: Skill | null) => void
  unlockSkill: (skillId: SkillType) => void
  skillPoints: number
  setSkillPoints: (points: number) => void
}

const SkillContext = createContext<SkillContextType | undefined>(undefined)

export function SkillProvider({ children }: { children: ReactNode }) {
  const [skillPoints, setSkillPoints] = useState(3)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "strength",
      name: "Strength",
      description: "Increases physical power and endurance",
      level: 0,
      maxLevel: 5,
      color: "#ff2e4d",
      position: [2, 0, 0],
      unlocked: false,
      icon: "💪",
    },
    {
      id: "intelligence",
      name: "Intelligence",
      description: "Enhances mental capacity and learning speed",
      level: 0,
      maxLevel: 5,
      color: "#4a90e2",
      position: [-1, 1.732, 0], // 120 degrees in radians
      unlocked: false,
      icon: "🧠",
    },
    {
      id: "mana",
      name: "Mana",
      description: "Expands spiritual energy and magical abilities",
      level: 0,
      maxLevel: 5,
      color: "#2ecc71",
      position: [-1, -1.732, 0], // 240 degrees in radians
      unlocked: false,
      icon: "✨",
    },
  ])

  const unlockSkill = (skillId: SkillType) => {
    if (skillPoints <= 0) return

    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId && skill.level < skill.maxLevel
          ? {
              ...skill,
              level: skill.level + 1,
              unlocked: true,
            }
          : skill,
      ),
    )

    setSkillPoints((prev) => prev - 1)
  }

  return (
    <SkillContext.Provider
      value={{
        skills,
        selectedSkill,
        setSelectedSkill,
        unlockSkill,
        skillPoints,
        setSkillPoints,
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
