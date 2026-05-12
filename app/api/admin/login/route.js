import { NextResponse } from "next/server"

export async function POST(request) {
  const { email, password } = await request.json()

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
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
