"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Award, Sparkles } from "lucide-react"
import { QuestBoard } from "@/components/quest-board"

export default function QuestsPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

    setUserData(user)
    setLoading(false)
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
        <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-400" />
              Quest Board
            </CardTitle>
            <CardDescription className="text-gray-400">
              Complete quests to earn rewards and level up faster
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="bg-slate-700/50 border border-slate-600 w-full">
                <TabsTrigger value="active">Active Quests</TabsTrigger>
                <TabsTrigger value="completed">Completed Quests</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <QuestBoard userData={userData} filter="active" />
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <QuestBoard userData={userData} filter="completed" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
