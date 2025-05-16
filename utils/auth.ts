/**
 * Logs out the current user and optionally clears the remembered user
 * @param clearRemembered - Whether to clear the remembered user credentials
 */
export function logoutUser(clearRemembered = false) {
  // Remove current user
  localStorage.removeItem("statusWindowCurrentUser")

  // Optionally clear remembered user
  if (clearRemembered) {
    localStorage.removeItem("statusWindowRememberedUser")
  }
}

/**
 * Checks if a user is currently logged in
 * @returns boolean indicating if a user is logged in
 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("statusWindowCurrentUser")
}

/**
 * Gets the current user's username
 * @returns string or null if no user is logged in
 */
export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("statusWindowCurrentUser")
}
