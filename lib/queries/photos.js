import pool from "@/lib/db"

export async function addLeadPhoto({ leadId, position, cloudinaryUrl, publicId }) {
  const result = await pool.query(
    `INSERT INTO lead_photos (lead_id, position, cloudinary_url, public_id)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [leadId, position, cloudinaryUrl, publicId || null]
  )
  return result.rows[0]
}

export async function getPhotosByLeadId(leadId) {
  const result = await pool.query(
    "SELECT * FROM lead_photos WHERE lead_id = $1 ORDER BY position",
    [leadId]
  )
  return result.rows
}

export async function deletePhoto(id) {
  await pool.query("DELETE FROM lead_photos WHERE id = $1", [id])
}
