"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Brain, Dumbbell, Sparkles } from "lucide-react"
import { ActivityVerification } from "@/components/activity-verification"

interface ActivityFormProps {
  onSubmit: (activity: any) => void
  compact?: boolean
}

export function ActivityForm({ onSubmit, compact = false }: ActivityFormProps) {
  const [activityName, setActivityName] = useState("")
  const [activityDescription, setActivityDescription] = useState("")
  const [activityType, setActivityType] = useState<"strength" | "intelligence" | "mana">("strength")
  const [activityValue, setActivityValue] = useState(1)
  const [showVerification, setShowVerification] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  // Reset form error when inputs change
  useEffect(() => {
    if (formError) setFormError("")
  }, [activityName, activityDescription, activityType, activityValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!activityName.trim()) {
      setFormError("Please enter an activity name")
      return
    }

    // Show verification step
    setShowVerification(true)
  }

  const handleVerificationComplete = (verified: boolean) => {
    if (verified) {
      setIsSubmitting(true)

      // Submit the activity
      onSubmit({
        name: activityName,
        description: activityDescription,
        type: activityType,
        value: activityValue,
      })

      // Reset form
      setActivityName("")
      setActivityDescription("")
      setActivityType("strength")
      setActivityValue(1)
      setIsSubmitting(false)
    }

    // Close verification
    setShowVerification(false)
  }

  if (showVerification) {
    return (
      <ActivityVerification
        activity={{
          name: activityName,
          description: activityDescription,
          type: activityType,
          value: activityValue,
        }}
        onComplete={handleVerificationComplete}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="activity-name" className="text-blue-100">
          Activity Name
        </Label>
        <Input
          id="activity-name"
          placeholder="What did you accomplish?"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className="bg-blue-900/30 border-blue-700 text-blue-100 placeholder:text-blue-400/50"
        />
      </div>

      {!compact && (
        <div>
          <Label htmlFor="activity-description" className="text-blue-100">
            Description (Optional)
          </Label>
          <Textarea
            id="activity-description"
            placeholder="Add more details about your activity..."
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            className="bg-blue-900/30 border-blue-700 text-blue-100 placeholder:text-blue-400/50 min-h-[80px]"
          />
        </div>
      )}

      <div>
        <Label className="text-blue-100">Activity Type</Label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <Button
            type="button"
            variant={activityType === "strength" ? "default" : "outline"}
            className={`flex flex-col items-center py-3 ${
              activityType === "strength"
                ? "bg-gradient-to-r from-red-700 to-red-600 border-red-500"
                : "bg-blue-900/30 border-blue-700 text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActivityType("strength")}
          >
            <Dumbbell className={`h-5 w-5 ${activityType === "strength" ? "text-white" : "text-red-400"}`} />
            <span className="mt-1 text-xs">Strength</span>
          </Button>
          <Button
            type="button"
            variant={activityType === "intelligence" ? "default" : "outline"}
            className={`flex flex-col items-center py-3 ${
              activityType === "intelligence"
                ? "bg-gradient-to-r from-blue-700 to-blue-600 border-blue-500"
                : "bg-blue-900/30 border-blue-700 text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActivityType("intelligence")}
          >
            <Brain className={`h-5 w-5 ${activityType === "intelligence" ? "text-white" : "text-blue-400"}`} />
            <span className="mt-1 text-xs">Intelligence</span>
          </Button>
          <Button
            type="button"
            variant={activityType === "mana" ? "default" : "outline"}
            className={`flex flex-col items-center py-3 ${
              activityType === "mana"
                ? "bg-gradient-to-r from-purple-700 to-purple-600 border-purple-500"
                : "bg-blue-900/30 border-blue-700 text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActivityType("mana")}
          >
            <Sparkles className={`h-5 w-5 ${activityType === "mana" ? "text-white" : "text-purple-400"}`} />
            <span className="mt-1 text-xs">Mana</span>
          </Button>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <Label className="text-blue-100">Value: {activityValue}</Label>
          <span className="text-sm text-blue-300">+{activityValue * 5} XP</span>
        </div>
        <Slider
          value={[activityValue]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => setActivityValue(value[0])}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-blue-400">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      {formError && <div className="text-red-400 text-sm">{formError}</div>}

      <Button
        type="submit"
        className={`w-full ${
          activityType === "strength"
            ? "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700"
            : activityType === "intelligence"
              ? "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700"
              : "bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging..." : "Log Activity"}
      </Button>
    </form>
  )
}
