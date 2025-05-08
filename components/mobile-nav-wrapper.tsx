"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Dynamically import the MobileNavDrawer component
const MobileNavDrawer = dynamic(() => import("@/components/mobile-nav-drawer").then((mod) => mod.MobileNavDrawer), {
  ssr: false,
  loading: () => null, // Remove the loading UI that shows a duplicate menu icon
})

interface MobileNavWrapperProps {
  open: boolean
  onClose: () => void
  onSettings: () => void
  onLogout: () => void
  userData: any
}

export function MobileNavWrapper({ open, onClose, onSettings, onLogout, userData }: MobileNavWrapperProps) {
  // Add state to control component mounting
  const [mounted, setMounted] = useState(false)

  // Only mount the component when it's needed
  useEffect(() => {
    if (open) {
      setMounted(true)
    } else {
      // Delay unmounting to allow for exit animations
      const timer = setTimeout(() => {
        setMounted(false)
      }, 500) // Match this with your animation duration

      return () => clearTimeout(timer)
    }
  }, [open])

  // Only render when mounted or open
  if (!mounted && !open) return null

  return (
    <MobileNavDrawer open={open} onClose={onClose} onSettings={onSettings} onLogout={onLogout} userData={userData} />
  )
}
