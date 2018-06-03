let express = require('express');
let cors = require('cors');
let app = express();

app.use(cors());

let faker = require('faker');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/random-user', function(req, res) {
  let user = faker.helpers.createCard();
  res.json(user);
});

app.post('/login', authenticate, function(req, res) {

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function authenticate(req, res, next) {

}
