const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const addUserRoute = require('./routes/addUser');
const checkRoute = require('./routes/check');
const loginRoute = require('./routes/login');
const randomUserRoute = require('./routes/random-user');

app.use(cors());
app.use(bodyParser.json());

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));


app.use('/addUser', addUserRoute);
app.use('/check', checkRoute);
app.use('/login', loginRoute);
app.use('/random-user', randomUserRoute);

app.get('/', function(req, res) {
  res.send(`Hello World!`);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
