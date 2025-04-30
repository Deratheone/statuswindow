"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Check, Dumbbell, RefreshCw, Sparkles } from "lucide-react"
import { generateDefaultQuests } from "@/lib/quest-generator"
import { useToast } from "@/hooks/use-toast"

interface QuestBoardProps {
  userData: any
  filter?: "active" | "completed" | "all"
}

export function QuestBoard({ userData, filter = "all" }: QuestBoardProps) {
  const { toast } = useToast()
  const [quests, setQuests] = useState<any[]>([])

  useEffect(() => {
    if (!userData) return

    // Filter quests based on the filter prop
    let filteredQuests = userData.quests || []

    if (filter === "active") {
      filteredQuests = filteredQuests.filter((quest: any) => !quest.completed)
    } else if (filter === "completed") {
      filteredQuests = filteredQuests.filter((quest: any) => quest.completed)
    }

    setQuests(filteredQuests)
  }, [userData, filter])

  const handleRefreshQuests = () => {
    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    // Generate new quests
    const newQuests = generateDefaultQuests(user)

    // Keep completed quests
    const completedQuests = user.quests.filter((quest: any) => quest.completed)

    user.quests = [...completedQuests, ...newQuests]

    // Save updated user data
    users[currentUser] = user
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    // Update state
    setQuests(newQuests)

    toast({
      title: "Quests Refreshed",
      description: "New quests have been added to your board",
    })
  }

  if (quests.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-xl mb-4 text-gray-400">
          {filter === "active"
            ? "No active quests"
            : filter === "completed"
              ? "No completed quests"
              : "No quests available"}
        </div>
        {filter === "active" && (
          <Button
            onClick={handleRefreshQuests}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Quests
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {filter === "active" && (
        <div className="flex justify-end">
          <Button
            onClick={handleRefreshQuests}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Quests
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {quests.map((quest) => (
          <Card
            key={quest.id}
            className={`border-${quest.type === "strength" ? "red" : quest.type === "intelligence" ? "blue" : "purple"}-500/30 bg-slate-800/70 backdrop-blur-sm`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {quest.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400" />}
                {quest.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400" />}
                {quest.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400" />}
                {quest.title}
                {quest.completed && (
                  <span className="ml-auto flex items-center text-green-400 text-sm font-normal">
                    <Check className="h-4 w-4 mr-1" /> Completed
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">{quest.description}</p>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {quest.progress}/{quest.target}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      quest.type === "strength"
                        ? "bg-gradient-to-r from-red-600 to-red-500"
                        : quest.type === "intelligence"
                          ? "bg-gradient-to-r from-blue-600 to-blue-500"
                          : "bg-gradient-to-r from-purple-600 to-purple-500"
                    }`}
                    style={{ width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm">
                <span className="text-yellow-400">Reward: </span>
                <span>
                  +{quest.reward} {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)}, +{quest.xpReward} XP
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
