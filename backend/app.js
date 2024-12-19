const express = require('express');
const app = express();
const { pool } = require('./sql/pool');
const postgres = require('./routes/postgres');
const mongo = require('./routes/mongo');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/postgres', postgres);
app.use('/mongo', mongo);


app.listen(PORT, () => {
  console.log('Server running on port ' + String(PORT));
});

process.on('SIGINT', async() => {
  await pool.end();
  await mongoose.connection.close();
});
process.on('SIGTERM', async () => {
  await pool.end();
  await mongoose.connection.close();
});