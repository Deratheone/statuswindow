"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Brain, Dumbbell, Sparkles } from "lucide-react"

interface ActivityVerificationProps {
  isOpen: boolean
  onClose: () => void
  activityData: {
    name: string
    description?: string
    type: string
    value: number
    startTime?: string
    endTime?: string
  }
  onVerify: (verified: boolean) => void
}

export function ActivityVerification({ isOpen, onClose, activityData, onVerify }: ActivityVerificationProps) {
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Generate verification question based on activity type
  const getVerificationQuestion = () => {
    const { type, name } = activityData

    if (type === "strength") {
      return {
        question: `Please describe briefly how you completed "${name}":`,
        type: "textarea",
        options: [],
      }
    } else if (type === "intelligence") {
      return {
        question: `What was the main thing you learned from "${name}"?`,
        type: "textarea",
        options: [],
      }
    } else {
      // Mana
      return {
        question: `How did "${name}" help improve your mental wellbeing?`,
        type: "textarea",
        options: [],
      }
    }
  }

  const verification = getVerificationQuestion()

  const handleVerify = () => {
    if (!answer.trim()) {
      setIsCorrect(false)
      return
    }

    // For textarea questions, any non-empty answer is considered valid
    if (verification.type === "textarea" && answer.trim().length > 10) {
      setIsCorrect(true)
      onVerify(true)
    } else if (verification.type === "radio" && answer) {
      setIsCorrect(true)
      onVerify(true)
    } else {
      setIsCorrect(false)
    }
  }

  const handleClose = () => {
    setAnswer("")
    setIsCorrect(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 text-white border-purple-500/30 max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {activityData.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400" />}
            {activityData.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400" />}
            {activityData.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400" />}
            <span className="truncate">Verify Activity: {activityData.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-gray-300">{verification.question}</p>

          {verification.type === "textarea" && (
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="bg-slate-700/50 border-slate-600 text-white"
              rows={4}
            />
          )}

          {verification.type === "radio" && (
            <RadioGroup value={answer} onValueChange={setAnswer} className="space-y-2">
              {verification.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {isCorrect === false && (
            <div className="text-red-400 text-sm">
              Please provide a more detailed response (at least 10 characters).
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="border-gray-600 text-gray-300">
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            className={`${
              activityData.type === "strength"
                ? "bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700"
                : activityData.type === "intelligence"
                  ? "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700"
                  : "bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700"
            }`}
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
