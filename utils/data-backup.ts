/**
 * Data backup and export utilities for StatusWindow
 */

export interface BackupData {
  users: Record<string, any>
  currentUser: string | null
  exportDate: string
  version: string
  deviceInfo: {
    userAgent: string
    timestamp: number
  }
}

/**
 * Export all user data to a JSON string
 */
export function exportUserData(): string {
  try {
    const users = localStorage.getItem("statusWindowUsers") || "{}"
    const currentUser = localStorage.getItem("statusWindowCurrentUser")
    const rememberedUser = localStorage.getItem("statusWindowRememberedUser")

    const exportData: BackupData = {
      users: JSON.parse(users),
      currentUser,
      rememberedUser,
      exportDate: new Date().toISOString(),
      version: "1.0.0",
      deviceInfo: {
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      },
    }

    return JSON.stringify(exportData, null, 2)
  } catch (error) {
    console.error("Export failed:", error)
    throw new Error("Failed to export user data")
  }
}

/**
 * Download backup file to user's device
 */
export function downloadBackup(): void {
  try {
    const data = exportUserData()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `statuswindow-backup-${timestamp}.json`

    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Download failed:", error)
    throw new Error("Failed to download backup file")
  }
}

/**
 * Import user data from backup file
 */
export function importUserData(jsonString: string): { success: boolean; message: string; importedUsers: string[] } {
  try {
    const data: BackupData = JSON.parse(jsonString)

    // Validate backup file structure
    if (!data.users || !data.version) {
      return {
        success: false,
        message: "Invalid backup file format. Please select a valid StatusWindow backup file.",
        importedUsers: [],
      }
    }

    // Validate version compatibility
    if (!isVersionCompatible(data.version)) {
      return {
        success: false,
        message: `Backup version ${data.version} is not compatible with current version.`,
        importedUsers: [],
      }
    }

    // Validate each user's data
    const usernames = Object.keys(data.users)
    const invalidUsers: string[] = []

    usernames.forEach((username) => {
      if (!validateUserData(data.users[username])) {
        invalidUsers.push(username)
      }
    })

    if (invalidUsers.length > 0) {
      return {
        success: false,
        message: `Invalid user data found for: ${invalidUsers.join(", ")}`,
        importedUsers: [],
      }
    }

    // Check for existing users and handle conflicts
    const existingUsers = JSON.parse(localStorage.getItem("statusWindowUsers") || "{}")
    const conflictingUsers = usernames.filter((username) => existingUsers[username])

    // Merge data (imported data takes precedence for conflicts)
    const mergedUsers = { ...existingUsers, ...data.users }

    // Save merged data
    localStorage.setItem("statusWindowUsers", JSON.stringify(mergedUsers))

    // Restore current user if it exists in the backup
    if (data.currentUser && mergedUsers[data.currentUser]) {
      localStorage.setItem("statusWindowCurrentUser", data.currentUser)
    }

    // Restore remembered user if it exists
    if (data.rememberedUser && mergedUsers[data.rememberedUser]) {
      localStorage.setItem("statusWindowRememberedUser", data.rememberedUser)
    }

    const message =
      conflictingUsers.length > 0
        ? `Successfully imported ${usernames.length} users. Overwrote existing data for: ${conflictingUsers.join(", ")}`
        : `Successfully imported ${usernames.length} users.`

    return {
      success: true,
      message,
      importedUsers: usernames,
    }
  } catch (error) {
    console.error("Import failed:", error)
    return {
      success: false,
      message: "Failed to parse backup file. Please ensure it's a valid JSON file.",
      importedUsers: [],
    }
  }
}

/**
 * Validate user data structure
 */
function validateUserData(user: any): boolean {
  const requiredFields = [
    "username",
    "password",
    "characterName",
    "characterClass",
    "avatar",
    "stats",
    "level",
    "xp",
    "xpToNextLevel",
    "activities",
    "quests",
  ]

  // Check required fields exist
  const hasRequiredFields = requiredFields.every((field) => user.hasOwnProperty(field))
  if (!hasRequiredFields) return false

  // Validate stats structure
  if (!user.stats || typeof user.stats !== "object") return false
  const requiredStats = ["strength", "intelligence", "mana"]
  const hasValidStats = requiredStats.every((stat) => typeof user.stats[stat] === "number")
  if (!hasValidStats) return false

  // Validate arrays
  if (!Array.isArray(user.activities) || !Array.isArray(user.quests)) return false

  // Validate numeric fields
  const numericFields = ["level", "xp", "xpToNextLevel"]
  const hasValidNumbers = numericFields.every((field) => typeof user[field] === "number" && user[field] >= 0)
  if (!hasValidNumbers) return false

  return true
}

/**
 * Check if backup version is compatible
 */
function isVersionCompatible(version: string): boolean {
  const currentVersion = "1.0.0"
  const backupMajor = Number.parseInt(version.split(".")[0])
  const currentMajor = Number.parseInt(currentVersion.split(".")[0])

  // Same major version is compatible
  return backupMajor === currentMajor
}

/**
 * Get backup file info without importing
 */
export function getBackupInfo(jsonString: string): { valid: boolean; info?: any; error?: string } {
  try {
    const data: BackupData = JSON.parse(jsonString)

    if (!data.users || !data.version) {
      return { valid: false, error: "Invalid backup file format" }
    }

    const userCount = Object.keys(data.users).length
    const exportDate = new Date(data.exportDate).toLocaleDateString()

    return {
      valid: true,
      info: {
        version: data.version,
        exportDate,
        userCount,
        users: Object.keys(data.users),
        deviceInfo: data.deviceInfo,
      },
    }
  } catch (error) {
    return { valid: false, error: "Invalid JSON format" }
  }
}

/**
 * Create automatic backup before major operations
 */
export function createAutoBackup(): void {
  try {
    const data = exportUserData()
    const timestamp = Date.now()
    localStorage.setItem(`statusWindowAutoBackup_${timestamp}`, data)

    // Keep only the 3 most recent auto backups
    const autoBackupKeys = Object.keys(localStorage).filter((key) => key.startsWith("statusWindowAutoBackup_"))
    if (autoBackupKeys.length > 3) {
      autoBackupKeys
        .sort()
        .slice(0, -3)
        .forEach((key) => localStorage.removeItem(key))
    }
  } catch (error) {
    console.warn("Auto backup failed:", error)
  }
}
