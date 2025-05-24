"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PillBottleIcon as Potion, Scroll, Package, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { playSFX } from "@/utils/audio"
import { useMobile } from "@/hooks/use-mobile"

interface InventoryItem {
  id: string
  name: string
  description: string
  type: "potion" | "scroll" | "item"
  effect: string
  used: boolean
}

interface InventorySystemProps {
  userData: any
  onUseItem: (item: InventoryItem) => void
}

export function InventorySystem({ userData, onUseItem }: InventorySystemProps) {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "potion-clarity",
      name: "Potion of Clarity",
      description: "Resets focus meter and clears mental fog",
      type: "potion",
      effect: "Increases intelligence temporarily by 10%",
      used: false,
    },
    {
      id: "scroll-acceleration",
      name: "Scroll of Acceleration",
      description: "Doubles learning speed for a short time",
      type: "scroll",
      effect: "2X speed on video lectures for 30 minutes",
      used: false,
    },
    {
      id: "potion-strength",
      name: "Potion of Strength",
      description: "Temporarily boosts physical capabilities",
      type: "potion",
      effect: "Increases strength by 15% for 1 hour",
      used: false,
    },
  ])

  const handleUseItem = (item: InventoryItem) => {
    // Play sound effect
    playSFX("item-use")

    // Mark item as used
    setItems(items.map((i) => (i.id === item.id ? { ...i, used: true } : i)))

    // Call the parent callback
    onUseItem(item)

    // Close inventory on mobile after using item
    if (isMobile) {
      setTimeout(() => setIsOpen(false), 500)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="bg-blue-900/50 border-blue-700 text-blue-100 hover:bg-blue-800 hover:text-blue-50 w-full sm:w-auto mobile-touch-target"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Package className="h-4 w-4 mr-2" />
        Inventory
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`${isMobile ? "fixed inset-x-4 top-1/4 z-50" : "absolute top-full left-0 mt-2 z-50 w-80"}`}
          >
            <Card className="crystal-card border-0 overflow-hidden">
              {/* Background with blue crystal effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-950 z-0"></div>

              {/* Beveled edges */}
              <div className="absolute inset-0 border-[6px] border-blue-800 rounded-lg z-0"></div>
              <div className="absolute inset-[6px] border-[2px] border-blue-600 rounded-md z-0"></div>

              <CardHeader className="relative z-10 bg-blue-800 border-b-4 border-blue-700 flex flex-row justify-between items-center">
                <CardTitle className="text-blue-100 text-lg sm:text-xl">Inventory</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-blue-100 hover:text-white mobile-touch-target"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="relative z-10 p-3 sm:p-4 text-blue-100">
                {items.filter((item) => !item.used).length > 0 ? (
                  <div className="space-y-3">
                    {items.map(
                      (item) =>
                        !item.used && (
                          <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-blue-900/30 border border-blue-800 rounded p-2 flex items-start gap-2 sm:gap-3"
                          >
                            <div className="bg-blue-800/50 p-2 rounded-full flex-shrink-0">
                              {item.type === "potion" && <Potion className="h-5 w-5 text-green-400" />}
                              {item.type === "scroll" && <Scroll className="h-5 w-5 text-yellow-400" />}
                              {item.type === "item" && <Package className="h-5 w-5 text-blue-400" />}
                            </div>

                            <div className="flex-1 min-w-0 mobile-text-container">
                              <div className="font-medium truncate">{item.name}</div>
                              <div className="text-xs text-blue-300 line-clamp-2">{item.description}</div>
                              <div className="text-xs text-yellow-400 mt-1 truncate">{item.effect}</div>
                            </div>

                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-blue-800/50 border-blue-700 text-blue-100 hover:bg-blue-700 mobile-touch-target flex-shrink-0"
                              onClick={() => handleUseItem(item)}
                            >
                              Use
                            </Button>
                          </motion.div>
                        ),
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 text-blue-400 mobile-text-container">
                    No items available. Complete quests to earn items!
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
