const { Pool } = require('pg');

const pool = new Pool({
  user: 'aryanbinazir',
  database: 'aryanbinazir',
  port: 5433,
  host: 'localhost',
})

// password: '',

module.exports = { pool };