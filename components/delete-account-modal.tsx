"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Trash2, X } from "lucide-react"
import { motion } from "framer-motion"

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmDelete: (password: string) => void
  isDeleting: boolean
}

export function DeleteAccountModal({ isOpen, onClose, onConfirmDelete, isDeleting }: DeleteAccountModalProps) {
  const [password, setPassword] = useState("")
  const [confirmText, setConfirmText] = useState("")
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (confirmText !== "DELETE") {
      setError("Please type DELETE to confirm")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    onConfirmDelete(password)
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md bg-slate-800 border border-red-500/30 rounded-lg shadow-lg z-50 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-bold">Delete Account</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isDeleting}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-md">
            <p className="text-red-300 text-sm">
              <strong>Warning:</strong> This action is permanent and cannot be undone. All your data, including
              character progress, skills, quests, and activities will be permanently deleted.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Enter your password to confirm
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Your current password"
                disabled={isDeleting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmText" className="text-white">
                Type <span className="font-bold">DELETE</span> to confirm
              </Label>
              <Input
                id="confirmText"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="DELETE"
                disabled={isDeleting}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="pt-2">
              <Button type="submit" variant="destructive" className="w-full" disabled={isDeleting}>
                {isDeleting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    Deleting Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Permanently Delete Account
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  )
}
