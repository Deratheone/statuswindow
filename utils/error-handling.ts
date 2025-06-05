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

export function sanitizeErrorMessage(error: any): string {
  // Don't expose internal error details to users
  if (error instanceof StatusWindowError) {
    return error.message
  }

  // Generic message for unexpected errors
  return "An unexpected error occurred. Please try again."
}

export function logError(error: any, context: string) {
  // Log full error details for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.error(`Error in ${context}:`, error)
  }
}

export function sanitizeInput(input: string, maxLength = 1000): string {
  if (typeof input !== "string") return ""

  return input.trim().slice(0, maxLength).replace(/[<>]/g, "") // Remove potential HTML tags
}

export function validateCharacterName(name: string): { valid: boolean; error?: string } {
  const sanitized = sanitizeInput(name, 50)

  if (!sanitized) {
    return { valid: false, error: "Character name is required" }
  }

  if (sanitized.length < 2) {
    return { valid: false, error: "Character name must be at least 2 characters" }
  }

  if (!/^[a-zA-Z0-9\s-_]+$/.test(sanitized)) {
    return { valid: false, error: "Character name contains invalid characters" }
  }

  return { valid: true }
}
