"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AvatarUploadProps {
  currentAvatar: string
  onAvatarChange: (avatar: string) => void
  size?: "sm" | "md" | "lg"
}

export function AvatarUpload({ currentAvatar, onAvatarChange, size = "md" }: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
      onAvatarChange(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onAvatarChange("🧙‍♂️") // Default avatar
  }

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-slate-700 flex items-center justify-center`}
      >
        {previewUrl ? (
          <img src={previewUrl || "/placeholder.svg"} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <div className={`text-${size === "sm" ? "3xl" : size === "md" ? "4xl" : "5xl"}`}>{currentAvatar}</div>
        )}

        {/* Remove button with improved visibility */}
        {(previewUrl || currentAvatar !== "🧙‍♂️") && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transform translate-x-1/4 -translate-y-1/4 z-10 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Remove avatar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="avatar-upload"
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="mt-4 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
      >
        Upload Image
      </Button>
    </div>
  )
}
