const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const ProductService = require('./product.service');

const productService = new ProductService();
class OrderService {

  constructor(){
  }

  async create(data) {
    return await models.Order.create(data);
  }

  async find() {
    return await models.Order.findAll({
      include: [{
        association: 'customer',
        include: ['user']
      }]
    });
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
    ]
    });

    if (!order) {
      throw boom.notFound('order not found');
    }

    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });

    return orders;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

  async addItem(data) {
    const product = await productService.findOne(data.productId);

    if (!product) {
      throw boom.notFound('product not found');
    }

    return await models.OrderProduct.create(data);
  }
}

module.exports = OrderService;
