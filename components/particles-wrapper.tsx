"use client"

import dynamic from "next/dynamic"

// Import the particles component with no SSR
const DynamicParticles = dynamic(() => import("./particles-background").then((mod) => mod.ParticlesBackground), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10" />,
})

export function ParticlesWrapper() {
  return <DynamicParticles />
}
