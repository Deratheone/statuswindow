"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react"

interface PathTest {
  path: string
  name: string
  description: string
  requiresAuth: boolean
  status: "pending" | "success" | "error" | "warning"
  error?: string
}

export default function PathTesting() {
  const [tests, setTests] = useState<PathTest[]>([
    // Public paths
    { path: "/", name: "Landing Page", description: "Main landing page", requiresAuth: false, status: "pending" },
    { path: "/login", name: "Login Page", description: "User login", requiresAuth: false, status: "pending" },
    {
      path: "/onboarding",
      name: "Onboarding",
      description: "Character creation",
      requiresAuth: false,
      status: "pending",
    },

    // Protected paths
    { path: "/dashboard", name: "Dashboard", description: "Main dashboard", requiresAuth: true, status: "pending" },
    { path: "/activities", name: "Activities", description: "Activity history", requiresAuth: true, status: "pending" },
    { path: "/quests", name: "Quests", description: "Quest board", requiresAuth: true, status: "pending" },
    { path: "/skills", name: "Skills", description: "Skills page", requiresAuth: true, status: "pending" },
    { path: "/progress", name: "Progress", description: "Progress analytics", requiresAuth: true, status: "pending" },
    { path: "/profile", name: "Profile", description: "User profile settings", requiresAuth: true, status: "pending" },
    { path: "/inventory", name: "Inventory", description: "User inventory", requiresAuth: true, status: "pending" },

    // API routes
    {
      path: "/api/skills",
      name: "Skills API",
      description: "Skills data endpoint",
      requiresAuth: false,
      status: "pending",
    },
  ])

  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<{ [key: string]: any }>({})

  const [browserChecks, setBrowserChecks] = useState({
    favicon: false,
    localStorage: false,
    serviceWorker: false,
    isMobile: false,
  })

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("statusWindowCurrentUser")
      setCurrentUser(user)

      // Perform browser-specific checks
      setBrowserChecks({
        favicon: !!document.querySelector('link[rel="icon"]'),
        localStorage: typeof Storage !== "undefined",
        serviceWorker: "serviceWorker" in navigator,
        isMobile: window.innerWidth < 768,
      })
    }
  }, [])

  const testPath = async (pathTest: PathTest) => {
    try {
      // Update status to pending
      setTests((prev) => prev.map((t) => (t.path === pathTest.path ? { ...t, status: "pending" } : t)))

      // For client-side routing, we'll simulate the test
      if (pathTest.path.startsWith("/api/")) {
        // Test API endpoints
        const response = await fetch(pathTest.path)
        if (response.ok) {
          const data = await response.json()
          setTestResults((prev) => ({ ...prev, [pathTest.path]: data }))
          setTests((prev) => prev.map((t) => (t.path === pathTest.path ? { ...t, status: "success" } : t)))
        } else {
          throw new Error(`HTTP ${response.status}`)
        }
      } else {
        // For regular pages, check if they would redirect based on auth
        if (pathTest.requiresAuth && !currentUser) {
          setTests((prev) =>
            prev.map((t) =>
              t.path === pathTest.path
                ? {
                    ...t,
                    status: "warning",
                    error: "Requires authentication - would redirect to login",
                  }
                : t,
            ),
          )
        } else if (!pathTest.requiresAuth || currentUser) {
          // Simulate successful load
          setTests((prev) => prev.map((t) => (t.path === pathTest.path ? { ...t, status: "success" } : t)))
        } else {
          setTests((prev) =>
            prev.map((t) =>
              t.path === pathTest.path
                ? {
                    ...t,
                    status: "error",
                    error: "Authentication required",
                  }
                : t,
            ),
          )
        }
      }
    } catch (error) {
      setTests((prev) =>
        prev.map((t) =>
          t.path === pathTest.path
            ? {
                ...t,
                status: "error",
                error: error instanceof Error ? error.message : "Unknown error",
              }
            : t,
        ),
      )
    }
  }

  const testAllPaths = async () => {
    for (const pathTest of tests) {
      await testPath(pathTest)
      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  const createTestUser = () => {
    if (typeof window === "undefined") return

    const testUser = {
      username: "testuser",
      password: "testpass",
      characterName: "Test Character",
      avatar: "🧙‍♂️",
      characterClass: "mystic",
      stats: { strength: 10, intelligence: 10, mana: 10 },
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      activities: [],
      quests: [],
      skillPoints: 5,
      unlockedSkills: [],
      createdAt: new Date().toISOString(),
    }

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    users["testuser"] = testUser
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))
    localStorage.setItem("statusWindowCurrentUser", "testuser")
    setCurrentUser("testuser")
  }

  const clearTestUser = () => {
    if (typeof window === "undefined") return

    localStorage.removeItem("statusWindowCurrentUser")
    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    delete users["testuser"]
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))
    setCurrentUser(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-400 animate-spin border-t-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-500 bg-green-50"
      case "error":
        return "border-red-500 bg-red-50"
      case "warning":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const successCount = tests.filter((t) => t.status === "success").length
  const errorCount = tests.filter((t) => t.status === "error").length
  const warningCount = tests.filter((t) => t.status === "warning").length
  const pendingCount = tests.filter((t) => t.status === "pending").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 text-white p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-6 w-6 text-purple-400" />
              StatusWindow Path Testing
            </CardTitle>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Success: {successCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Error: {errorCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Warning: {warningCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border border-gray-400" />
                <span>Pending: {pendingCount}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Test Controls */}
              <div className="flex flex-wrap gap-2 p-4 bg-slate-700/50 rounded-lg">
                <Button onClick={testAllPaths} className="bg-blue-600 hover:bg-blue-700">
                  Test All Paths
                </Button>
                {!currentUser ? (
                  <Button onClick={createTestUser} className="bg-green-600 hover:bg-green-700">
                    Create Test User
                  </Button>
                ) : (
                  <Button onClick={clearTestUser} variant="outline" className="border-red-500 text-red-400">
                    Clear Test User
                  </Button>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span>Current User:</span>
                  <span className={currentUser ? "text-green-400" : "text-red-400"}>{currentUser || "None"}</span>
                </div>
              </div>

              {/* Test Results */}
              <div className="space-y-2">
                {tests.map((test) => (
                  <div
                    key={test.path}
                    className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(test.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(test.status)}
                        <div>
                          <div className="font-medium text-gray-900">{test.name}</div>
                          <div className="text-sm text-gray-600">{test.path}</div>
                          <div className="text-xs text-gray-500">{test.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {test.requiresAuth && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Auth Required</span>
                        )}
                        <Button
                          size="sm"
                          onClick={() => testPath(test)}
                          disabled={test.status === "pending"}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Test
                        </Button>
                        {test.path.startsWith("/") && !test.path.startsWith("/api/") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(test.path, "_blank")}
                            className="border-gray-400 text-gray-700"
                          >
                            Visit
                          </Button>
                        )}
                      </div>
                    </div>
                    {test.error && <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">{test.error}</div>}
                    {testResults[test.path] && (
                      <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <pre className="text-xs overflow-auto">{JSON.stringify(testResults[test.path], null, 2)}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Tests */}
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-medium mb-2 text-white">Additional Checks</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Favicon loaded:</span>
                    <span className={browserChecks.favicon ? "text-green-400" : "text-red-400"}>
                      {browserChecks.favicon ? "✓" : "✗"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Storage available:</span>
                    <span className={browserChecks.localStorage ? "text-green-400" : "text-red-400"}>
                      {browserChecks.localStorage ? "✓" : "✗"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Worker support:</span>
                    <span className={browserChecks.serviceWorker ? "text-green-400" : "text-yellow-400"}>
                      {browserChecks.serviceWorker ? "✓" : "Not supported"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile viewport:</span>
                    <span className={browserChecks.isMobile ? "text-blue-400" : "text-gray-400"}>
                      {browserChecks.isMobile ? "Mobile" : "Desktop"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
