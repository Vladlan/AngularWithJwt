const express = require('express');
const router = express.Router();
const jwtService = require('../jwt.service');
const path = require('path');

const dbFilePath = path.join(__dirname, '../db.json');
const jsonDb = require(dbFilePath);

router.post('/', authenticate, function(req, res) {
  if (!req.body) {
    console.log('smth wrong with req.body');
    console.log(req.body);
    return res.status(500).json({
      title: 'An error occurred'
    });
  }

  if (!jsonDb[req.body.email]) {
    console.log('wrong email');
    console.log(req.body.email);
    return res.status(401).json({
      title: 'Login failed',
      message: 'Invalid login email'
    });
  }

  if (jsonDb[req.body.email].password !== req.body.password) {
    console.log('wrong password');
    console.log(req.body.password);
    return res.status(401).json({
      title: 'Login failed',
      message: 'Invalid login password'
    });
  }

  if ( req.body && jsonDb[req.body.email] && jsonDb[req.body.email].password ) {
    console.log(`user ${req.body.email} loginned successfully`);
    res.status(200).json({
      message: 'Successfully Logined In',
      token: jwtService.getJWT(jsonDb[req.body.email]),
      expiresIn: 1500
    });
  }
});

//middleware
function authenticate(req, res, next) {
  next();
}

module.exports = router;
