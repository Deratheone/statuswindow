"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 200)

    // Animate loading dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 400)

    return () => {
      clearInterval(interval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-blue-950 z-50">
      <div className="relative w-24 h-24 mb-8">
        {/* Orbital particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: `hsl(${(i * 30) % 360}, 100%, 70%)`,
              boxShadow: `0 0 10px hsl(${(i * 30) % 360}, 100%, 70%)`,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-40px)`,
              animation: `orbit 3s linear infinite, pulse 2s ease-in-out infinite ${i * 0.1}s`,
            }}
          />
        ))}

        {/* Center sparkle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 animate-pulse">
          <Sparkles size={32} className="animate-spin-slow" />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-100 mb-2 tracking-wider">Loading{dots}</h2>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-blue-900/50 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{ width: `${progress}%`, transition: "width 0.2s ease-out" }}
          />
        </div>

        <p className="text-blue-200 text-sm">{progress < 100 ? "Preparing your adventure..." : "Ready!"}</p>
      </div>

      {/* Add some floating particles in the background */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(100, 200, 255, ${Math.random() * 0.5 + 0.2})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite, 
                        twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-40px);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-40px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-40px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-40px) scale(1.2);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
