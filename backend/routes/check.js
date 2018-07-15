const express = require('express');
const router = express.Router();
const jwtService = require('../jwt.service');
const path = require('path');
const dbFilePath = path.join(__dirname, '../db.json');
const jsonDb = require(dbFilePath);

// router's middleware
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.get('/', authenticate, function(req, res) {
  let userToken = req.get('authorization');
  userToken = userToken.slice(7);

  if (jwtService.verifyAndDecodeJWT(userToken)) {
    //Maybe later user will be replaced with db
    let verifiableEmail = jwtService.verifyAndDecodeJWT(userToken).email;
    console.log(`user with token ${userToken} passed verification`);
    res.send( !!jsonDb[verifiableEmail] );
  } else {
    console.log(`user with token ${userToken} failed verification`);
    res.send(false);
  }
});


//middleware
function authenticate(req, res, next) {
  next();
}

module.exports = router;
