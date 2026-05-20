import { NextResponse } from "next/server"
import { updateLeadStatus, updateLeadNotes, updateLeadOfferedPrice } from "@/lib/queries/leads"
import { cookies } from "next/headers"

async function checkAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  return token === process.env.ADMIN_SECRET
}

export async function PATCH(request, { params }) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const data = await request.json()

  try {
    if (data.status !== undefined) {
      await updateLeadStatus(id, data.status, data.note)
    }
    if (data.notes !== undefined) {
      await updateLeadNotes(id, data.notes)
    }
    if (data.offered_price !== undefined) {
      await updateLeadOfferedPrice(id, data.offered_price)
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead update error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
