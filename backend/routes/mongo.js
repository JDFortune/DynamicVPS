const express = require('express');
const router = express.Router();
const mongo = require('../mongodb/mongoAPI');


router.get('/', (_req, res) => {
  mongo.getNames()
    .then((rows) => {
      res.send(rows);
    });
});

router.post('/new', (req, res) => {
  let name = req.body;
  mongo.addName(name)
    .then((response) => {
      res.status(201).send(response)
  });
});

router.post('/remove', (req, res) => {

  try {
    mongo.deleteName(req.body.id)
      .then((response) => res.send(response))
      .catch((error) => console.error(error.message));
  } catch (err) {
    console.error('Something went wrong:', err);
  }
});

module.exports = router;