const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object().keys({
  id: id.required()
});

const createOrderSchema = Joi.object().keys({
  customerId: customerId.required()
});

const addItemSchema = Joi.object().keys({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema }
