const { Pool } = require('pg');

const pool = new Pool({
  user: 'reqdjinn2',
  database: 'reqdjinn',
  port: 5432,
  password: 'reqdjinn',
  host: 'localhost',
})



module.exports = { pool };