const { Pool } = require('pg');

const pool = new Pool({
  user: 'aryanbinazir',
  database: 'aryanbinazir',
  port: 5432,
  host: '127.0.0.1',
})



module.exports = { pool };