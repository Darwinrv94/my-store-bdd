const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1OTg5Mjc4Mn0.9fmAF3ddbDQsDILtvxUYywBh6HUfw6mJFDp9rI8v8oM';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const verify = verifyToken(token, secret);
console.log(verify);
