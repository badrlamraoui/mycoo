import type { NextApiRequest, NextApiResponse } from 'next'
import { getPool } from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check database connection
    const pool = getPool()
    const result = await pool.query('SELECT NOW()')

    res.status(200).json({
      success: true,
      message: 'MyCOO API is healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
