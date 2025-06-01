/**
 * Data backup and export utilities
 */

export function exportUserData(): string {
  const users = localStorage.getItem("statusWindowUsers") || "{}"
  const currentUser = localStorage.getItem("statusWindowCurrentUser")

  const exportData = {
    users: JSON.parse(users),
    currentUser,
    exportDate: new Date().toISOString(),
    version: "1.0",
  }

  return JSON.stringify(exportData, null, 2)
}

export function downloadBackup() {
  const data = exportUserData()
  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `statuswindow-backup-${new Date().toISOString().split("T")[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function importUserData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString)

    if (!data.users || !data.version) {
      throw new Error("Invalid backup file format")
    }

    // Validate each user's data
    Object.values(data.users).forEach((user: any) => {
      if (!validateUserData(user)) {
        throw new Error("Invalid user data in backup")
      }
    })

    localStorage.setItem("statusWindowUsers", JSON.stringify(data.users))
    if (data.currentUser) {
      localStorage.setItem("statusWindowCurrentUser", data.currentUser)
    }

    return true
  } catch (error) {
    console.error("Import failed:", error)
    return false
  }
}

function validateUserData(user: any): boolean {
  const required = ["username", "characterName", "stats", "level", "xp"]
  return required.every((field) => user.hasOwnProperty(field))
}
