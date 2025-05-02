"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Award, Brain, ChevronRight, Dumbbell, LogOut, Plus, Settings, Sparkles, Trophy } from "lucide-react"
import { StatusWindow } from "@/components/status-window"
import { ActivityForm } from "@/components/activity-form"
import { QuestBoard } from "@/components/quest-board"
import { ProgressChart } from "@/components/progress-chart"
import { generateDefaultQuests } from "@/lib/quest-generator"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    // Get user data
    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) {
      router.push("/login")
      return
    }

    // Check if user has quests, if not, generate default quests
    if (!user.quests || user.quests.length === 0) {
      user.quests = generateDefaultQuests(user)
      users[currentUser] = user
      localStorage.setItem("statusWindowUsers", JSON.stringify(users))
    }

    setUserData(user)

    // Get recent activities (last 5)
    const activities = user.activities || []
    setRecentActivities(activities.slice(-5).reverse())

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("statusWindowCurrentUser")
    router.push("/login")
  }

  const handleActivitySubmit = (activity: any) => {
    if (!userData) return

    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    // Add activity to user data
    const activities = user.activities || []
    const newActivity = {
      ...activity,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    }

    activities.push(newActivity)
    user.activities = activities

    // Update stats based on activity
    const statType = activity.type
    const statValue = activity.value

    user.stats[statType] += statValue

    // Add XP
    user.xp += statValue * 5

    // Check for level up
    if (user.xp >= user.xpToNextLevel) {
      user.level += 1
      user.xp = user.xp - user.xpToNextLevel
      user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.5)
    }

    // Update quests progress
    user.quests = user.quests.map((quest: any) => {
      if (quest.completed) return quest

      if (quest.type === statType) {
        const newProgress = quest.progress + statValue
        const completed = newProgress >= quest.target

        if (completed) {
          // Award bonus for completing quest
          user.stats[statType] += quest.reward
          user.xp += quest.xpReward
        }

        return {
          ...quest,
          progress: newProgress,
          completed,
        }
      }

      return quest
    })

    // Save updated user data
    users[currentUser] = user
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    // Update state
    setUserData(user)
    setRecentActivities([newActivity, ...recentActivities].slice(0, 5))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 text-white">
      {/* Navigation */}
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-white flex items-center gap-2 hover:text-purple-400 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-400" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
            StatusWindow
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-2 py-4 sm:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Status Window */}
          <div className="lg:col-span-1">
            <StatusWindow userData={userData} />

            <Card className="mt-6 border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivities.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-700/50">
                        {activity.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400 flex-shrink-0" />}
                        {activity.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400 flex-shrink-0" />}
                        {activity.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{activity.name}</div>
                          <div className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</div>
                        </div>
                        <div className="text-sm font-bold whitespace-nowrap">
                          +{activity.value} {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    No activities yet. Start logging to see your progress!
                  </div>
                )}

                <Link href="/activities">
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
                  >
                    View All Activities
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="dashboard">
              <TabsList className="bg-slate-800/70 border border-purple-500/30 flex flex-wrap h-auto">
                <TabsTrigger value="dashboard" className="flex-1 py-2">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="quests" className="flex-1 py-2">
                  Quests
                </TabsTrigger>
                <TabsTrigger value="log-activity" className="flex-1 py-2">
                  Log
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex-1 py-2">
                  Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-400" />
                        Active Quests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {userData.quests && userData.quests.filter((q: any) => !q.completed).length > 0 ? (
                        <div className="space-y-3">
                          {userData.quests
                            .filter((quest: any) => !quest.completed)
                            .slice(0, 3)
                            .map((quest: any) => (
                              <div key={quest.id} className="p-3 rounded-md bg-slate-700/50">
                                <div className="font-medium">{quest.title}</div>
                                <div className="text-sm text-gray-400 mt-1">{quest.description}</div>
                                <div className="mt-2 space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>
                                      {quest.progress}/{quest.target}
                                    </span>
                                  </div>
                                  <div className="h-1.5 bg-gray-700 rounded-full">
                                    <div
                                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-300"
                                      style={{ width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-yellow-400">
                                  Reward: +{quest.reward} {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)}, +
                                  {quest.xpReward} XP
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 py-4">
                          No active quests. Check the Quest Board for new challenges!
                        </div>
                      )}

                      <Link href="/quests">
                        <Button
                          variant="outline"
                          className="w-full mt-4 border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
                        >
                          View All Quests
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="h-5 w-5 text-green-400" />
                        Quick Add Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ActivityForm onSubmit={handleActivitySubmit} compact />
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2 border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        Stats Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ProgressChart userData={userData} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quests" className="mt-6">
                <QuestBoard userData={userData} />
              </TabsContent>

              <TabsContent value="log-activity" className="mt-6">
                <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <CardHeader>
                    <CardTitle>Log New Activity</CardTitle>
                    <CardDescription className="text-gray-400">
                      Record your activities to gain XP and improve your stats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityForm onSubmit={handleActivitySubmit} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <CardHeader>
                    <CardTitle>Progress Analytics</CardTitle>
                    <CardDescription className="text-gray-400">Track your growth over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProgressChart userData={userData} detailed />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
