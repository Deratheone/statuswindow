import type React from "react"
import "../globals.css"
import "./skills.css"

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
