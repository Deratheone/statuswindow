"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Dumbbell, Sparkles } from "lucide-react"

interface ProgressChartProps {
  userData: any
  detailed?: boolean
}

export function ProgressChart({ userData, detailed = false }: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !userData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw background
    ctx.fillStyle = "rgba(30, 41, 59, 0.5)"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding + (chartWidth / 5) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.lineWidth = 2

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (chartHeight / 5) * i
      const value = (i * 20).toString()
      ctx.fillText(value, padding - 20, y + 4)
    }

    // X-axis labels (time periods)
    const periods = ["Past", "Current", "Goal"]
    for (let i = 0; i < periods.length; i++) {
      const x = padding + (chartWidth / 2) * i
      ctx.fillText(periods[i], x, height - padding + 20)
    }

    // Draw data
    const drawBar = (x: number, height: number, color: string, label: string) => {
      const barWidth = 30

      // Draw bar
      ctx.fillStyle = color
      const y = canvas.height - padding - height
      ctx.fillRect(x - barWidth / 2, y, barWidth, height)

      // Draw value on top of bar
      ctx.fillStyle = "white"
      ctx.fillText(label, x, y - 10)
    }

    // Calculate bar positions
    const strengthX = padding + chartWidth / 4
    const intelligenceX = padding + chartWidth / 2
    const manaX = padding + (chartWidth / 4) * 3

    // Calculate bar heights (scaled to chart height)
    const scaleValue = (value: number) => (value / 100) * chartHeight

    const strengthHeight = scaleValue(userData.stats.strength)
    const intelligenceHeight = scaleValue(userData.stats.intelligence)
    const manaHeight = scaleValue(userData.stats.mana)

    // Draw bars
    drawBar(strengthX, strengthHeight, "rgba(239, 68, 68, 0.7)", userData.stats.strength.toString())
    drawBar(intelligenceX, intelligenceHeight, "rgba(59, 130, 246, 0.7)", userData.stats.intelligence.toString())
    drawBar(manaX, manaHeight, "rgba(168, 85, 247, 0.7)", userData.stats.mana.toString())

    // Draw legend
    const legendY = padding + 20
    const legendSpacing = 100

    // Strength
    ctx.fillStyle = "rgba(239, 68, 68, 0.7)"
    ctx.fillRect(padding, legendY, 15, 15)
    ctx.fillStyle = "white"
    ctx.textAlign = "left"
    ctx.fillText("Strength", padding + 25, legendY + 12)

    // Intelligence
    ctx.fillStyle = "rgba(59, 130, 246, 0.7)"
    ctx.fillRect(padding + legendSpacing, legendY, 15, 15)
    ctx.fillStyle = "white"
    ctx.fillText("Intelligence", padding + legendSpacing + 25, legendY + 12)

    // Mana
    ctx.fillStyle = "rgba(168, 85, 247, 0.7)"
    ctx.fillRect(padding + legendSpacing * 2, legendY, 15, 15)
    ctx.fillStyle = "white"
    ctx.fillText("Mana", padding + legendSpacing * 2 + 25, legendY + 12)
  }, [userData])

  return (
    <div className="space-y-4">
      {!detailed && (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 rounded-md bg-slate-700/50 border border-slate-600">
            <Dumbbell className="h-5 w-5 text-red-400" />
            <div>
              <div className="text-sm text-gray-400">Strength</div>
              <div className="text-lg font-bold">{userData.stats.strength}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-md bg-slate-700/50 border border-slate-600">
            <Brain className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-sm text-gray-400">Intelligence</div>
              <div className="text-lg font-bold">{userData.stats.intelligence}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-md bg-slate-700/50 border border-slate-600">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <div>
              <div className="text-sm text-gray-400">Mana</div>
              <div className="text-lg font-bold">{userData.stats.mana}</div>
            </div>
          </div>
        </div>
      )}

      <div className="relative aspect-video w-full">
        <canvas ref={canvasRef} width={800} height={400} className="w-full h-full rounded-md" />
      </div>

      {detailed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="border-red-500/30 bg-slate-800/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="h-5 w-5 text-red-400" />
                <h3 className="font-medium">Strength</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2">Physical activities that build your body and endurance.</p>
              <div className="text-2xl font-bold text-red-400">{userData.stats.strength}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-slate-800/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <h3 className="font-medium">Intelligence</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2">Mental activities that expand your knowledge and skills.</p>
              <div className="text-2xl font-bold text-blue-400">{userData.stats.intelligence}</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <h3 className="font-medium">Mana</h3>
              </div>
              <p className="text-sm text-gray-400 mb-2">Mindfulness activities that nurture your mental wellbeing.</p>
              <div className="text-2xl font-bold text-purple-400">{userData.stats.mana}</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
