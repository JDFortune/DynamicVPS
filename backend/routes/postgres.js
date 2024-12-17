const express = require('express');
const router = express.Router();
const { addName, getNames, deleteName } = require('../sql/postgresAPI');


router.get('/', (_req, res) => {
  getNames()
    .then((rows) => {
      res.send(rows);
    });
});

router.post('/new', (req, res) => {
  let name = req.body.name;
  addName(name)
    .then((response) => {
      res.status(201).send(response)
  });
});

router.post('/remove', (req, res) => {
  let id = Number(req.body.id);

  if (id) {
    deleteName(id)
      .then((response) => res.send(response))
      .catch((error) => console.error(error.message));
  }
});

module.exports = router;