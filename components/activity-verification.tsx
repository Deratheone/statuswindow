"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Check, Dumbbell, Sparkles, X } from "lucide-react"

interface ActivityVerificationProps {
  activity: {
    name: string
    description: string
    type: "strength" | "intelligence" | "mana"
    value: number
  }
  onComplete: (verified: boolean) => void
}

export function ActivityVerification({ activity, onComplete }: ActivityVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      onComplete(true)
      setIsVerifying(false)
    }, 1000)
  }

  const handleCancel = () => {
    onComplete(false)
  }

  return (
    <Card className="border-blue-800/50 bg-blue-900/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-blue-100">Verify Activity</CardTitle>
        <CardDescription className="text-blue-300">
          Please confirm that you completed this activity honestly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-md bg-blue-900/50 border border-blue-800/50">
          {activity.type === "strength" && <Dumbbell className="h-5 w-5 text-red-400" />}
          {activity.type === "intelligence" && <Brain className="h-5 w-5 text-blue-400" />}
          {activity.type === "mana" && <Sparkles className="h-5 w-5 text-purple-400" />}
          <div>
            <div className="font-medium text-blue-100">{activity.name}</div>
            {activity.description && <div className="text-sm text-blue-300 mt-1">{activity.description}</div>}
          </div>
          <div className="ml-auto text-sm font-bold text-yellow-400">
            +{activity.value} {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </div>
        </div>

        <div className="text-center text-blue-300 text-sm">
          <p>By confirming, you agree that you have completed this activity.</p>
          <p>Honesty is key to meaningful personal growth!</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel} className="border-blue-700 text-blue-100">
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button onClick={handleVerify} disabled={isVerifying} className="bg-green-600 hover:bg-green-700">
          <Check className="mr-2 h-4 w-4" />
          {isVerifying ? "Verifying..." : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  )
}
