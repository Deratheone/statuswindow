// Update the onboarding page to use more fantasy-themed language and a more engaging UI
// Replace the entire component with this enhanced version

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Brain, Dumbbell, Sparkles, Shield, Book, Feather } from "lucide-react"
import { AvatarUpload } from "@/components/avatar-upload"

// Avatar options
const avatarOptions = ["🧙‍♂️", "🧙‍♀️", "🦸‍♂️", "🦸‍♀️", "🧝‍♂️", "🧝‍♀️", "🧚‍♂️", "🧚‍♀️", "👨‍🚀", "👩‍🚀"]

// Class options
const classOptions = [
  {
    value: "warrior",
    label: "Warrior",
    description: "Masters of physical prowess, warriors excel in strength and endurance",
    icon: Shield,
  },
  {
    value: "sage",
    label: "Sage",
    description: "Seekers of knowledge and wisdom, sages harness the power of intellect",
    icon: Book,
  },
  {
    value: "mystic",
    label: "Mystic",
    description: "Balanced in mind, body, and spirit, mystics find harmony in all aspects of life",
    icon: Sparkles,
  },
  {
    value: "adventurer",
    label: "Adventurer",
    description: "Versatile and adaptable, adventurers are prepared for any challenge",
    icon: Feather,
  },
]

// Activity options
const strengthActivities = [
  { id: "cardio", label: "Cardio/Running" },
  { id: "weights", label: "Weight Training" },
  { id: "sports", label: "Team Sports" },
  { id: "yoga", label: "Yoga/Flexibility" },
  { id: "other", label: "Other Physical Activities" },
]

const intelligenceActivities = [
  { id: "reading", label: "Reading Books/Articles" },
  { id: "courses", label: "Taking Courses" },
  { id: "writing", label: "Writing/Creating Content" },
  { id: "puzzles", label: "Problem-solving Games/Puzzles" },
  { id: "skills", label: "Learning New Skills" },
]

const manaActivities = [
  { id: "meditation", label: "Meditation" },
  { id: "journaling", label: "Journaling" },
  { id: "sleep", label: "Proper Sleep Routine" },
  { id: "stress", label: "Stress Management Techniques" },
  { id: "social", label: "Social Connection" },
]

// Strength goals
const strengthGoals = [
  { id: "muscle", label: "Build muscle/strength" },
  { id: "endurance", label: "Improve endurance" },
  { id: "flexibility", label: "Enhance flexibility" },
  { id: "weight", label: "Lose weight" },
  { id: "maintain", label: "Maintain current fitness" },
]

// Intelligence goals
const intelligenceGoals = [
  { id: "academic", label: "Academic success" },
  { id: "professional", label: "Professional development" },
  { id: "creative", label: "Creative skills" },
  { id: "language", label: "Language learning" },
  { id: "general", label: "General knowledge" },
]

// Mana goals
const manaGoals = [
  { id: "stress", label: "Reduce stress/anxiety" },
  { id: "focus", label: "Improve focus/concentration" },
  { id: "creativity", label: "Enhance creativity" },
  { id: "emotional", label: "Better emotional balance" },
  { id: "sleep", label: "Improved sleep" },
]

