import { secureGet, secureRemove } from './secure-storage';

/**
 * Logs out the current user and optionally clears the remembered user
 * @param clearRemembered - Whether to clear the remembered user credentials
 */
export function logoutUser(clearRemembered = true) {
  // Remove current user
  secureRemove("statusWindowCurrentUser")

  // Clear remembered user by default
  if (clearRemembered) {
    secureRemove("statusWindowRememberedUser")
  }
}

/**
 * Checks if a user is currently logged in
 * @returns boolean indicating if a user is logged in
 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  // Use regular localStorage for this check since we just need to know if it exists
  return !!localStorage.getItem("statusWindowCurrentUser")
}

/**
 * Gets the current user's username
 * @returns string or null if no user is logged in
 */
export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null
  // For username, which is less sensitive, we can use regular localStorage
  return localStorage.getItem("statusWindowCurrentUser")
}
