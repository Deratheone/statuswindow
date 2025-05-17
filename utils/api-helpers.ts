/**
 * Helper functions for API requests
 */

/**
 * Safely parse JSON from a response
 * @param response - The fetch response object
 * @returns The parsed JSON data
 */
export async function parseJsonResponse(response: Response) {
  try {
    return await response.json()
  } catch (error) {
    console.error("Error parsing JSON response:", error)
    throw new Error("Failed to parse response")
  }
}

/**
 * Fetch data with error handling
 * @param url - The URL to fetch from
 * @param options - Fetch options
 * @returns The parsed response data
 */
export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}
