const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', function(req, res) {
  let user = faker.helpers.createCard();
  res.json(user);
});

module.exports = router;
