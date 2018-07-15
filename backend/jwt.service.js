const jwt = require('jsonwebtoken');

const jwtSecret = 'qwerty12345678';

const user = {
  "email": "lanvlad@mail.ru",
  "surname": "Lan",
  "name": "Vlad1",
  "password": "12345",
  "uuid": "uuid3.0251152614430366"
};

exports.getJWT = function(someUser) {
  return jwt.sign(
    {
      email: someUser.email,
      name: someUser.name,
      id: someUser.uuid
    },
    jwtSecret,
    {
      algorithm: 'HS256',
      expiresIn: 1500
    }
  );
};

exports.verifyAndDecodeJWT = function(token) {
  return jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return false
    }
    if (decoded) {
      return decoded
    }
  });
};
