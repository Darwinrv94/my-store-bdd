//const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor(){
    //this.products = [];
    //this.generate();
  }

  /*generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }*/

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }

    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;

    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;

    if (price_min && price_max) {
      if (parseFloat(price_min) > parseFloat(price_max)) {
        throw boom.badRequest('price_min must be less than price_max');
      }

      options.where.price = {
        [Op.between]: [price_min, price_max]
      }
    }

    const products = await models.Product.findAll(options);

    return products;
  }

  async findOne(id) {
    const product = models.Product.findByPk(id, {
      include: ['category']
    });

    if (!product) {
      throw boom.notFound('product not found');
    }

    return product;
    /*const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;*/
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
    /*const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];*/
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();

    return { id }
    /*const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };*/
  }

}

module.exports = ProductsService;
