import { NextResponse } from "next/server"

// NHTSA API — models filtered by year + make
// Usage: /api/vehicles?cmd=getModels&year=2020&make=Honda

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const cmd = searchParams.get("cmd")
  const year = searchParams.get("year")
  const make = searchParams.get("make")

  if (cmd !== "getModels" || !year || !make) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  try {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`
    const res = await fetch(url, { next: { revalidate: 86400 } })
    const data = await res.json()
    const models = data.Results.map((r) => r.Model_Name).sort()
    return NextResponse.json({ models })
  } catch (error) {
    console.error("Vehicles API error:", error)
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 })
  }
}
