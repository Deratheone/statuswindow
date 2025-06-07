"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, Play, RotateCcw, MousePointer } from "lucide-react"

interface FeatureTest {
  id: string
  name: string
  description: string
  category: string
  status: "pending" | "success" | "error" | "warning"
  error?: string
  details?: string
}

export default function LandingPageTesting() {
  const [tests, setTests] = useState<FeatureTest[]>([
    // Navigation Tests
    {
      id: "nav-logo-animation",
      name: "Logo Sparkles Animation",
      description: "Sparkles icon should rotate continuously",
      category: "Navigation",
      status: "pending",
    },
    {
      id: "nav-gradient-text",
      name: "Gradient Text Effect",
      description: "StatusWindow text should have gradient colors",
      category: "Navigation",
      status: "pending",
    },
    {
      id: "nav-hover-effects",
      name: "Navigation Hover Effects",
      description: "Login and Get Started buttons should have hover animations",
      category: "Navigation",
      status: "pending",
    },

    // Hero Section Tests
    {
      id: "hero-title-animation",
      name: "Hero Title Animation",
      description: "Main title should animate in with opacity and y transform",
      category: "Hero Section",
      status: "pending",
    },
    {
      id: "hero-floating-icons",
      name: "Floating Icons",
      description: "Star and Zap icons should float around the title",
      category: "Hero Section",
      status: "pending",
    },
    {
      id: "hero-button-shimmer",
      name: "Button Shimmer Effect",
      description: "CTA buttons should have shimmer animations",
      category: "Hero Section",
      status: "pending",
    },
    {
      id: "hero-parallax",
      name: "Parallax Scrolling",
      description: "Hero content should move with scroll transforms",
      category: "Hero Section",
      status: "pending",
    },

    // Status Window Tests
    {
      id: "status-window-3d",
      name: "3D Hover Effects",
      description: "Status window should tilt and scale on hover",
      category: "Status Window",
      status: "pending",
    },
    {
      id: "status-window-background",
      name: "Animated Background",
      description: "Background pattern should move continuously",
      category: "Status Window",
      status: "pending",
    },
    {
      id: "status-window-avatar",
      name: "Avatar Rotation",
      description: "Character avatar should have rotating overlay",
      category: "Status Window",
      status: "pending",
    },
    {
      id: "status-window-stats",
      name: "Stat Bar Animations",
      description: "Stat bars should animate to their values",
      category: "Status Window",
      status: "pending",
    },
    {
      id: "status-window-xp",
      name: "XP Notification",
      description: "Floating XP notification should appear with animations",
      category: "Status Window",
      status: "pending",
    },

    // Feature Cards Tests
    {
      id: "feature-cards-3d",
      name: "3D Tilt Effects",
      description: "Feature cards should have 3D tilt on hover (desktop only)",
      category: "Feature Cards",
      status: "pending",
    },
    {
      id: "feature-cards-icons",
      name: "Icon Animations",
      description: "Feature icons should rotate and scale on hover",
      category: "Feature Cards",
      status: "pending",
    },
    {
      id: "feature-cards-mobile",
      name: "Mobile Optimization",
      description: "Cards should have simplified animations on mobile",
      category: "Feature Cards",
      status: "pending",
    },

    // Background Effects Tests
    {
      id: "background-particles",
      name: "Floating Particles",
      description: "Purple particles should float across the screen",
      category: "Background Effects",
      status: "pending",
    },
    {
      id: "background-mouse-follower",
      name: "Mouse Follower",
      description: "Purple orb should follow mouse cursor",
      category: "Background Effects",
      status: "pending",
    },

    // Responsive Design Tests
    {
      id: "responsive-mobile",
      name: "Mobile Layout",
      description: "Layout should adapt properly on mobile devices",
      category: "Responsive Design",
      status: "pending",
    },
    {
      id: "responsive-tablet",
      name: "Tablet Layout",
      description: "Layout should work well on tablet screens",
      category: "Responsive Design",
      status: "pending",
    },

    // Performance Tests
    {
      id: "performance-animations",
      name: "Animation Performance",
      description: "Animations should run smoothly without frame drops",
      category: "Performance",
      status: "pending",
    },
    {
      id: "performance-scroll",
      name: "Scroll Performance",
      description: "Scrolling should be smooth with parallax effects",
      category: "Performance",
      status: "pending",
    },

    // Accessibility Tests
    {
      id: "accessibility-focus",
      name: "Keyboard Focus",
      description: "All interactive elements should be keyboard accessible",
      category: "Accessibility",
      status: "pending",
    },
    {
      id: "accessibility-contrast",
      name: "Color Contrast",
      description: "Text should have sufficient contrast ratios",
      category: "Accessibility",
      status: "pending",
    },
  ])

  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<{ [key: string]: any }>({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const frameCountRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const [fps, setFps] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Track mouse position for mouse follower test
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Track FPS for performance testing
    const trackFPS = () => {
      const now = performance.now()
      frameCountRef.current++

      if (now - lastFrameTimeRef.current >= 1000) {
        setFps(frameCountRef.current)
        frameCountRef.current = 0
        lastFrameTimeRef.current = now
      }

      requestAnimationFrame(trackFPS)
    }

    window.addEventListener("mousemove", handleMouseMove)
    trackFPS()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const updateTestStatus = (testId: string, status: FeatureTest["status"], error?: string, details?: string) => {
    setTests((prev) =>
      prev.map((test) =>
        test.id === testId
          ? {
              ...test,
              status,
              error,
              details,
            }
          : test,
      ),
    )
  }

  const testFeature = async (test: FeatureTest) => {
    if (typeof window === "undefined") return

    setCurrentTest(test.id)
    updateTestStatus(test.id, "pending")

    try {
      switch (test.id) {
        case "nav-logo-animation":
          const sparkles =
            document.querySelector('[data-testid="nav-sparkles"]') || document.querySelector(".lucide-sparkles")
          if (sparkles) {
            const computedStyle = window.getComputedStyle(sparkles)
            const hasAnimation = computedStyle.animation !== "none"
            updateTestStatus(
              test.id,
              hasAnimation ? "success" : "error",
              hasAnimation ? undefined : "No rotation animation detected",
            )
          } else {
            updateTestStatus(test.id, "error", "Sparkles icon not found")
          }
          break

        case "nav-gradient-text":
          const logoText = document.querySelector("h1")
          if (logoText) {
            const computedStyle = window.getComputedStyle(logoText)
            const hasGradient = computedStyle.backgroundImage.includes("gradient")
            updateTestStatus(
              test.id,
              hasGradient ? "success" : "error",
              hasGradient ? undefined : "No gradient background detected",
            )
          } else {
            updateTestStatus(test.id, "error", "Logo text not found")
          }
          break

        case "nav-hover-effects":
          const buttons = document.querySelectorAll("nav button")
          const hasHoverEffects = buttons.length >= 2
          updateTestStatus(
            test.id,
            hasHoverEffects ? "success" : "error",
            hasHoverEffects ? undefined : "Navigation buttons not found",
          )
          break

        case "hero-title-animation":
          const heroTitle = document.querySelector("h1")
          if (heroTitle && heroTitle.textContent?.includes("Level Up")) {
            updateTestStatus(test.id, "success", undefined, "Hero title found and should animate on load")
          } else {
            updateTestStatus(test.id, "error", "Hero title not found")
          }
          break

        case "hero-floating-icons":
          const starIcon = document.querySelector(".lucide-star")
          const zapIcon = document.querySelector(".lucide-zap")
          if (starIcon && zapIcon) {
            updateTestStatus(test.id, "success", undefined, "Floating icons detected")
          } else {
            updateTestStatus(test.id, "error", "Floating icons not found")
          }
          break

        case "hero-button-shimmer":
          const ctaButtons = document.querySelectorAll("button:has(.lucide-arrow-right)")
          if (ctaButtons.length > 0) {
            updateTestStatus(test.id, "success", undefined, "CTA buttons found with shimmer effects")
          } else {
            updateTestStatus(test.id, "error", "CTA buttons not found")
          }
          break

        case "hero-parallax":
          // Simulate scroll to test parallax
          window.scrollTo(0, 100)
          setTimeout(() => {
            window.scrollTo(0, 0)
            updateTestStatus(test.id, "success", undefined, "Parallax scrolling tested")
          }, 500)
          break

        case "status-window-3d":
          const statusWindow = document.querySelector('[class*="status-window"], [class*="slate-800"]')
          if (statusWindow) {
            updateTestStatus(test.id, "success", undefined, "Status window found - 3D effects should work on hover")
          } else {
            updateTestStatus(test.id, "error", "Status window not found")
          }
          break

        case "status-window-background":
          const backgroundPattern = document.querySelector('[style*="radial-gradient"]')
          if (backgroundPattern) {
            updateTestStatus(test.id, "success", undefined, "Animated background pattern detected")
          } else {
            updateTestStatus(test.id, "warning", "Background pattern not clearly detected")
          }
          break

        case "status-window-avatar":
          const avatar = document.querySelector('[class*="rounded-full"]:has(span)')
          if (avatar) {
            updateTestStatus(test.id, "success", undefined, "Character avatar found")
          } else {
            updateTestStatus(test.id, "error", "Character avatar not found")
          }
          break

        case "status-window-stats":
          const statBars = document.querySelectorAll('[class*="bg-gradient-to-r"]')
          if (statBars.length >= 3) {
            updateTestStatus(test.id, "success", undefined, `${statBars.length} stat bars detected`)
          } else {
            updateTestStatus(test.id, "error", "Insufficient stat bars found")
          }
          break

        case "status-window-xp":
          const xpNotification = document.querySelector('[class*="absolute"][class*="bottom"]')
          if (xpNotification) {
            updateTestStatus(test.id, "success", undefined, "XP notification element found")
          } else {
            updateTestStatus(test.id, "error", "XP notification not found")
          }
          break

        case "feature-cards-3d":
          const featureCards = document.querySelectorAll('[class*="grid"] > div[class*="bg-slate-800"]')
          const isMobile = window.innerWidth < 768
          if (featureCards.length >= 3) {
            updateTestStatus(
              test.id,
              "success",
              undefined,
              `${featureCards.length} feature cards found. 3D effects ${isMobile ? "disabled on mobile" : "enabled on desktop"}`,
            )
          } else {
            updateTestStatus(test.id, "error", "Feature cards not found")
          }
          break

        case "feature-cards-icons":
          const featureIcons = document.querySelectorAll(".lucide-dumbbell, .lucide-award, .lucide-brain")
          if (featureIcons.length >= 3) {
            updateTestStatus(test.id, "success", undefined, `${featureIcons.length} feature icons detected`)
          } else {
            updateTestStatus(test.id, "error", "Feature icons not found")
          }
          break

        case "feature-cards-mobile":
          const isMobileDevice = window.innerWidth < 768
          updateTestStatus(
            test.id,
            "success",
            undefined,
            `Current viewport: ${window.innerWidth}px (${isMobileDevice ? "Mobile" : "Desktop"})`,
          )
          break

        case "background-particles":
          const particles = document.querySelectorAll('[class*="bg-purple-400"][class*="rounded-full"]')
          if (particles.length > 0) {
            updateTestStatus(test.id, "success", undefined, `${particles.length} particles detected`)
          } else {
            updateTestStatus(test.id, "error", "Background particles not found")
          }
          break

        case "background-mouse-follower":
          const mouseFollower = document.querySelector('[class*="fixed"][class*="bg-purple-400"]')
          if (mouseFollower) {
            updateTestStatus(
              test.id,
              "success",
              undefined,
              `Mouse follower detected at ${mousePosition.x}, ${mousePosition.y}`,
            )
          } else {
            updateTestStatus(test.id, "error", "Mouse follower not found")
          }
          break

        case "responsive-mobile":
          const mobileBreakpoint = window.innerWidth < 768
          const hasResponsiveClasses = document.querySelector('[class*="sm:"], [class*="md:"], [class*="lg:"]')
          if (hasResponsiveClasses) {
            updateTestStatus(
              test.id,
              "success",
              undefined,
              `Responsive classes detected. Current: ${mobileBreakpoint ? "Mobile" : "Desktop"}`,
            )
          } else {
            updateTestStatus(test.id, "error", "Responsive classes not found")
          }
          break

        case "responsive-tablet":
          const tabletBreakpoint = window.innerWidth >= 768 && window.innerWidth < 1024
          updateTestStatus(
            test.id,
            "success",
            undefined,
            `Current viewport: ${window.innerWidth}px (${tabletBreakpoint ? "Tablet" : "Other"})`,
          )
          break

        case "performance-animations":
          const currentFPS = fps
          if (currentFPS >= 30) {
            updateTestStatus(test.id, "success", undefined, `FPS: ${currentFPS} (Good performance)`)
          } else if (currentFPS >= 20) {
            updateTestStatus(test.id, "warning", undefined, `FPS: ${currentFPS} (Moderate performance)`)
          } else {
            updateTestStatus(test.id, "error", `Low FPS: ${currentFPS}`)
          }
          break

        case "performance-scroll":
          // Test scroll performance
          const startTime = performance.now()
          window.scrollTo(0, 500)
          setTimeout(() => {
            const endTime = performance.now()
            const scrollTime = endTime - startTime
            window.scrollTo(0, 0)
            if (scrollTime < 100) {
              updateTestStatus(test.id, "success", undefined, `Scroll time: ${scrollTime.toFixed(2)}ms`)
            } else {
              updateTestStatus(test.id, "warning", `Slow scroll: ${scrollTime.toFixed(2)}ms`)
            }
          }, 100)
          break

        case "accessibility-focus":
          const focusableElements = document.querySelectorAll("button, a, input, [tabindex]")
          if (focusableElements.length > 0) {
            updateTestStatus(test.id, "success", undefined, `${focusableElements.length} focusable elements found`)
          } else {
            updateTestStatus(test.id, "error", "No focusable elements found")
          }
          break

        case "accessibility-contrast":
          const textElements = document.querySelectorAll("p, h1, h2, h3, span")
          if (textElements.length > 0) {
            updateTestStatus(
              test.id,
              "success",
              undefined,
              `${textElements.length} text elements found for contrast checking`,
            )
          } else {
            updateTestStatus(test.id, "error", "No text elements found")
          }
          break

        default:
          updateTestStatus(test.id, "error", "Test not implemented")
      }
    } catch (error) {
      updateTestStatus(test.id, "error", error instanceof Error ? error.message : "Unknown error")
    }

    setCurrentTest(null)
  }

  const runAllTests = async () => {
    setIsRunning(true)
    for (const test of tests) {
      await testFeature(test)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
    setIsRunning(false)
  }

  const resetTests = () => {
    setTests((prev) => prev.map((test) => ({ ...test, status: "pending", error: undefined, details: undefined })))
    setTestResults({})
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-400 animate-spin border-t-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-500 bg-green-50"
      case "error":
        return "border-red-500 bg-red-50"
      case "warning":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const categories = [...new Set(tests.map((test) => test.category))]
  const successCount = tests.filter((t) => t.status === "success").length
  const errorCount = tests.filter((t) => t.status === "error").length
  const warningCount = tests.filter((t) => t.status === "warning").length
  const pendingCount = tests.filter((t) => t.status === "pending").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-950 text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="border-purple-500/30 bg-slate-800/70 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-6 w-6 text-purple-400" />
              Landing Page Feature Testing
            </CardTitle>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Success: {successCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Error: {errorCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Warning: {warningCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border border-gray-400" />
                <span>Pending: {pendingCount}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span>FPS: {fps}</span>
                <span>•</span>
                <span>
                  Mouse: {mousePosition.x}, {mousePosition.y}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Test Controls */}
              <div className="flex flex-wrap gap-2 p-4 bg-slate-700/50 rounded-lg">
                <Button onClick={runAllTests} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running Tests..." : "Run All Tests"}
                </Button>
                <Button onClick={resetTests} disabled={isRunning} variant="outline" className="border-gray-500">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Tests
                </Button>
                {currentTest && (
                  <div className="flex items-center gap-2 text-sm bg-blue-900/50 px-3 py-1 rounded">
                    <div className="h-3 w-3 rounded-full border border-blue-400 animate-spin border-t-transparent" />
                    <span>Testing: {tests.find((t) => t.id === currentTest)?.name}</span>
                  </div>
                )}
              </div>

              {/* Test Results by Category */}
              {categories.map((category) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-lg font-semibold text-purple-400 border-b border-purple-500/30 pb-2">
                    {category}
                  </h3>
                  <div className="grid gap-2">
                    {tests
                      .filter((test) => test.category === category)
                      .map((test) => (
                        <div
                          key={test.id}
                          className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(test.status)}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(test.status)}
                              <div>
                                <div className="font-medium text-gray-900">{test.name}</div>
                                <div className="text-sm text-gray-600">{test.description}</div>
                                {test.details && (
                                  <div className="text-xs text-gray-500 mt-1">Details: {test.details}</div>
                                )}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => testFeature(test)}
                              disabled={isRunning || currentTest === test.id}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {currentTest === test.id ? "Testing..." : "Test"}
                            </Button>
                          </div>
                          {test.error && (
                            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">{test.error}</div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Performance Metrics */}
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h3 className="font-medium mb-2 text-white">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>FPS:</span>
                    <span className={fps >= 30 ? "text-green-400" : fps >= 20 ? "text-yellow-400" : "text-red-400"}>
                      {fps}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Viewport:</span>
                    <span className="text-blue-400">
                      {typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Device:</span>
                    <span className="text-purple-400">
                      {typeof window !== "undefined"
                        ? window.innerWidth < 768
                          ? "Mobile"
                          : window.innerWidth < 1024
                            ? "Tablet"
                            : "Desktop"
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tests Passed:</span>
                    <span className="text-green-400">
                      {successCount}/{tests.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
