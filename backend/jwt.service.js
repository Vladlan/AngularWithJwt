const jwt = require('jsonwebtoken');

const jwtSecret = 'qwerty12345678';

exports.getJWT = function(name) {
  return jwt.sign(
    {
      Name: name,
      id: 'uuidV1'
    },
    jwtSecret,
    {
      algorithm: 'HS256',
      expiresIn: 1500
    }
  );
};

exports.verifyJWT = function(token) {
  return jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return false
    }
    if (decoded) {
      return true
    }
  });
};


// module.exports = getJWT;
// module.exports = verifyJWT;

// module.exports = {
//   getJWT: getJWT,
//   verifyJWT: verifyJWT
// };
//
// exports.getJWT = getJWT;
// exports.verifyJWT = verifyJWT;