// Obstacles
const obstacleOptions = [
  { id: "time", label: "Lack of time" },
  { id: "procrastination", label: "Inconsistency/procrastination" },
  { id: "energy", label: "Lack of energy" },
  { id: "knowledge", label: "Lack of knowledge" },
  { id: "motivation", label: "Low motivation" },
  { id: "external", label: "External circumstances" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic info
    username: "",
    password: "",
    characterName: "",
    avatar: "🧙‍♂️",
    characterClass: "mystic",

    // Strength
    strengthLevel: 3,
    strengthFrequency: "occasionally",
    strengthActivities: [] as string[],
    strengthGoals: [] as string[],
    strengthGoalsOther: "",

    // Intelligence
    intelligenceLevel: 3,
    intelligenceFrequency: "occasionally",
    intelligenceActivities: [] as string[],
    intelligenceGoals: [] as string[],
    intelligenceGoalsOther: "",

    // Mana
    manaLevel: 3,
    manaFrequency: "occasionally",
    manaActivities: [] as string[],
    manaGoals: [] as string[],
    manaGoalsOther: "",

    // Additional
    dailyTime: "30-60min",
    preferredTime: "evening",
    difficultyPreference: "moderate",
    motivation: "achievement",
    obstacles: [] as string[],
    obstaclesOther: "",
  })

  // Calculate stats in real-time based on form data
  const [calculatedStats, setCalculatedStats] = useState({
    strength: 5,
    intelligence: 5,
    mana: 5,
    level: 1,
  })

  // Update calculated stats whenever form data changes
  useEffect(() => {
    // Convert frequency to points
    const frequencyPoints = {
      never: 1,
      rarely: 2,
      occasionally: 3,
      regularly: 4,
      daily: 5,
    }

    // Calculate base stats
    let strength = 5 + frequencyPoints[formData.strengthFrequency as keyof typeof frequencyPoints]
    let intelligence = 5 + frequencyPoints[formData.intelligenceFrequency as keyof typeof frequencyPoints]
    let mana = 5 + frequencyPoints[formData.manaFrequency as keyof typeof frequencyPoints]

    // Add points for activities
    strength += Math.min(5, formData.strengthActivities.length)
    intelligence += Math.min(5, formData.intelligenceActivities.length)
    mana += Math.min(5, formData.manaActivities.length)

    // Add points for self-assessment level
    strength += formData.strengthLevel - 3
    intelligence += formData.intelligenceLevel - 3
    mana += formData.manaLevel - 3

    // Class bonuses
    if (formData.characterClass === "warrior") strength += 3
    if (formData.characterClass === "sage") intelligence += 3
    if (formData.characterClass === "mystic") mana += 3
    if (formData.characterClass === "adventurer") {
      strength += 1
      intelligence += 1
      mana += 1
    }

    // Ensure minimum of 5 and maximum of 20 for starting stats
    strength = Math.max(5, Math.min(20, strength))
    intelligence = Math.max(5, Math.min(20, intelligence))
    mana = Math.max(5, Math.min(20, mana))

    // Calculate level
    const level = Math.floor((strength + intelligence + mana) / 9)

    setCalculatedStats({
      strength,
      intelligence,
      mana,
      level: Math.max(1, level),
    })
  }, [formData])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.username) newErrors.username = "A hero needs a username to be remembered in the scrolls"
      if (!formData.password) newErrors.password = "A secret password is required to protect your journey"
      if (!formData.characterName) newErrors.characterName = "Every legend begins with a name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = () => {
    // Calculate final stats based on questionnaire answers
    const baseStats = {
      strength: calculatedStats.strength,
      intelligence: calculatedStats.intelligence,
      mana: calculatedStats.mana,
    }

    // Create user data object
    const userData = {
      ...formData,
      stats: baseStats,
      level: calculatedStats.level,
      xp: 0,
      xpToNextLevel: 100,
      activities: [],
      quests: [],
      createdAt: new Date().toISOString(),
      password: formData.password, // Store password for login
    }

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    users[formData.username] = userData
    localStorage.setItem("statusWindowUsers", JSON.stringify(users))

    // Set as current user
    localStorage.setItem("statusWindowCurrentUser", formData.username)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    const fieldName = `${category}Activities` as keyof typeof formData
    const currentActivities = [...(formData[fieldName] as string[])]

    if (checked) {
      setFormData({
        ...formData,
        [fieldName]: [...currentActivities, value],
      })
    } else {
      setFormData({
        ...formData,
        [fieldName]: currentActivities.filter((activity) => activity !== value),
      })
    }
  }

  const handleGoalCheckboxChange = (category: string, value: string, checked: boolean) => {
    const fieldName = `${category}Goals` as keyof typeof formData
    const currentGoals = [...(formData[fieldName] as string[])]

    if (checked) {
      setFormData({
        ...formData,
        [fieldName]: [...currentGoals, value],
      })
    } else {
      setFormData({
        ...formData,
        [fieldName]: currentGoals.filter((goal) => goal !== value),
      })
    }
  }

  const handleObstacleCheckboxChange = (value: string, checked: boolean) => {
    const currentObstacles = [...formData.obstacles]

    if (checked) {
      setFormData({
        ...formData,
        obstacles: [...currentObstacles, value],
      })
    } else {
      setFormData({
        ...formData,
        obstacles: currentObstacles.filter((obstacle) => obstacle !== value),
      })
    }
  }

  // Get step title
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Character Creation"
      case 2:
        return "Strength Assessment"
      case 3:
        return "Intelligence Assessment"
      case 4:
        return "Mana Assessment"
      case 5:
        return "Time & Availability"
      case 6:
        return "Challenge & Motivation"
      case 7:
        return "Character Summary"
      default:
        return "Character Creation"
    }
  }

  // Get step description
  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Forge your identity in this realm"
      case 2:
        return "Assess your physical prowess"
      case 3:
        return "Measure your intellectual might"
      case 4:
        return "Evaluate your spiritual energy"
      case 5:
        return "Plan your quest schedule"
      case 6:
        return "Understand your motivations"
      case 7:
        return "Review your character sheet"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 flex flex-col items-center justify-center p-2 sm:p-4">
      <Link
        href="/"
        className="absolute top-4 left-4 text-white flex items-center gap-2 hover:text-purple-400 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Return to the Main Gate</span>
      </Link>

      <div className="w-full max-w-[95%] sm:max-w-2xl">
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
            <CardTitle className="text-center">{getStepTitle()}</CardTitle>
            <CardDescription className="text-center text-gray-400">{getStepDescription()}</CardDescription>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-4">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              ></div>
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Choose your username for the scrolls</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Enter a unique username"
                  />
                  {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Create a secret password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Enter a secure password"
                  />
                  {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="characterName">What name shall your hero be known by?</Label>
                  <Input
                    id="characterName"
                    name="characterName"
                    value={formData.characterName}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="Enter your character's name"
                  />
                  {errors.characterName && <p className="text-red-400 text-sm">{errors.characterName}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Choose Your Avatar</Label>
                  <div className="flex flex-col items-center">
                    <AvatarUpload
                      currentAvatar={formData.avatar}
                      onAvatarChange={(avatar) => setFormData({ ...formData, avatar })}
                      size="md"
                    />
                    <div className="mt-4 text-sm text-gray-400">Or select from preset avatars:</div>
                    <div className="grid grid-cols-5 gap-2 mt-2 w-full">
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
                </div>

                <div className="space-y-2">
                  <Label>Which path calls to you?</Label>
                  <RadioGroup
                    value={formData.characterClass}
                    onValueChange={(value) => setFormData({ ...formData, characterClass: value })}
                    className="space-y-2"
                  >
                    {classOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-start space-x-2 p-3 rounded-md hover:bg-slate-700/50 border border-slate-700 transition-colors"
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                        <div className="grid gap-1 flex-1">
                          <div className="flex items-center">
                            <option.icon
                              className={`h-5 w-5 mr-2 ${
                                option.value === "warrior"
                                  ? "text-red-400"
                                  : option.value === "sage"
                                    ? "text-blue-400"
                                    : option.value === "mystic"
                                      ? "text-purple-400"
                                      : "text-green-400"
                              }`}
                            />
                            <Label htmlFor={option.value} className="font-medium text-lg">
                              {option.label}
                            </Label>
                          </div>
                          <p className="text-sm text-gray-400">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Dumbbell className="h-6 w-6 text-red-400" />
                  <h3 className="text-xl font-bold">Strength Assessment</h3>
                </div>

                <div className="space-y-2">
                  <Label>How would you rate your current physical strength?</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Novice</span>
                    <Slider
                      value={[formData.strengthLevel]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) => setFormData({ ...formData, strengthLevel: value[0] })}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400">Master</span>
                  </div>
                  <div className="text-center text-sm text-gray-400 mt-1">Current: {formData.strengthLevel}/5</div>
                </div>

                <div className="space-y-2">
                  <Label>How often do you train your physical form?</Label>
                  <RadioGroup
                    value={formData.strengthFrequency}
                    onValueChange={(value) => setFormData({ ...formData, strengthFrequency: value })}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  >
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="never" id="strength-never" className="sr-only" />
                      <Label
                        htmlFor="strength-never"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.strengthFrequency === "never"
                            ? "bg-red-900/50 border border-red-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Never
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="rarely" id="strength-rarely" className="sr-only" />
                      <Label
                        htmlFor="strength-rarely"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.strengthFrequency === "rarely"
                            ? "bg-red-900/50 border border-red-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Rarely
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="occasionally" id="strength-occasionally" className="sr-only" />
                      <Label
                        htmlFor="strength-occasionally"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.strengthFrequency === "occasionally"
                            ? "bg-red-900/50 border border-red-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Occasionally
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="regularly" id="strength-regularly" className="sr-only" />
                      <Label
                        htmlFor="strength-regularly"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.strengthFrequency === "regularly"
                            ? "bg-red-900/50 border border-red-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Regularly
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="daily" id="strength-daily" className="sr-only" />
                      <Label
                        htmlFor="strength-daily"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.strengthFrequency === "daily"
                            ? "bg-red-900/50 border border-red-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Daily
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Select physical activities you currently practice:</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {strengthActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`strength-${activity.id}`}
                          checked={formData.strengthActivities.includes(activity.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("strength", activity.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`strength-${activity.id}`}>{activity.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What physical achievements do you seek?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {strengthGoals.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`strength-goal-${goal.id}`}
                          checked={formData.strengthGoals.includes(goal.id)}
                          onCheckedChange={(checked) =>
                            handleGoalCheckboxChange("strength", goal.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`strength-goal-${goal.id}`}>{goal.label}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Label htmlFor="strengthGoalsOther">Other goals (optional):</Label>
                    <Textarea
                      id="strengthGoalsOther"
                      name="strengthGoalsOther"
                      placeholder="Describe any other physical goals you have..."
                      value={formData.strengthGoalsOther}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-bold">Intelligence Assessment</h3>
                </div>

                <div className="space-y-2">
                  <Label>How would you rate your current intellectual pursuits?</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Novice</span>
                    <Slider
                      value={[formData.intelligenceLevel]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) => setFormData({ ...formData, intelligenceLevel: value[0] })}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400">Master</span>
                  </div>
                  <div className="text-center text-sm text-gray-400 mt-1">Current: {formData.intelligenceLevel}/5</div>
                </div>

                <div className="space-y-2">
                  <Label>How often do you actively learn new things?</Label>
                  <RadioGroup
                    value={formData.intelligenceFrequency}
                    onValueChange={(value) => setFormData({ ...formData, intelligenceFrequency: value })}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  >
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="never" id="intelligence-never" className="sr-only" />
                      <Label
                        htmlFor="intelligence-never"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.intelligenceFrequency === "never"
                            ? "bg-blue-900/50 border border-blue-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Never
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="rarely" id="intelligence-rarely" className="sr-only" />
                      <Label
                        htmlFor="intelligence-rarely"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.intelligenceFrequency === "rarely"
                            ? "bg-blue-900/50 border border-blue-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Rarely
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="occasionally" id="intelligence-occasionally" className="sr-only" />
                      <Label
                        htmlFor="intelligence-occasionally"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.intelligenceFrequency === "occasionally"
                            ? "bg-blue-900/50 border border-blue-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Occasionally
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="regularly" id="intelligence-regularly" className="sr-only" />
                      <Label
                        htmlFor="intelligence-regularly"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.intelligenceFrequency === "regularly"
                            ? "bg-blue-900/50 border border-blue-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Regularly
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="daily" id="intelligence-daily" className="sr-only" />
                      <Label
                        htmlFor="intelligence-daily"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.intelligenceFrequency === "daily"
                            ? "bg-blue-900/50 border border-blue-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Daily
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Select learning activities you currently practice:</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {intelligenceActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`intelligence-${activity.id}`}
                          checked={formData.intelligenceActivities.includes(activity.id)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("intelligence", activity.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`intelligence-${activity.id}`}>{activity.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What knowledge do you seek to gain?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {intelligenceGoals.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`intelligence-goal-${goal.id}`}
                          checked={formData.intelligenceGoals.includes(goal.id)}
                          onCheckedChange={(checked) =>
                            handleGoalCheckboxChange("intelligence", goal.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`intelligence-goal-${goal.id}`}>{goal.label}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Label htmlFor="intelligenceGoalsOther">Other goals (optional):</Label>
                    <Textarea
                      id="intelligenceGoalsOther"
                      name="intelligenceGoalsOther"
                      placeholder="Describe any other intellectual goals you have..."
                      value={formData.intelligenceGoalsOther}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-bold">Mana Assessment</h3>
                </div>

                <div className="space-y-2">
                  <Label>How would you rate your current mental equilibrium?</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Novice</span>
                    <Slider
                      value={[formData.manaLevel]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) => setFormData({ ...formData, manaLevel: value[0] })}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-400">Master</span>
                  </div>
                  <div className="text-center text-sm text-gray-400 mt-1">Current: {formData.manaLevel}/5</div>
                </div>

                <div className="space-y-2">
                  <Label>How often do you practice mindfulness or self-care?</Label>
                  <RadioGroup
                    value={formData.manaFrequency}
                    onValueChange={(value) => setFormData({ ...formData, manaFrequency: value })}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                  >
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="never" id="mana-never" className="sr-only" />
                      <Label
                        htmlFor="mana-never"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.manaFrequency === "never"
                            ? "bg-purple-900/50 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Never
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="rarely" id="mana-rarely" className="sr-only" />
                      <Label
                        htmlFor="mana-rarely"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.manaFrequency === "rarely"
                            ? "bg-purple-900/50 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Rarely
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="occasionally" id="mana-occasionally" className="sr-only" />
                      <Label
                        htmlFor="mana-occasionally"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.manaFrequency === "occasionally"
                            ? "bg-purple-900/50 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Occasionally
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="regularly" id="mana-regularly" className="sr-only" />
                      <Label
                        htmlFor="mana-regularly"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.manaFrequency === "regularly"
                            ? "bg-purple-900/50 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Regularly
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="daily" id="mana-daily" className="sr-only" />
                      <Label
                        htmlFor="mana-daily"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.manaFrequency === "daily"
                            ? "bg-purple-900/50 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Daily
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Select wellness activities you currently practice:</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {manaActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mana-${activity.id}`}
                          checked={formData.manaActivities.includes(activity.id)}
                          onCheckedChange={(checked) => handleCheckboxChange("mana", activity.id, checked as boolean)}
                        />
                        <Label htmlFor={`mana-${activity.id}`}>{activity.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What aspects of mental wellness do you wish to improve?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {manaGoals.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mana-goal-${goal.id}`}
                          checked={formData.manaGoals.includes(goal.id)}
                          onCheckedChange={(checked) => handleGoalCheckboxChange("mana", goal.id, checked as boolean)}
                        />
                        <Label htmlFor={`mana-goal-${goal.id}`}>{goal.label}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Label htmlFor="manaGoalsOther">Other goals (optional):</Label>
                    <Textarea
                      id="manaGoalsOther"
                      name="manaGoalsOther"
                      placeholder="Describe any other mental wellness goals you have..."
                      value={formData.manaGoalsOther}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold">Time & Availability</h3>
                </div>

                <div className="space-y-2">
                  <Label>How much time can you dedicate to self-improvement each day?</Label>
                  <RadioGroup
                    value={formData.dailyTime}
                    onValueChange={(value) => setFormData({ ...formData, dailyTime: value })}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="5-15min" id="time-5-15" className="sr-only" />
                      <Label
                        htmlFor="time-5-15"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.dailyTime === "5-15min"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        5-15 minutes
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="15-30min" id="time-15-30" className="sr-only" />
                      <Label
                        htmlFor="time-15-30"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.dailyTime === "15-30min"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        15-30 minutes
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="30-60min" id="time-30-60" className="sr-only" />
                      <Label
                        htmlFor="time-30-60"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.dailyTime === "30-60min"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        30-60 minutes
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="1h+" id="time-1h+" className="sr-only" />
                      <Label
                        htmlFor="time-1h+"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.dailyTime === "1h+"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        1+ hours
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>When is your power hour for completing quests?</Label>
                  <RadioGroup
                    value={formData.preferredTime}
                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                  >
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="morning" id="time-morning" className="sr-only" />
                      <Label
                        htmlFor="time-morning"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.preferredTime === "morning"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Morning
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="afternoon" id="time-afternoon" className="sr-only" />
                      <Label
                        htmlFor="time-afternoon"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.preferredTime === "afternoon"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Afternoon
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="evening" id="time-evening" className="sr-only" />
                      <Label
                        htmlFor="time-evening"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.preferredTime === "evening"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Evening
                      </Label>
                    </div>
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="night" id="time-night" className="sr-only" />
                      <Label
                        htmlFor="time-night"
                        className={`px-3 py-2 w-full text-center text-sm rounded-md cursor-pointer ${
                          formData.preferredTime === "night"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        Night
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold">Challenge & Motivation</h3>
                </div>

                <div className="space-y-2">
                  <Label>What level of challenge motivates you best?</Label>
                  <RadioGroup
                    value={formData.difficultyPreference}
                    onValueChange={(value) => setFormData({ ...formData, difficultyPreference: value })}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex flex-col">
                      <RadioGroupItem value="easy" id="diff-easy" className="sr-only" />
                      <Label
                        htmlFor="diff-easy"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.difficultyPreference === "easy"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Easy</div>
                        <div className="text-xs text-gray-400">I need wins to build confidence</div>
                      </Label>
                    </div>
                    <div className="flex flex-col">
                      <RadioGroupItem value="moderate" id="diff-moderate" className="sr-only" />
                      <Label
                        htmlFor="diff-moderate"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.difficultyPreference === "moderate"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Moderate</div>
                        <div className="text-xs text-gray-400">Balanced challenge and achievement</div>
                      </Label>
                    </div>
                    <div className="flex flex-col">
                      <RadioGroupItem value="hard" id="diff-hard" className="sr-only" />
                      <Label
                        htmlFor="diff-hard"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.difficultyPreference === "hard"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Hard</div>
                        <div className="text-xs text-gray-400">I thrive under pressure</div>
                      </Label>
                    </div>
                    <div className="flex flex-col">
                      <RadioGroupItem value="variable" id="diff-variable" className="sr-only" />
                      <Label
                        htmlFor="diff-variable"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.difficultyPreference === "variable"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Variable</div>
                        <div className="text-xs text-gray-400">Mix of easy and hard challenges</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>What motivates you most?</Label>
                  <RadioGroup
                    value={formData.motivation}
                    onValueChange={(value) => setFormData({ ...formData, motivation: value })}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex flex-col">
                      <RadioGroupItem value="achievement" id="motiv-achievement" className="sr-only" />
                      <Label
                        htmlFor="motiv-achievement"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.motivation === "achievement"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Achievement</div>
                        <div className="text-xs text-gray-400">Completing goals and making progress</div>
                      </Label>
                    </div>
                    <div className="flex flex-col">
                      <RadioGroupItem value="competition" id="motiv-competition" className="sr-only" />
                      <Label
                        htmlFor="motiv-competition"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.motivation === "competition"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Competition</div>
                        <div className="text-xs text-gray-400">Outperforming others or yourself</div>
                      </Label>
                    </div>
                    <div className="flex flex-col">
                      <RadioGroupItem value="recognition" id="motiv-recognition" className="sr-only" />
                      <Label
                        htmlFor="motiv-recognition"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.motivation === "recognition"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Recognition</div>
                        <div className="text-xs text-gray-400">Acknowledgment of efforts and achievements</div>
                      </Label>
                    </div>
                    <div className="flex flex-col">
                      <RadioGroupItem value="improvement" id="motiv-improvement" className="sr-only" />
                      <Label
                        htmlFor="motiv-improvement"
                        className={`px-3 py-2 w-full text-sm rounded-md cursor-pointer ${
                          formData.motivation === "improvement"
                            ? "bg-slate-600 border border-purple-500"
                            : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                        }`}
                      >
                        <div className="font-medium">Self-improvement</div>
                        <div className="text-xs text-gray-400">Becoming better and growing as a person</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>What dragons currently block your path?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {obstacleOptions.map((obstacle) => (
                      <div key={obstacle.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`obstacle-${obstacle.id}`}
                          checked={formData.obstacles.includes(obstacle.id)}
                          onCheckedChange={(checked) => handleObstacleCheckboxChange(obstacle.id, checked as boolean)}
                        />
                        <Label htmlFor={`obstacle-${obstacle.id}`}>{obstacle.label}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Label htmlFor="obstaclesOther">Other obstacles (optional):</Label>
                    <Textarea
                      id="obstaclesOther"
                      name="obstaclesOther"
                      placeholder="Describe any other obstacles you face..."
                      value={formData.obstaclesOther}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold">Character Summary</h3>
                </div>

                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl overflow-hidden">
                      {formData.avatar && formData.avatar.startsWith("data:") ? (
                        <img
                          src={formData.avatar || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{formData.avatar}</span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{formData.characterName}</h2>
                      <div className="text-sm text-gray-400">
                        {formData.characterClass.charAt(0).toUpperCase() + formData.characterClass.slice(1)}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-400 text-sm font-medium">Level {calculatedStats.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Dumbbell className="h-4 w-4 text-red-400" /> Strength
                        </span>
                        <span className="text-red-400">{calculatedStats.strength}/100</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, calculatedStats.strength)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Brain className="h-4 w-4 text-blue-400" /> Intelligence
                        </span>
                        <span className="text-blue-400">{calculatedStats.intelligence}/100</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, calculatedStats.intelligence)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-purple-400" /> Mana
                        </span>
                        <span className="text-purple-400">{calculatedStats.mana}/100</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, calculatedStats.mana)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Character Traits</h4>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Class:</span>{" "}
                        {formData.characterClass.charAt(0).toUpperCase() + formData.characterClass.slice(1)}
                      </div>
                      <div>
                        <span className="text-gray-400">Preferred Time:</span>{" "}
                        {formData.preferredTime.charAt(0).toUpperCase() + formData.preferredTime.slice(1)}
                      </div>
                      <div>
                        <span className="text-gray-400">Daily Time:</span> {formData.dailyTime}
                      </div>
                      <div>
                        <span className="text-gray-400">Challenge Level:</span>{" "}
                        {formData.difficultyPreference.charAt(0).toUpperCase() + formData.difficultyPreference.slice(1)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Primary Motivation</h4>
                    <p className="text-sm">
                      {formData.motivation === "achievement" && "Completing goals and making progress"}
                      {formData.motivation === "competition" && "Outperforming others or yourself"}
                      {formData.motivation === "recognition" && "Acknowledgment of efforts and achievements"}
                      {formData.motivation === "improvement" && "Becoming better and growing as a person"}
                    </p>
                  </div>

                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Ready for Adventure</h4>
                    <p className="text-sm">
                      Your character has been created and is ready to begin the journey of self-improvement. Click
                      "Begin Adventure" to start your quest!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div></div>
            )}

            {step < 7 ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Begin Adventure
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
