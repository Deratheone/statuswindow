"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored credentials on component mount
  useEffect(() => {
    const checkStoredCredentials = () => {
      const storedUser = localStorage.getItem("statusWindowRememberedUser")

      if (storedUser) {
        try {
          const { username, timestamp } = JSON.parse(storedUser)
          const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")

          // Check if the stored user exists and if the remember me hasn't expired (30 days)
          const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000
          const isValid = Date.now() - timestamp < thirtyDaysInMs

          if (isValid && users[username]) {
            // Auto login
            localStorage.setItem("statusWindowCurrentUser", username)
            router.push("/dashboard")
            return
          } else {
            // Clear invalid stored credentials
            localStorage.removeItem("statusWindowRememberedUser")
          }
        } catch (e) {
          localStorage.removeItem("statusWindowRememberedUser")
        }
      }

      setIsLoading(false)
    }

    checkStoredCredentials()
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")

    if (users[username] && users[username].password === password) {
      // Set current user
      localStorage.setItem("statusWindowCurrentUser", username)

      // Store credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem(
          "statusWindowRememberedUser",
          JSON.stringify({
            username,
            timestamp: Date.now(),
          }),
        )
      }

      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
            <p className="mt-4 text-white">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400">
              StatusWindow
            </h1>
          </div>
        </div>

        <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <CardHeader>
            <CardTitle className="text-center">Login to Your Account</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember-me" className="text-sm text-gray-300 cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-400">Don&apos;t have an account yet?</div>
            <Link href="/onboarding" className="w-full">
              <Button variant="outline" className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-900/20">
                Create New Character
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
