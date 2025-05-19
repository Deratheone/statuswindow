import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Example API route
    return NextResponse.json({
      success: true,
      skills: [
        { id: 1, name: "Focused Mind", rarity: "Common" },
        { id: 2, name: "Iron Body", rarity: "Common" },
      ],
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
