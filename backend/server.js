const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

const jwtSecret = 'qwerty12345678';

app.use(cors());
app.use(bodyParser.json());

let faker = require('faker');

const user = {
  name: 'Vlad',
  password: '12345',
  id: 'uuidV1'
};

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/random-user', function (req, res) {
  let user = faker.helpers.createCard();
  res.json(user);
});

app.post('/login', authenticate, function (req, res) {
  // console.log('************************************************************');
  // console.log(req);
  // console.log('************************************************************');
  // res.send(true);

  if (req.body) {
    let token = jwt.sign(
      {
        Name: req.body.name,
        id: 'uuidV1'
      },
      jwtSecret
    );

    res.send({
      token: token
    })
  }
});

app.listen(3000, function () {
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
