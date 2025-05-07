"use client"

import { useState, useEffect, type TouchEvent } from "react"

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
}

export function useSwipe({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50 }: SwipeHandlers) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  // Reset if the component unmounts
  useEffect(() => {
    return () => {
      setTouchStart(null)
      setTouchEnd(null)
    }
  }, [])

  // Handle touch start
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null) // Reset touchEnd
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  // Handle touch end
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

    if (isHorizontalSwipe) {
      if (distanceX > threshold) {
        // Swiped left
        onSwipeLeft?.()
      } else if (distanceX < -threshold) {
        // Swiped right
        onSwipeRight?.()
      }
    } else {
      if (distanceY > threshold) {
        // Swiped up
        onSwipeUp?.()
      } else if (distanceY < -threshold) {
        // Swiped down
        onSwipeDown?.()
      }
    }

    // Reset
    setTouchStart(null)
    setTouchEnd(null)
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
