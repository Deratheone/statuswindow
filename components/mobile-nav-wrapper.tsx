"use client"

import dynamic from "next/dynamic"
import { Menu } from "lucide-react"

// Dynamically import the MobileNavDrawer component
const MobileNavDrawer = dynamic(() => import("@/components/mobile-nav-drawer").then((mod) => mod.MobileNavDrawer), {
  ssr: false,
  loading: () => (
    <div className="h-12 w-12 flex items-center justify-center">
      <Menu className="h-6 w-6" />
    </div>
  ),
})

interface MobileNavWrapperProps {
  open: boolean
  onClose: () => void
  onSettings: () => void
  onLogout: () => void
  userData: any
}

export function MobileNavWrapper({ open, onClose, onSettings, onLogout, userData }: MobileNavWrapperProps) {
  return (
    <MobileNavDrawer open={open} onClose={onClose} onSettings={onSettings} onLogout={onLogout} userData={userData} />
  )
}
