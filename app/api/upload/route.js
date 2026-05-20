import { v2 as cloudinary } from "cloudinary"
import pool from "@/lib/db"
import { NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(request) {
  try {
    const formData = await request.formData()
    const leadId = formData.get("lead_id")
    const files = formData.getAll("photos")

    if (!leadId || !files.length) {
      return NextResponse.json({ error: "Missing lead_id or photos" }, { status: 400 })
    }

    const oversized = files.find((f) => f.size > MAX_FILE_SIZE)
    if (oversized) {
      return NextResponse.json({ error: "Each photo must be under 5 MB" }, { status: 400 })
    }

    const uploads = await Promise.all(
      files.slice(0, 4).map(async (file, i) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "scraply-auto", resource_type: "image", quality: "auto", fetch_format: "auto" },
            (error, result) => {
              if (error) reject(error)
              else resolve({
                url: result.secure_url,
                public_id: result.public_id,
                position: `photo_${i + 1}`,
              })
            }
          ).end(buffer)
        })
      })
    )

    await Promise.all(
      uploads.map(({ url, public_id, position }) =>
        pool.query(
          `INSERT INTO lead_photos (lead_id, position, cloudinary_url, public_id)
           VALUES ($1, $2, $3, $4)`,
          [leadId, position, url, public_id]
        )
      )
    )

    return NextResponse.json({ success: true, count: uploads.length })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
