const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function migrate() {
  const schemaPath = path.join(__dirname, '../db/schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf-8')

  try {
    console.log('🔄 Running database migrations...')
    await pool.query(schema)
    console.log('✅ Database schema created successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()
