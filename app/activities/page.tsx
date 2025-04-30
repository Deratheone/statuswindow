"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Brain, Dumbbell, Search, Sparkles } from "lucide-react"

export default function ActivitiesPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

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

    // Get activities
    const userActivities = user.activities || []
    setActivities(userActivities.reverse())

    setLoading(false)
  }, [router])

  const filteredActivities = activities.filter((activity) => {
    // Filter by type
    if (filter !== "all" && activity.type !== filter) {
      return false
    }

    // Filter by search
    if (search && !activity.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    return true
  })

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
            <CardTitle>Activity History</CardTitle>
            <CardDescription className="text-gray-400">View and filter your past activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search activities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="intelligence">Intelligence</SelectItem>
                  <SelectItem value="mana">Mana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredActivities.length > 0 ? (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-md bg-slate-700/50 border border-slate-600"
                  >
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-600">
                        {activity.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400" />}
                        {activity.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400" />}
                        {activity.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400" />}
                      </div>
                      <div className="flex-1 sm:hidden">
                        <div className="font-medium">{activity.name}</div>
                      </div>
                    </div>
                    <div className="flex-1 hidden sm:block">
                      <div className="font-medium">{activity.name}</div>
                      <div className="text-sm text-gray-400">{new Date(activity.timestamp).toLocaleString()}</div>
                    </div>
                    <div className="flex justify-between w-full sm:w-auto sm:text-right mt-2 sm:mt-0">
                      <div className="text-sm text-gray-400 sm:hidden">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                      <div>
                        <div className="font-bold">
                          +{activity.value} {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </div>
                        <div className="text-sm text-gray-400">+{activity.value * 5} XP</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                {search || filter !== "all" ? (
                  <div>
                    <div className="text-xl mb-2">No matching activities found</div>
                    <div>Try adjusting your filters</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xl mb-2">No activities yet</div>
                    <div>Start logging activities to see them here</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
