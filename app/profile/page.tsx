"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Avatar options
const avatarOptions = ["🧙‍♂️", "🧙‍♀️", "🦸‍♂️", "🦸‍♀️", "🧝‍♂️", "🧝‍♀️", "🧚‍♂️", "🧚‍♀️", "👨‍🚀", "👩‍🚀"]

// Class options
const classOptions = [
  { value: "warrior", label: "Warrior", description: "Focus on physical strength and endurance" },
  { value: "sage", label: "Sage", description: "Master of knowledge and learning" },
  { value: "mystic", label: "Mystic", description: "Balanced in mind, body, and spirit" },
  { value: "adventurer", label: "Adventurer", description: "Jack of all trades, adaptable to any challenge" },
]

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    characterName: "",
    avatar: "",
    characterClass: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  })

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
    setFormData({
      characterName: user.characterName || "",
      avatar: user.avatar || "🧙‍♂️",
      characterClass: user.characterClass || "mystic",
      password: "",
      newPassword: "",
      confirmPassword: "",
    })

    setLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.characterName) {
      toast({
        title: "Error",
        description: "Character name is required",
        variant: "destructive",
      })
      return
    }

    // Check if changing password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "New passwords do not match",
          variant: "destructive",
        })
        return
      }

      if (!formData.password) {
        toast({
          title: "Error",
          description: "Current password is required to change password",
          variant: "destructive",
        })
        return
      }

      if (formData.password !== userData.password) {
        toast({
          title: "Error",
          description: "Current password is incorrect",
          variant: "destructive",
        })
        return
      }
    }

    // Update user data
    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    if (!currentUser) return

    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const user = users[currentUser]

    if (!user) return

    user.characterName = formData.characterName
    user.avatar = formData.avatar
    user.characterClass = formData.characterClass

    if (formData.newPassword) {
      user.password = formData.newPassword
    }

    // Save updated user data
    users[currentUser] = user
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    toast({
      title: "Success",
      description: "Profile updated successfully",
    })

    // Update state
    setUserData(user)
    setFormData({
      ...formData,
      password: "",
      newPassword: "",
      confirmPassword: "",
    })
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
        <Card className="w-full max-w-[95%] sm:max-w-2xl mx-auto border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription className="text-gray-400">Update your character information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="characterName">Character Name</Label>
                <Input
                  id="characterName"
                  name="characterName"
                  value={formData.characterName}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Choose Your Avatar</Label>
                <div className="grid grid-cols-5 gap-1 sm:gap-2">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar })}
                      className={`text-2xl h-12 w-12 flex items-center justify-center rounded-md ${
                        formData.avatar === avatar
                          ? "bg-purple-600 border-2 border-purple-400"
                          : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Choose Your Class</Label>
                <RadioGroup
                  value={formData.characterClass}
                  onValueChange={(value) => setFormData({ ...formData, characterClass: value })}
                  className="space-y-2"
                >
                  {classOptions.map((option) => (
                    <div key={option.value} className="flex items-start space-x-2 p-2 rounded-md hover:bg-slate-700/50">
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                      <div className="grid gap-1">
                        <Label htmlFor={option.value} className="font-medium">
                          {option.label}
                        </Label>
                        <p className="text-sm text-gray-400">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Current Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
