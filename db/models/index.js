const { User, UserSchema } = require('./user.model');

function setupModels(sequealize) {
  User.init(UserSchema, User.config(sequealize));
}

module.exports = setupModels;
