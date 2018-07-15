const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwtService = require('./jwt.service');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const jsonFile = require('jsonfile');
const dbFilePath = path.join(__dirname, './db.json');
const jsonDb = require(dbFilePath);


app.use(cors());
app.use(bodyParser.json());

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
  {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

let faker = require('faker');

app.get('/', function(req, res) {
  res.send(`Hello World!`);
});

app.post('/addUser', authenticate, function(req, res) {
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

app.get('/random-user', function(req, res) {
  let user = faker.helpers.createCard();
  res.json(user);
});

app.get('/check', function(req, res) {
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

app.post('/login', authenticate, function(req, res) {
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
      error: {message: 'Invalid login email'}
    });
  }

  if (jsonDb[req.body.email].password !== req.body.password) {
    console.log('wrong password');
    console.log(req.body.password);
    return res.status(401).json({
      title: 'Login failed',
      error: {message: 'Invalid login password'}
    });
  }

  if ( req.body && jsonDb[req.body.email] && jsonDb[req.body.email].password ) {
    console.log(`user ${req.body.email} loginned successfully`);
    res.status(200).json({
      message: 'Successfully Logined In',
      token: jwtService.getJWT(jsonDb[req.body.email])
    });
  }
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
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
