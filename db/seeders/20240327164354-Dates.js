'use strict';
const { faker } = require('@faker-js/faker');
const { DATES_TABLE } = require('./../models/date.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dates = [];

    for (let index = 0; index < 50; index++) {
      dates.push(
        {
          seller_id: faker.number.int({min: 1, max: 10}),
          property_id: faker.number.int({min: 1, max: 10}),
          name: faker.person.fullName(),
          phone: '33-12-55-58',
          email: faker.internet.email(),
          date: faker.date.future()
        }
      );
    }

    return queryInterface.bulkInsert(DATES_TABLE, dates);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(DATES_TABLE, null, {});
  }
};
