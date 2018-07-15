const express = require('express');
const router = express.Router();
const faker = require('faker');
const jwtService = require('../jwt.service');
const path = require('path');
const dbFilePath = path.join(__dirname, '../db.json');
const jsonDb = require(dbFilePath);

router.get('/', function(req, res) {

  let userToken = req.get('authorization');
  userToken = userToken.slice(7);

  if (jwtService.verifyAndDecodeJWT(userToken)) {
    //Maybe later user will be replaced with db
    let verifiableEmail = jwtService.verifyAndDecodeJWT(userToken).email;
    console.log(`user with token ${userToken} passed verification`);
    if (!!jsonDb[verifiableEmail] ) {
      let user = faker.helpers.createCard();
      res.json(user);
    }
  } else {
    console.log(`user with token ${userToken} failed verification`);
    res.send(false);
  }
});

module.exports = router;
