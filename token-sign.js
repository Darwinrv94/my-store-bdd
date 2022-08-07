const jwt = require('jsonwebtoken');

const secret = 'myCat';
const payload =  {
  sub: 1,
  role: 'customer'
}

function signToken(payload) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload);
console.log(token);
