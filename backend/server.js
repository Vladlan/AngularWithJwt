const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwtService = require('./jwt.service');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

let faker = require('faker');

const user = {
  name: 'Vlad',
  password: '12345',
  id: 'uuidV1'
};

app.get('/', function(req, res) {
  res.send(`Hello World!`);
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
    res.send(jwtService.verifyAndDecodeJWT(userToken).id === user.id);
  } else {
    res.send(false);
  }
});

app.post('/login', authenticate, function(req, res) {
  if (req.body) {
    res.send(
      {
        token: jwtService.getJWT(req.body.name)
      }
    )
  }
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

function authenticate(req, res, next) {
  let body = req.body;
  if (!body) {
    // res.status(400).end('no data for authentication');
    res.send(false);
  }
  if (body.name !== user.name || body.password !== user.password) {
    // res.status(401).end('Name or Password incorrect');
    res.send(false);
  }
  next();
}
