const fs = require('fs')
const { Pool } = require('pg')

const schema = fs.readFileSync('./schema.psql', 'utf8')

let pool = null

const createPool = async () => {
  pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'postgres',
    port: 5432,
  })

  await pool.connect()

  await pool.query(schema)

  return pool
}

const init = async () => {
  await createPool()
}

const query = (...args) => pool.query(...args)

module.exports = {
  init,
  query,
}
