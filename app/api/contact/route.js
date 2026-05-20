import { NextResponse } from "next/server"
import { createContactMessage } from "@/lib/queries/leads"

export async function POST(request) {
  try {
    const data = await request.json()

    const { name, email, message } = data

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const record = await createContactMessage(data)
    return NextResponse.json({ success: true, id: record.id }, { status: 201 })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
