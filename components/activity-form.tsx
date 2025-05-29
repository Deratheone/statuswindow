"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Brain, Dumbbell, Sparkles, Clock } from "lucide-react"
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
    value: 5,
    startTime: "",
    endTime: "",
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
        value: 5,
        startTime: "",
        endTime: "",
      })
    }

    // Close verification dialog
    setShowVerification(false)
  }

  // Set current time for start time if empty
  const handleStartTimeNow = () => {
    const now = new Date()
    const timeString = now.toTimeString().substring(0, 5)
    setActivityData({ ...activityData, startTime: timeString })
  }

  // Set current time for end time if empty
  const handleEndTimeNow = () => {
    const now = new Date()
    const timeString = now.toTimeString().substring(0, 5)
    setActivityData({ ...activityData, endTime: timeString })
  }

  // Prevent swipe events from propagating when interacting with the slider
  const handleSliderTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="activity-name" className="text-sm sm:text-base">
            Activity Name*
          </Label>
          <Input
            id="activity-name"
            placeholder={
              activityData.type === "strength"
                ? "e.g., 30 min run, 20 pushups..."
                : activityData.type === "intelligence"
                  ? "e.g., 1 hour study, book reading..."
                  : "e.g., 15 min meditation, journaling..."
            }
            value={activityData.name}
            onChange={(e) => setActivityData({ ...activityData, name: e.target.value })}
            className="bg-slate-700/50 border-slate-600 text-white text-sm sm:text-base"
            required
          />
        </div>

        {!compact && (
          <div className="space-y-2">
            <Label htmlFor="activity-description" className="text-sm sm:text-base">
              Description (Optional)
            </Label>
            <Textarea
              id="activity-description"
              placeholder="Add details about your activity..."
              value={activityData.description}
              onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
              className="bg-slate-700/50 border-slate-600 text-white text-sm sm:text-base min-h-[80px] max-h-[120px]"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Activity Type</Label>
          <RadioGroup
            value={activityData.type}
            onValueChange={(value) => setActivityData({ ...activityData, type: value })}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          >
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
                <span className="text-sm sm:text-base">Strength</span>
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
                <span className="text-sm sm:text-base">Intelligence</span>
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
                <span className="text-sm sm:text-base">Mana</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {!compact && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm sm:text-base">Activity Value</Label>
                <span className="text-sm font-medium">
                  +{activityData.value} {activityData.type.charAt(0).toUpperCase() + activityData.type.slice(1)}
                </span>
              </div>
              <div
                onTouchStart={handleSliderTouchStart}
                onTouchMove={(e) => e.stopPropagation()}
                className="touch-none"
              >
                <Slider
                  value={[activityData.value]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={(value) => setActivityData({ ...activityData, value: value[0] })}
                  className="touch-none"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Small Activity</span>
                <span>Major Achievement</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-sm sm:text-base">
                  Start Time
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="start-time"
                    type="time"
                    value={activityData.startTime}
                    onChange={(e) => setActivityData({ ...activityData, startTime: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white text-sm sm:text-base"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleStartTimeNow}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 min-w-[44px] min-h-[44px]"
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time" className="text-sm sm:text-base">
                  End Time
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="end-time"
                    type="time"
                    value={activityData.endTime}
                    onChange={(e) => setActivityData({ ...activityData, endTime: e.target.value })}
                    className="bg-slate-700/50 border-slate-600 text-white text-sm sm:text-base"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleEndTimeNow}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 min-w-[44px] min-h-[44px]"
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        <Button
          type="submit"
          className={`w-full mobile-touch-target text-sm sm:text-base ${
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
