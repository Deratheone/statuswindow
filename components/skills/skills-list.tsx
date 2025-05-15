interface Skill {
  name: string
  description: string
  rarity: string
  type: string
}

interface SkillsListProps {
  skills: Skill[]
  compact?: boolean
}

export function SkillsList({ skills, compact = false }: SkillsListProps) {
  return (
    <div className={`space-y-${compact ? "2" : "4"}`}>
      {skills.map((skill, index) => (
        <div
          key={index}
          className={`p-${compact ? "2" : "4"} rounded-md border ${
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
          <div className={`font-bold mb-1 ${compact ? "text-sm" : "text-lg"}`}>{skill.name}</div>
          <div
            className={`text-xs mb-${compact ? "1" : "2"} ${
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
          <div className={`${compact ? "text-xs" : "text-sm"} text-gray-300`}>{skill.description}</div>
        </div>
      ))}
    </div>
  )
}
