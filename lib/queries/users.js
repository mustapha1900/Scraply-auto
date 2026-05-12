import pool from "@/lib/db"

export async function getUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )
  return result.rows[0] || null
}

export async function getUserById(id) {
  const result = await pool.query(
    "SELECT id, email, name, role, created_at FROM users WHERE id = $1",
    [id]
  )
  return result.rows[0] || null
}

export async function createUser({ email, password, name, role = "admin" }) {
  const result = await pool.query(
    `INSERT INTO users (email, password, name, role)
     VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at`,
    [email, password, name || null, role]
  )
  return result.rows[0]
}
