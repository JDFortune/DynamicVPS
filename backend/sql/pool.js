const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'photoapp',
  password: 'myPassword', // this is not used locally
  port: 5432,
});

module.exports = {
  pool,
}