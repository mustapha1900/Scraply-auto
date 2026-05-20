import pool from "@/lib/db"

export async function getLeadsStats() {
  const [total, byStatus, recent] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS count FROM leads"),
    pool.query("SELECT status, COUNT(*)::int AS count FROM leads GROUP BY status ORDER BY count DESC"),
    pool.query("SELECT id, first_name, phone, city, vehicle_year, vehicle_make, vehicle_model, status, created_at FROM leads ORDER BY created_at DESC LIMIT 5"),
  ])
  return {
    total: total.rows[0].count,
    byStatus: byStatus.rows,
    recent: recent.rows,
  }
}

export async function createLead(data) {
  const {
    firstName, lastName, phone, email, city,
    year, make, model, trim, mileage,
    condition, isRunning, message,
  } = data

  const result = await pool.query(
    `INSERT INTO leads
      (first_name, last_name, phone, email, city, vehicle_year, vehicle_make,
       vehicle_model, vehicle_trim, mileage, condition, is_running, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [
      firstName, lastName || null, phone, email || null, city,
      year ? parseInt(year) : null, make, model,
      trim || null, mileage || null, condition,
      isRunning === "yes" ? true : isRunning === "no" ? false : null,
      message || null,
    ]
  )
  return result.rows[0]
}

export async function getAllLeads({ status, limit = 50, offset = 0 } = {}) {
  const conditions = []
  const values = []

  if (status) {
    conditions.push(`status = $${values.length + 1}`)
    values.push(status)
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""
  values.push(limit, offset)

  const result = await pool.query(
    `SELECT * FROM leads
     ${where}
     ORDER BY created_at DESC
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  )
  return result.rows
}

export async function getLeadById(id) {
  const result = await pool.query("SELECT * FROM leads WHERE id = $1", [id])
  return result.rows[0] || null
}

export async function updateLeadStatus(id, newStatus, note, userId) {
  const lead = await getLeadById(id)
  if (!lead) return null

  await pool.query(
    `UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2`,
    [newStatus, id]
  )

  await pool.query(
    `INSERT INTO lead_status_history (lead_id, old_status, new_status, changed_by, note)
     VALUES ($1, $2, $3, $4, $5)`,
    [id, lead.status, newStatus, userId || null, note || null]
  )

  return getLeadById(id)
}

export async function updateLeadNotes(id, notes) {
  const result = await pool.query(
    `UPDATE leads SET internal_notes = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [notes, id]
  )
  return result.rows[0] || null
}

export async function updateLeadOfferedPrice(id, offeredPrice) {
  const result = await pool.query(
    `UPDATE leads SET offered_price = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [offeredPrice ?? null, id]
  )
  return result.rows[0] || null
}

export async function getLeadPhotos(leadId) {
  const result = await pool.query(
    "SELECT * FROM lead_photos WHERE lead_id = $1 ORDER BY position",
    [leadId]
  )
  return result.rows
}

export async function createContactMessage(data) {
  const { name, email, phone, message } = data
  const result = await pool.query(
    `INSERT INTO contact_messages (name, email, phone, message)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, email, phone || null, message]
  )
  return result.rows[0]
}
