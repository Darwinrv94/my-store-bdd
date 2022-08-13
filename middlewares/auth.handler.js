const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  if (apiKey !== config.apiKey) {
    return next(boom.unauthorized('Invalid API key'));
  }

  return next();
}

function checkAdminRole(req, res, next) {
  const user = req.user;

  if (user.role !== 'admin') {
    return next(boom.unauthorized('Unauthorized'));
  }

  return next();
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;

    if (!roles.includes(user.role)) {
      return next(boom.unauthorized('Unauthorized'));
    }

    return next();
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
