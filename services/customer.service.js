const boom = require('@hapi/boom');
const { models } = require('../libs/sequealize.js')

class CustomerService {

  constructor() {}

  async find() {
    return await models.Customer.findAll({
      include: ['user']
    });
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound('customer not found');
    }

    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });

    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);

    return await model.update(changes);
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();

    return { rta: true };
  }

}

module.exports = CustomerService;
