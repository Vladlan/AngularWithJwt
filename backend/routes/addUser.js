const express = require('express');
const router = express.Router();
const jwtService = require('../jwt.service');
const path = require('path');

const jsonFile = require('jsonfile');
const dbFilePath = path.join(__dirname, '../db.json');
const jsonDb = require(dbFilePath);

router.post('/', authenticate, function(req, res) {
  if (!req.body) {
    console.log('smth wrong with req.body');
    console.log(req.body);
    return res.status(401).json({
      title: 'Sign In failed',
      error: {message: 'Wrong request body.'}
    });
  }

  if (jsonDb[req.body.email]) {
    console.log('this email already exist');
    console.log(req.body.email);
    return res.status(401).json({
      title: 'Sign In failed',
      error: {message: 'This email already exists.'}
    });
  }

  if (req.body && !jsonDb[req.body.email]) {
    let uuidRandom = 'uuid' + Math.random() * 10;

    let newUser = {
      email: req.body.email,
      surname: req.body.surname,
      name: req.body.name,
      password: req.body.password,
      uuid: uuidRandom
    };

    jsonDb[req.body.email] = newUser;

    jsonFile.writeFile(dbFilePath, jsonDb, {spaces: 2},
      function(err) {
        console.error(err);
    });

    res.status(200).json({
      message: 'Successfully Signed In',
      token: jwtService.getJWT(newUser)
    });
  }
});



//middleware
function authenticate(req, res, next) {
  // let body = req.body;
  // if (!body) {
  //   // res.status(400).end('no data for authentication');
  //   res.send(false);
  // }
  // if (body.name !== user.name || body.password !== user.password) {
  //   // res.status(401).end('Name or Password incorrect');
  //   res.send(false);
  // }
  next();
}

module.exports = router;
