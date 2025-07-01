const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'admin',
  database: process.env.PG_DATABASE || 'sdptl_user',
  ssl: process.env.PG_SSL === 'true' || false,
});

module.exports = pool; 