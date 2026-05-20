import { NextResponse } from "next/server"

function getAdminUsers() {
  // Support multiple admins via ADMIN_USERS JSON array
  if (process.env.ADMIN_USERS) {
    try {
      return JSON.parse(process.env.ADMIN_USERS)
    } catch {
      console.error("ADMIN_USERS is not valid JSON")
    }
  }
  // Fallback to single admin (backward compatible)
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    return [{ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }]
  }
  return []
}

export async function POST(request) {
  const { email, password } = await request.json()

  const users = getAdminUsers()
  const match = users.find(
    (u) => u.email === email && u.password === password
  )

  if (!match) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set("admin_session", process.env.ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return response
}
