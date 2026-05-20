import { getAllLeads } from "@/lib/queries/leads"
import { cookies } from "next/headers"

async function checkAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  return token === process.env.ADMIN_SECRET
}

const COLUMNS = [
  "id", "first_name", "last_name", "phone", "email", "city",
  "vehicle_year", "vehicle_make", "vehicle_model", "vehicle_trim",
  "mileage", "condition", "is_running", "status", "offered_price",
  "internal_notes", "created_at",
]

function escapeCsv(value) {
  if (value == null) return ""
  const str = String(value)
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET() {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 401 })
  }

  const leads = await getAllLeads({ limit: 10000 })

  const rows = leads.map((lead) => COLUMNS.map((col) => escapeCsv(lead[col])).join(","))
  const csv = [COLUMNS.join(","), ...rows].join("\n")
  const date = new Date().toISOString().slice(0, 10)

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="scraply-leads-${date}.csv"`,
    },
  })
}
