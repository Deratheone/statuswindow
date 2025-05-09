import type React from "react"
import "./skills.css"

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
