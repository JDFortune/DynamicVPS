const { pool } = require('./pool');

async function addName(name) {
  return pool.query("INSERT INTO testtable (name) VALUES ($1)", [name])
    .then(() => {
      return pool.query('SELECT * FROM testtable WHERE name = ($1)', [name])
        .then((result) => {
          console.log(`Successfully added ${name}.`);
          return result.rows[0];
        })
    })
    .catch((err) => console.error('Something went wrong:', err.message));
}

async function getNames() {
  let res = await pool.query("SELECT * FROM testtable;");
  return res.rows;
}

async function deleteName(id) {
  pool.query("DELETE FROM testtable WHERE id = ($1)", [id])
    .then(() => console.log('Successfully deleted') );
}



module.exports = { addName, getNames, deleteName };