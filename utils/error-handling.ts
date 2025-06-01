/**
 * Enhanced error handling utilities
 */

export class StatusWindowError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message)
    this.name = "StatusWindowError"
  }
}

export function safeLocalStorageGet(key: string, defaultValue: any = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function safeLocalStorageSet(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
    return false
  }
}

export function validateUserData(userData: any): boolean {
  if (!userData || typeof userData !== "object") return false

  const required = ["username", "characterName", "stats", "level", "xp"]
  return required.every((field) => userData.hasOwnProperty(field))
}
