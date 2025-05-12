"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Brain, Dumbbell, Sparkles } from "lucide-react"

interface ActivityVerificationProps {
  isOpen: boolean
  onClose: () => void
  activityData: any
  onVerify: (verified: boolean) => void
}

export function ActivityVerification({ isOpen, onClose, activityData, onVerify }: ActivityVerificationProps) {
  const [verificationText, setVerificationText] = useState("")
  const [error, setError] = useState("")

  const getVerificationQuestion = () => {
    switch (activityData.type) {
      case "strength":
        return "Please describe what physical activity you did and how it challenged you:"
      case "intelligence":
        return "Please describe what you learned or how this activity improved your knowledge:"
      case "mana":
        return "Please describe how this activity improved your mental well-being or creativity:"
      default:
        return "Please verify that you completed this activity:"
    }
  }

  const handleVerify = () => {
    if (verificationText.length < 10) {
      setError("Please provide a more detailed response (at least 10 characters)")
      return
    }

    onVerify(true)
    setVerificationText("")
    setError("")
  }

  const handleCancel = () => {
    onVerify(false)
    setVerificationText("")
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {activityData.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400" />}
            {activityData.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400" />}
            {activityData.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400" />}
            Verify Activity
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            To ensure accurate tracking, please verify that you completed this activity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="bg-slate-700/50 p-3 rounded-md border border-slate-600">
            <div className="font-medium text-lg">{activityData.name}</div>
            {activityData.description && <div className="text-slate-300 mt-1">{activityData.description}</div>}
            <div className="mt-2 text-sm text-yellow-400">
              +{activityData.value} {activityData.type.charAt(0).toUpperCase() + activityData.type.slice(1)}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="verification" className="text-sm font-medium text-slate-200">
              {getVerificationQuestion()}
            </label>
            <Textarea
              id="verification"
              value={verificationText}
              onChange={(e) => {
                setVerificationText(e.target.value)
                if (e.target.value.length >= 10) {
                  setError("")
                }
              }}
              placeholder="Type your verification here..."
              className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            className={`w-full sm:w-auto ${
              activityData.type === "strength"
                ? "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700"
                : activityData.type === "intelligence"
                  ? "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700"
                  : "bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700"
            }`}
          >
            Verify & Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
