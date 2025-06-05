"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Upload, FileText, Users, Calendar, AlertCircle, CheckCircle, Info, Sparkles } from "lucide-react"
import { downloadBackup, importUserData, getBackupInfo, createAutoBackup } from "@/utils/data-backup"
import { useToast } from "@/hooks/use-toast"

interface DataManagerProps {
  onDataImported?: () => void
}

interface UserDetail {
  username: string
  characterName: string
  characterClass: string
  level: number
  avatar: string
}

export function DataManager({ onDataImported }: DataManagerProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<{
    success: boolean
    message: string
    importedUsers: string[]
  } | null>(null)
  const [backupInfo, setBackupInfo] = useState<any>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(true)
  const [showUserSelection, setShowUserSelection] = useState(false)

  const handleExport = async () => {
    try {
      downloadBackup()
      toast({
        title: "Backup Downloaded",
        description: "Your data has been successfully exported to a backup file.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to create backup file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const MAX_BACKUP_SIZE = 10 * 1024 * 1024 // 10MB limit

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size first
    if (file.size > MAX_BACKUP_SIZE) {
      toast({
        title: "File Too Large",
        description: "Backup file must be smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      toast({
        title: "Invalid File Type",
        description: "Please select a JSON backup file.",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content) {
        // Show backup info first
        const info = getBackupInfo(content)
        if (info.valid) {
          setBackupInfo({ content, info: info.info })
          // Pre-select all users by default
          setSelectedUsers(info.info.users)
          setSelectAll(true)
          setShowUserSelection(true)
        } else {
          toast({
            title: "Invalid Backup File",
            description: info.error || "The selected file is not a valid backup.",
            variant: "destructive",
          })
        }
      }
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!backupInfo?.content) return

    setIsImporting(true)

    try {
      // Create auto backup before importing
      createAutoBackup()

      // Import only selected users
      const result = importUserData(backupInfo.content, selectedUsers)
      setImportResult(result)

      if (result.success) {
        toast({
          title: "Import Successful",
          description: result.message,
        })

        // Call callback to refresh the UI
        onDataImported?.()

        // Clear the file input and backup info
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        setBackupInfo(null)
        setShowUserSelection(false)
      } else {
        toast({
          title: "Import Failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Import Error",
        description: "An unexpected error occurred during import.",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleCancel = () => {
    setBackupInfo(null)
    setImportResult(null)
    setShowUserSelection(false)
    setSelectedUsers([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUserSelect = (username: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(username)) {
        const newSelected = prev.filter((u) => u !== username)
        setSelectAll(newSelected.length === backupInfo.info.users.length)
        return newSelected
      } else {
        const newSelected = [...prev, username]
        setSelectAll(newSelected.length === backupInfo.info.users.length)
        return newSelected
      }
    })
  }

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setSelectedUsers([])
      setSelectAll(false)
    } else {
      // Select all
      setSelectedUsers([...backupInfo.info.users])
      setSelectAll(true)
    }
  }

  const getClassColor = (characterClass: string) => {
    const classColors: Record<string, string> = {
      Warrior: "bg-red-500/20 text-red-200",
      Mage: "bg-blue-500/20 text-blue-200",
      Rogue: "bg-green-500/20 text-green-200",
      Cleric: "bg-yellow-500/20 text-yellow-200",
      Ranger: "bg-purple-500/20 text-purple-200",
      Bard: "bg-pink-500/20 text-pink-200",
      Paladin: "bg-orange-500/20 text-orange-200",
      Druid: "bg-emerald-500/20 text-emerald-200",
    }

    return classColors[characterClass] || "bg-gray-500/20 text-gray-200"
  }

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <Card className="border-blue-500/30 bg-slate-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <Download className="h-5 w-5" />
            Export Data
          </CardTitle>
          <CardDescription className="text-gray-400">
            Download a backup file containing all your progress and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleExport} className="w-full bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download Backup File
          </Button>
        </CardContent>
      </Card>

      {/* Import Section */}
      <Card className="border-purple-500/30 bg-slate-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-100">
            <Upload className="h-5 w-5" />
            Import Data
          </CardTitle>
          <CardDescription className="text-gray-400">
            Upload a backup file to restore your progress from another device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!backupInfo && (
            <div>
              <Label htmlFor="backup-file" className="text-sm font-medium text-gray-300">
                Select Backup File
              </Label>
              <Input
                id="backup-file"
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="mt-1 bg-slate-700/50 border-slate-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1"
              />
            </div>
          )}

          {/* Backup Info Preview */}
          {backupInfo && !showUserSelection && (
            <div className="space-y-4">
              <Alert className="border-blue-500/30 bg-blue-900/20">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="font-medium">Backup File Information:</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Date: {backupInfo.info.exportDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>Users: {backupInfo.info.userCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        <span>Version: {backupInfo.info.version}</span>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button onClick={() => setShowUserSelection(true)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Select Characters to Import
                </Button>
                <Button onClick={handleCancel} variant="outline" className="border-slate-600">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* User Selection UI */}
          {backupInfo && showUserSelection && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-300">Select Characters to Import</h3>
                <div className="flex items-center">
                  <Checkbox id="select-all" checked={selectAll} onCheckedChange={handleSelectAll} />
                  <label htmlFor="select-all" className="ml-2 text-sm text-gray-300">
                    Select All
                  </label>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {backupInfo.info.userDetails.map((user: UserDetail) => (
                  <div
                    key={user.username}
                    className={`flex items-center justify-between p-3 rounded-md border ${
                      selectedUsers.includes(user.username)
                        ? "border-purple-500/50 bg-purple-900/20"
                        : "border-slate-700 bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700">
                        <span className="text-lg">{user.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">{user.characterName}</div>
                        <div className="flex items-center space-x-2 text-xs">
                          <Badge className={`${getClassColor(user.characterClass)}`}>{user.characterClass}</Badge>
                          <span className="text-gray-400 flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Level {user.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Checkbox
                      checked={selectedUsers.includes(user.username)}
                      onCheckedChange={() => handleUserSelect(user.username)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleImport}
                  disabled={isImporting || selectedUsers.length === 0}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/30"
                >
                  {isImporting
                    ? "Importing..."
                    : `Import ${selectedUsers.length} Character${selectedUsers.length !== 1 ? "s" : ""}`}
                </Button>
                <Button onClick={handleCancel} variant="outline" className="border-slate-600">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Import Result */}
          {importResult && (
            <Alert
              className={
                importResult.success ? "border-green-500/30 bg-green-900/20" : "border-red-500/30 bg-red-900/20"
              }
            >
              {importResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">{importResult.success ? "Import Successful!" : "Import Failed"}</div>
                  <div className="text-sm">{importResult.message}</div>
                  {importResult.success && importResult.importedUsers.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Imported Characters:</div>
                      <div className="flex flex-wrap gap-1">
                        {importResult.importedUsers.map((username) => (
                          <Badge key={username} variant="secondary" className="text-xs">
                            {username}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-slate-600 bg-slate-800/50">
        <CardHeader>
          <CardTitle className="text-slate-200 text-lg">How to Transfer Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-300">
          <div className="space-y-2">
            <div className="font-medium">To backup your data:</div>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Click "Download Backup File" to save your progress</li>
              <li>Store the file safely (cloud storage, email, etc.)</li>
            </ol>
          </div>

          <div className="space-y-2">
            <div className="font-medium">To restore on a new device:</div>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Transfer the backup file to your new device</li>
              <li>Click "Select Backup File" and choose your backup</li>
              <li>Select which characters you want to import</li>
              <li>Click "Import" to restore your selected characters</li>
            </ol>
          </div>

          <Alert className="border-yellow-500/30 bg-yellow-900/20 mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-yellow-200">
              <strong>Important:</strong> Importing data will overwrite any existing characters with the same username.
              An automatic backup is created before importing.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
