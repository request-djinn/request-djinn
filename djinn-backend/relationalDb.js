const { Pool } = require('pg');

const pool = new Pool({
  user: 'aryanbinazir',
  database: 'aryanbinazir',
  port: 5432,
  password: '',
  host: 'localhost',
})



module.exports = { pool };