import { NextResponse } from "next/server"
import { createLead } from "@/lib/queries/leads"

export async function POST(request) {
  try {
    const data = await request.json()

    const { firstName, phone, city, year, make, model } = data

    if (!firstName || !phone || !city || !year || !make || !model) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const lead = await createLead(data)
    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
  } catch (error) {
    console.error("Quote API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
