const express = require('express');
const app = express();
const { pool } = require('./sql/pool');
const postgres = require('./routes/postgres');
const cors = require('cors');

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/', postgres);


app.listen(PORT, () => {
  console.log('Server running on port ' + String(PORT));
});

process.on('SIGIT', () => pool.end());
process.on('SIGTERM', () => pool.end());