import pool from "@/lib/db"

export async function getAllServiceAreas() {
  const result = await pool.query(
    "SELECT * FROM service_areas WHERE is_active = TRUE ORDER BY name ASC"
  )
  return result.rows
}

export async function getServiceAreaBySlug(slug) {
  const result = await pool.query(
    "SELECT * FROM service_areas WHERE slug = $1 AND is_active = TRUE",
    [slug]
  )
  return result.rows[0] || null
}
