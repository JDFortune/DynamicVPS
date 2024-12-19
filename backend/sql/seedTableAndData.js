const { pool } = require('./pool');
const { addName } = require('./postgresAPI');
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'schema.sql');

fs.readFile(schemaPath, 'utf-8', async (err, data) => {
  try {
    await pool.query(data);
    await addName('Chelsea');
    await addName('JD');
    await addName('Richard');
    await addName('Satya');
    await pool.end();
  } catch (err) {
    console.log('Something happened:', err.message);
  }
})

process.on('SIGINT', () => pool.end());
process.on('SIGTERM', () => pool.end());