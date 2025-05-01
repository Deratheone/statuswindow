"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface AvatarUploadProps {
  currentAvatar: string
  onAvatarChange: (avatar: string) => void
  size?: "sm" | "md" | "lg"
}

export function AvatarUpload({ currentAvatar, onAvatarChange, size = "md" }: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentAvatar && !currentAvatar.includes("🧙") ? currentAvatar : null,
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      alert("Image is too large. Please select an image under 1MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreviewUrl(result)
      onAvatarChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onAvatarChange("🧙‍♂️") // Reset to default avatar
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}
      >
        {previewUrl ? (
          <>
            <img src={previewUrl || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <span className="text-3xl">{currentAvatar}</span>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-purple-500/50 text-purple-300 hover:bg-purple-900/20"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-1" /> Upload
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload avatar image"
        />
      </div>
    </div>
  )
}
