"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Dumbbell, Sparkles } from "lucide-react"
import { ActivityVerification } from "@/components/activity-verification"

interface ActivityFormProps {
  onSubmit: (activity: any) => void
  compact?: boolean
}

export function ActivityForm({ onSubmit, compact = false }: ActivityFormProps) {
  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
    type: "strength",
    value: 1,
  })
  const [showVerification, setShowVerification] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!activityData.name) return

    // Show verification dialog
    setShowVerification(true)
  }

  const handleVerified = (verified: boolean) => {
    if (verified) {
      // Submit the activity
      onSubmit(activityData)

      // Reset form
      setActivityData({
        name: "",
        description: "",
        type: activityData.type,
        value: 1,
      })
    }

    // Close verification dialog
    setShowVerification(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setActivityData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setActivityData((prev) => ({ ...prev, type: value }))
  }

  const handleValueChange = (value: number[]) => {
    setActivityData((prev) => ({ ...prev, value: value[0] }))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Activity Name</Label>
          <Input
            id="name"
            name="name"
            placeholder={
              activityData.type === "strength"
                ? "e.g., 30 min run, 20 pushups..."
                : activityData.type === "intelligence"
                  ? "e.g., 1 hour study, book reading..."
                  : "e.g., 15 min meditation, journaling..."
            }
            value={activityData.name}
            onChange={handleInputChange}
            className="bg-slate-700/50 border-slate-600 text-white"
          />
        </div>

        {!compact && (
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add more details about your activity..."
              value={activityData.description}
              onChange={handleInputChange}
              className="bg-slate-700/50 border-slate-600 text-white min-h-[80px]"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Activity Type</Label>
          <RadioGroup value={activityData.type} onValueChange={handleTypeChange} className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center">
              <RadioGroupItem value="strength" id="activity-strength" className="sr-only" />
              <Label
                htmlFor="activity-strength"
                className={`px-3 py-2 w-full flex flex-col items-center gap-1 rounded-md cursor-pointer ${
                  activityData.type === "strength"
                    ? "bg-red-900/50 border border-red-500"
                    : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                }`}
              >
                <Dumbbell className="h-5 w-5 text-red-400" />
                <span>Strength</span>
              </Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="intelligence" id="activity-intelligence" className="sr-only" />
              <Label
                htmlFor="activity-intelligence"
                className={`px-3 py-2 w-full flex flex-col items-center gap-1 rounded-md cursor-pointer ${
                  activityData.type === "intelligence"
                    ? "bg-blue-900/50 border border-blue-500"
                    : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                }`}
              >
                <Brain className="h-5 w-5 text-blue-400" />
                <span>Intelligence</span>
              </Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="mana" id="activity-mana" className="sr-only" />
              <Label
                htmlFor="activity-mana"
                className={`px-3 py-2 w-full flex flex-col items-center gap-1 rounded-md cursor-pointer ${
                  activityData.type === "mana"
                    ? "bg-purple-900/50 border border-purple-500"
                    : "bg-slate-700 border border-slate-600 hover:bg-slate-600"
                }`}
              >
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span>Mana</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Value: {activityData.value}</Label>
            <span className="text-sm font-medium">+{activityData.value * 5} XP</span>
          </div>
          <Slider value={[activityData.value]} min={1} max={10} step={1} onValueChange={handleValueChange} />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        <Button
          type="submit"
          className={`w-full ${
            activityData.type === "strength"
              ? "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700"
              : activityData.type === "intelligence"
                ? "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700"
                : "bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700"
          }`}
        >
          Log Activity
        </Button>
      </form>

      <ActivityVerification
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        activityData={activityData}
        onVerify={handleVerified}
      />
    </>
  )
}
