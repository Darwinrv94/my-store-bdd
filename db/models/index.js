const { Customer, CustomerSchama } = require('./customer.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequealize) {
  User.init(UserSchema, User.config(sequealize));
  Customer.init(CustomerSchama, Customer.config(sequealize));

  Customer.associate(sequealize.models);
}

module.exports = setupModels;
