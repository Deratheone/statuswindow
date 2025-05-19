/**
 * Safely parse JSON from a response
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
 * Fetch data with proper error handling
 */
export async function fetchData(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return await parseJsonResponse(response)
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}
