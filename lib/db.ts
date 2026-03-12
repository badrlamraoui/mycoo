import { Pool } from 'pg'

let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }
  return pool
}

export async function query(
  text: string,
  params?: any[]
): Promise<any> {
  const pool = getPool()
  return pool.query(text, params)
}

export async function getUser(userId: string) {
  const result = await query(
    'SELECT * FROM "user" WHERE id = $1',
    [userId]
  )
  return result.rows[0] || null
}

export async function getProject(projectId: string, userId: string) {
  const result = await query(
    'SELECT * FROM projects WHERE id = $1 AND "userId" = $2',
    [projectId, userId]
  )
  return result.rows[0] || null
}

export async function getUserProjects(userId: string) {
  const result = await query(
    'SELECT * FROM projects WHERE "userId" = $1 ORDER BY "createdAt" DESC',
    [userId]
  )
  return result.rows
}

export async function createProject(
  userId: string,
  projectData: {
    id: string
    name: string
    description?: string
    status?: string
  }
) {
  const result = await query(
    'INSERT INTO projects (id, "userId", name, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [projectData.id, userId, projectData.name, projectData.description || null, projectData.status || 'active']
  )
  return result.rows[0]
}

export async function updateProject(
  projectId: string,
  userId: string,
  updates: {
    name?: string
    description?: string
    status?: string
  }
) {
  const setClauses = Object.keys(updates)
    .map((key, i) => `"${key}" = $${i + 1}`)
    .join(', ')

  const result = await query(
    `UPDATE projects SET ${setClauses}, "updatedAt" = NOW() WHERE id = $${Object.keys(updates).length + 1} AND "userId" = $${Object.keys(updates).length + 2} RETURNING *`,
    [...Object.values(updates), projectId, userId]
  )
  return result.rows[0]
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}
