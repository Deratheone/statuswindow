// Quest generator functions

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15)
}

// Generate a random number between min and max
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Quest templates
const questTemplates = {
  strength: [
    {
      title: "Workout Warrior",
      description: "Complete a series of physical workouts to build your strength.",
      targetRange: [3, 7],
      rewardRange: [5, 10],
      xpRewardRange: [50, 100],
    },
    {
      title: "Endurance Challenge",
      description: "Push your physical limits with endurance activities.",
      targetRange: [2, 5],
      rewardRange: [7, 12],
      xpRewardRange: [70, 120],
    },
    {
      title: "Strength Training",
      description: "Build muscle and improve your physical capabilities.",
      targetRange: [4, 8],
      rewardRange: [6, 11],
      xpRewardRange: [60, 110],
    },
  ],
  intelligence: [
    {
      title: "Knowledge Seeker",
      description: "Expand your mind through learning and study.",
      targetRange: [3, 7],
      rewardRange: [5, 10],
      xpRewardRange: [50, 100],
    },
    {
      title: "Book Worm",
      description: "Read and absorb new information to increase your intelligence.",
      targetRange: [2, 5],
      rewardRange: [7, 12],
      xpRewardRange: [70, 120],
    },
    {
      title: "Mental Challenge",
      description: "Solve problems and puzzles to sharpen your mind.",
      targetRange: [4, 8],
      rewardRange: [6, 11],
      xpRewardRange: [60, 110],
    },
  ],
  mana: [
    {
      title: "Inner Peace",
      description: "Practice mindfulness and meditation to restore your mana.",
      targetRange: [3, 7],
      rewardRange: [5, 10],
      xpRewardRange: [50, 100],
    },
    {
      title: "Self-Care Ritual",
      description: "Take time for self-care activities to rejuvenate your spirit.",
      targetRange: [2, 5],
      rewardRange: [7, 12],
      xpRewardRange: [70, 120],
    },
    {
      title: "Spiritual Growth",
      description: "Engage in activities that nurture your spiritual well-being.",
      targetRange: [4, 8],
      rewardRange: [6, 11],
      xpRewardRange: [60, 110],
    },
  ],
}

// Generate a quest based on type and user level
const generateQuest = (type: "strength" | "intelligence" | "mana", userLevel: number) => {
  const templates = questTemplates[type]
  const template = templates[Math.floor(Math.random() * templates.length)]

  // Scale difficulty based on user level
  const levelMultiplier = 1 + (userLevel - 1) * 0.2 // 20% increase per level

  const target = Math.round(randomNumber(template.targetRange[0], template.targetRange[1]) * levelMultiplier)
  const reward = Math.round(randomNumber(template.rewardRange[0], template.rewardRange[1]) * levelMultiplier)
  const xpReward = Math.round(randomNumber(template.xpRewardRange[0], template.xpRewardRange[1]) * levelMultiplier)

  return {
    id: generateId(),
    title: template.title,
    description: template.description,
    type,
    target,
    progress: 0,
    reward,
    xpReward,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}

// Generate default quests for a new user
export const generateDefaultQuests = (userData: any) => {
  const userLevel = userData.level || 1
  const quests = []

  // Generate 2 quests for each stat type
  for (let i = 0; i < 2; i++) {
    quests.push(generateQuest("strength", userLevel))
    quests.push(generateQuest("intelligence", userLevel))
    quests.push(generateQuest("mana", userLevel))
  }

  return quests
}
