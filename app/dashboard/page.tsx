"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Brain, ChevronRight, Dumbbell, LogOut, Plus, Settings, Sparkles, Trophy, Menu } from "lucide-react"
import { StatusWindow } from "@/components/status-window"
import { ActivityForm } from "@/components/activity-form"
import { QuestBoard } from "@/components/quest-board"
import { ProgressChart } from "@/components/progress-chart"
import { InventorySystem } from "@/components/inventory-system"
import { generateDefaultQuests } from "@/lib/quest-generator"
import { playSFX } from "@/utils/audio"
import { useMobile } from "@/hooks/use-mobile"
import { useSwipe } from "@/hooks/use-swipe"
import { MobileNavWrapper } from "@/components/mobile-nav-wrapper"

export default function DashboardPage() {
  const isMobile = useMobile()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [systemMessage, setSystemMessage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Swipe handlers for tab navigation
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipeLeft: () => {
      // Navigate to next tab
      if (activeTab === "dashboard") setActiveTab("quests")
      else if (activeTab === "quests") setActiveTab("log-activity")
      else if (activeTab === "log-activity") navigateToProgress()
    },
    onSwipeRight: () => {
      // Navigate to previous tab
      if (activeTab === "log-activity") setActiveTab("quests")
      else if (activeTab === "quests") setActiveTab("dashboard")
      else if (activeTab === "progress") setActiveTab("log-activity")
    },
  })

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

    // Preload audio
    const audioFiles = ["xp-gain", "level-up", "stat-increase", "item-use"]
    audioFiles.forEach((file) => {
      const audio = new Audio(`/sfx/${file}.mp3`)
      audio.preload = "auto"
    })
  }, [])

  // Direct navigation function that uses window.location for reliability
  const navigateTo = (path: string, message: string) => {
    try {
      setSystemMessage(message)
      // Use direct window location navigation for reliability
      window.location.href = path
    } catch (error) {
      console.error("Navigation error:", error)
      setSystemMessage("Error navigating. Please try again.")
      setTimeout(() => setSystemMessage(null), 3000)
    }
  }

  const handleLogout = () => {
    try {
      setIsLoggingOut(true)
      setSystemMessage("Logging out...")
      localStorage.removeItem("statusWindowCurrentUser")
      // Use direct window location navigation for reliability
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
      setSystemMessage("Error logging out. Please try again.")
      setTimeout(() => setSystemMessage(null), 3000)
      setIsLoggingOut(false)
    }
  }

  const navigateToSettings = () => {
    navigateTo("/profile", "Opening settings...")
  }

  const navigateToQuests = () => {
    navigateTo("/quests", "Opening quests...")
  }

  const navigateToProgress = () => {
    navigateTo("/progress", "Opening progress...")
  }

  const navigateToActivities = () => {
    window.location.href = "/activities"
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
    const oldXP = user.xp
    user.xp += statValue * 5

    // Play XP gain sound
    playSFX("xp-gain")

    // Check for level up
    if (user.xp >= user.xpToNextLevel) {
      user.level += 1
      user.xp = user.xp - user.xpToNextLevel
      user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.5)

      // Show system message for level up
      setSystemMessage(`Congratulations! You've reached level ${user.level}!`)
      setTimeout(() => setSystemMessage(null), 5000)
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

          // Show system message for quest completion
          setSystemMessage(`Quest completed: ${quest.title}! Rewards claimed.`)
          setTimeout(() => setSystemMessage(null), 5000)
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

  const handleUseItem = (item: any) => {
    if (!userData) return

    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    // Apply item effects
    if (item.id === "potion-clarity") {
      user.stats.intelligence += Math.floor(user.stats.intelligence * 0.1)
      setSystemMessage("Potion of Clarity used! Intelligence temporarily increased by 10%.")
    } else if (item.id === "scroll-acceleration") {
      // This would be handled by the UI for video speed
      setSystemMessage("Scroll of Acceleration used! Video speed doubled for 30 minutes.")
    } else if (item.id === "potion-strength") {
      user.stats.strength += Math.floor(user.stats.strength * 0.15)
      setSystemMessage("Potion of Strength used! Strength temporarily increased by 15%.")
    }

    // Save updated user data
    users[currentUser] = user
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    // Update state
    setUserData(user)

    // Clear message after 5 seconds
    setTimeout(() => setSystemMessage(null), 5000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin"></div>
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* System message notification */}
      {systemMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-900/90 border-2 border-blue-700 px-4 py-2 rounded-md text-blue-100 shadow-lg max-w-[90%] sm:max-w-md text-center">
          {systemMessage}
        </div>
      )}

      {/* Navigation */}
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
              StatusWindow
            </h1>
          </div>
        </div>

        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-yellow-400 mobile-touch-target"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-400 relative"
              onClick={navigateToSettings}
              disabled={isNavigating}
              aria-label="Settings"
            >
              <Settings className={`h-5 w-5 ${isNavigating ? "animate-pulse" : ""}`} />
              <span className="absolute inset-0"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-yellow-400 relative"
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label="Logout"
            >
              <LogOut className={`h-5 w-5 ${isLoggingOut ? "animate-pulse" : ""}`} />
              <span className="absolute inset-0"></span>
            </Button>
          </div>
        )}

        {/* Mobile Navigation Drawer - Only render when needed */}
        {isMobile && userData && mobileNavOpen && (
          <MobileNavWrapper
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
            onSettings={navigateToSettings}
            onLogout={handleLogout}
            userData={userData}
          />
        )}
      </nav>

      <div className="container mx-auto px-2 py-4 sm:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Status Window */}
          <div className="lg:col-span-1">
            <StatusWindow userData={userData} />

            <div className="mt-4 flex flex-wrap sm:flex-nowrap justify-between gap-2">
              <InventorySystem userData={userData} onUseItem={handleUseItem} />

              {/* Fixed Quest Button - Now using onClick handler instead of Link */}
              <Button
                variant="outline"
                className="bg-blue-900/50 border-blue-700 text-blue-100 hover:bg-blue-800 hover:text-blue-50 w-full sm:w-auto mobile-touch-target"
                onClick={navigateToQuests}
                disabled={isNavigating}
              >
                <Award className="h-4 w-4 mr-2" />
                Quests
              </Button>
            </div>

            <Card className="mt-6 crystal-card border-blue-800/50 shadow-[0_0_15px_rgba(30,64,175,0.3)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-100">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivities.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-2 rounded-md bg-blue-900/30 border border-blue-800/50"
                      >
                        {activity.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400 flex-shrink-0" />}
                        {activity.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400 flex-shrink-0" />}
                        {activity.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate text-blue-100">{activity.name}</div>
                          <div className="text-xs text-blue-300 truncate">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm font-bold whitespace-nowrap text-yellow-400">
                          +{activity.value} {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-blue-300 py-4">
                    No activities yet. Start logging to see your progress!
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full mt-4 border-blue-700/50 text-blue-300 hover:bg-blue-900/50 mobile-touch-target"
                  onClick={navigateToActivities}
                >
                  View All Activities
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-blue-900/30 border border-blue-800/50 flex flex-wrap h-auto">
                <TabsTrigger
                  value="dashboard"
                  className="flex-1 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-800 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs sm:text-sm mobile-touch-target"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="quests"
                  className="flex-1 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-800 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs sm:text-sm mobile-touch-target"
                >
                  Quests
                </TabsTrigger>
                <TabsTrigger
                  value="log-activity"
                  className="flex-1 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-800 data-[state=active]:to-blue-700 data-[state=active]:text-white text-xs sm:text-sm mobile-touch-target"
                >
                  Log
                </TabsTrigger>
                <Button
                  variant="ghost"
                  className="flex-1 h-full py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-800/50 mobile-touch-target"
                  onClick={navigateToProgress}
                  disabled={isNavigating}
                >
                  <span className="w-full h-full flex items-center justify-center">Progress</span>
                </Button>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Card className="crystal-card border-blue-800/50 shadow-[0_0_15px_rgba(30,64,175,0.3)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2 text-blue-100">
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
                              <div key={quest.id} className="p-3 rounded-md bg-blue-900/30 border border-blue-800/50">
                                <div className="font-medium text-blue-100 truncate">{quest.title}</div>
                                <div className="text-sm text-blue-300 mt-1 line-clamp-2">{quest.description}</div>
                                <div className="mt-2 space-y-1">
                                  <div className="flex justify-between text-sm text-blue-200">
                                    <span>Progress</span>
                                    <span>
                                      {quest.progress}/{quest.target}
                                    </span>
                                  </div>
                                  <div className="h-1.5 bg-blue-900 rounded-full border border-blue-800">
                                    <div
                                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-300"
                                      style={{ width: `${Math.min(100, (quest.progress / quest.target) * 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-yellow-400 truncate">
                                  Reward: +{quest.reward} {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)}, +
                                  {quest.xpReward} XP
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center text-blue-300 py-4">
                          No active quests. Check the Quest Board for new challenges!
                        </div>
                      )}

                      <Button
                        variant="outline"
                        className="w-full mt-4 border-blue-700/50 text-blue-300 hover:bg-blue-900/50 mobile-touch-target"
                        onClick={navigateToQuests}
                        disabled={isNavigating}
                      >
                        View All Quests
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="crystal-card border-blue-800/50 shadow-[0_0_15px_rgba(30,64,175,0.3)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2 text-blue-100">
                        <Plus className="h-5 w-5 text-green-400" />
                        Quick Add Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ActivityForm onSubmit={handleActivitySubmit} compact />
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2 crystal-card border-blue-800/50 shadow-[0_0_15px_rgba(30,64,175,0.3)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2 text-blue-100">
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
                <Card className="crystal-card border-blue-800/50 shadow-[0_0_15px_rgba(30,64,175,0.3)]">
                  <CardHeader>
                    <CardTitle className="text-blue-100">Log New Activity</CardTitle>
                    <CardDescription className="text-blue-300">
                      Record your activities to gain XP and improve your stats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityForm onSubmit={handleActivitySubmit} />
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
