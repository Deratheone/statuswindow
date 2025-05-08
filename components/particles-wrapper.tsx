"use client"

import dynamic from "next/dynamic"

// Dynamically import the ParticlesBackground component
const ParticlesBackground = dynamic(
  () => import("@/components/particles-background").then((mod) => mod.ParticlesBackground),
  {
    ssr: false,
  },
)

export function ParticlesWrapper() {
  return <ParticlesBackground />
}
