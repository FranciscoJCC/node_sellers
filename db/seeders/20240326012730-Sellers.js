'use strict';
const  { SELLER_TABLE } = require('./../models/seller.model');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let sellers = [];

    for (let index = 0; index < 10; index++) {
      sellers.push(
        {
          name: faker.person.fullName(),
          phone: '3313123232',
          email: faker.internet.email(),
          password: await bcrypt.hash('Admin123', 10)
        }
      );
    }
    
    return queryInterface.bulkInsert(SELLER_TABLE,sellers);    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(SELLER_TABLE, null, {});
  }
};
