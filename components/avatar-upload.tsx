"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AvatarUploadProps {
  currentAvatar: string
  onAvatarChange: (avatar: string) => void
  size?: "sm" | "md" | "lg"
}

export function AvatarUpload({ currentAvatar, onAvatarChange, size = "md" }: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isEmoji, setIsEmoji] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check if currentAvatar is an emoji or a data URL
  useEffect(() => {
    if (currentAvatar) {
      // If it starts with data: it's an image
      if (currentAvatar.startsWith("data:")) {
        setPreviewUrl(currentAvatar)
        setIsEmoji(false)
      } else {
        // It's an emoji or text
        setPreviewUrl(null)
        setIsEmoji(true)
      }
    }
  }, [currentAvatar])

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
      const result = reader.result as string
      setPreviewUrl(result)
      setIsEmoji(false)
      onAvatarChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    setIsEmoji(true)
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
      <div className="flex items-center gap-4">
        {/* Avatar display */}
        <div
          className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-purple-400/30`}
        >
          {!isEmoji && previewUrl ? (
            <img src={previewUrl || "/placeholder.svg"} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <div className={`text-${size === "sm" ? "3xl" : size === "md" ? "4xl" : "5xl"}`}>{currentAvatar}</div>
          )}
        </div>

        {/* Remove button - separate from the avatar */}
        {!isEmoji && (
          <Button
            type="button"
            onClick={handleRemoveImage}
            variant="destructive"
            size="sm"
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </Button>
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
        className="mt-4 bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 flex items-center gap-1"
      >
        <Upload className="h-4 w-4" />
        Upload Image
      </Button>
    </div>
  )
}
