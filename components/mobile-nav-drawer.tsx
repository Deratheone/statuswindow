"use client"
import { motion } from "framer-motion"
import { X, Settings, LogOut, Brain, FileText, Gauge, Home, Package, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavDrawerProps {
  open: boolean
  onClose: () => void
  onSettings: () => void
  onLogout: () => void
  userData: any
}

export function MobileNavDrawer({ open, onClose, onSettings, onLogout, userData }: MobileNavDrawerProps) {
  // Only render when open to prevent duplicate elements
  if (!open) return null

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/activities", label: "Activities", icon: FileText },
    { href: "/quests", label: "Quests", icon: Star },
    { href: "/progress", label: "Progress", icon: Gauge },
    { href: "/skills", label: "Skills", icon: Brain },
    { href: "/inventory", label: "Inventory", icon: Package },
    { href: "/profile", label: "Profile", icon: Settings },
  ]

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-gradient-to-b from-blue-900 to-blue-950 z-50 shadow-xl"
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:text-blue-300"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* User info */}
        <div className="p-6 pt-16 border-b border-blue-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-3xl border-4 border-blue-600 overflow-hidden">
              {userData.avatar && userData.avatar.startsWith("data:") ? (
                <img
                  src={userData.avatar || "/placeholder.svg"}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{userData.avatar}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{userData.characterName}</h2>
              <p className="text-blue-300">
                Level {userData.level} {userData.characterClass}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800/50 text-white">
                  <item.icon className="h-5 w-5 text-blue-300" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-blue-900/50 border-blue-700 text-blue-100 hover:bg-blue-800"
              onClick={onSettings}
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-blue-900/50 border-blue-700 text-blue-100 hover:bg-blue-800"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
