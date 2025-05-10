"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Brain, Check, Dumbbell, Sparkles, X } from "lucide-react"

interface ActivityVerificationProps {
  isOpen: boolean
  onClose: () => void
  activityData: {
    name: string
    description?: string
    type: string
    value: number
  }
  onVerify: (verified: boolean) => void
}

export function ActivityVerification({ isOpen, onClose, activityData, onVerify }: ActivityVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = () => {
    setIsVerifying(true)

    // Simulate verification delay
    setTimeout(() => {
      onVerify(true)
      setIsVerifying(false)
    }, 1000)
  }

  const handleCancel = () => {
    onVerify(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-100">Verify Activity</DialogTitle>
          <DialogDescription className="text-blue-300">
            Please confirm that you completed this activity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-3 rounded-md bg-slate-700/50 border border-slate-600">
            {activityData.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400 mt-0.5" />}
            {activityData.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400 mt-0.5" />}
            {activityData.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400 mt-0.5" />}
            <div className="flex-1">
              <div className="font-medium text-blue-100">{activityData.name}</div>
              {activityData.description && <div className="text-sm text-blue-300 mt-1">{activityData.description}</div>}
              <div className="mt-2 text-sm text-yellow-400">
                +{activityData.value} {activityData.type.charAt(0).toUpperCase() + activityData.type.slice(1)}, +
                {activityData.value * 5} XP
              </div>
            </div>
          </div>

          <div className="text-sm text-blue-300">
            By confirming, you certify that you have completed this activity in real life.
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={handleCancel}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white"
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                Verifying...
              </div>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirm Activity
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
