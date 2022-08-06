const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  if (apiKey !== config.apiKey) {
    return next(boom.unauthorized('Invalid API key'));
  }

  return next();
}

module.exports = { checkApiKey }
