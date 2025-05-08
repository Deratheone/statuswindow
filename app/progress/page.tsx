"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function ProgressPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
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

      setUserData(user)
      setLoading(false)
    } catch (error) {
      console.error("Error loading user data:", error)
      router.push("/dashboard")
    }
  }, [router])

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
          <Link
            href="/dashboard"
            className="text-white flex items-center gap-2 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-400" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
            StatusWindow
          </h1>
        </div>
        <div></div>
      </nav>

      <div className="container mx-auto px-2 py-4 sm:p-4">
        <Card className="border-blue-800/50 bg-blue-900/20 backdrop-blur-sm shadow-[0_0_15px_rgba(30,64,175,0.3)]">
          <CardHeader>
            <CardTitle className="text-blue-100 mobile-text-container">Progress Analytics</CardTitle>
            <CardDescription className="text-blue-300 mobile-text-container">
              Track your growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 sm:p-4 text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2 mobile-text-container">Stats Overview</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
                <div className="bg-blue-900/30 p-2 sm:p-4 rounded-lg border border-blue-800/50">
                  <div className="text-red-400 font-medium text-sm sm:text-base">Strength</div>
                  <div className="text-xl sm:text-2xl font-bold mt-1">{userData?.stats?.strength || 0}</div>
                </div>
                <div className="bg-blue-900/30 p-2 sm:p-4 rounded-lg border border-blue-800/50">
                  <div className="text-blue-400 font-medium text-sm sm:text-base">Intelligence</div>
                  <div className="text-xl sm:text-2xl font-bold mt-1">{userData?.stats?.intelligence || 0}</div>
                </div>
                <div className="bg-blue-900/30 p-2 sm:p-4 rounded-lg border border-blue-800/50">
                  <div className="text-purple-400 font-medium text-sm sm:text-base">Mana</div>
                  <div className="text-xl sm:text-2xl font-bold mt-1">{userData?.stats?.mana || 0}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-800/50 bg-blue-900/20 backdrop-blur-sm shadow-[0_0_15px_rgba(30,64,175,0.3)]">
            <CardHeader>
              <CardTitle className="text-blue-100">Level Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg">Current Level</div>
                  <div className="text-2xl font-bold text-yellow-400">{userData?.level || 1}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>XP Progress</span>
                    <span>
                      {userData?.xp || 0}/{userData?.xpToNextLevel || 100} XP
                    </span>
                  </div>
                  <div className="h-2 bg-blue-900/50 rounded-full border border-blue-800">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, ((userData?.xp || 0) / (userData?.xpToNextLevel || 100)) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-blue-300">
                  {Math.floor(((userData?.xp || 0) / (userData?.xpToNextLevel || 100)) * 100)}% to Level{" "}
                  {(userData?.level || 1) + 1}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-800/50 bg-blue-900/20 backdrop-blur-sm shadow-[0_0_15px_rgba(30,64,175,0.3)]">
            <CardHeader>
              <CardTitle className="text-blue-100">Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg">Total Activities</div>
                  <div className="text-2xl font-bold text-green-400">{userData?.activities?.length || 0}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-900/30 p-3 rounded-md border border-blue-800/50">
                    <div className="text-sm text-red-400">Strength</div>
                    <div className="text-xl font-bold">
                      {userData?.activities?.filter((a: any) => a.type === "strength").length || 0}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-md border border-blue-800/50">
                    <div className="text-sm text-blue-400">Intelligence</div>
                    <div className="text-xl font-bold">
                      {userData?.activities?.filter((a: any) => a.type === "intelligence").length || 0}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-md border border-blue-800/50">
                    <div className="text-sm text-purple-400">Mana</div>
                    <div className="text-xl font-bold">
                      {userData?.activities?.filter((a: any) => a.type === "mana").length || 0}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
