'use strict';
const { PROPERTY_TABLE } = require('./../models/property.model');
const { faker } = require('@faker-js/faker');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let properties = [];

    for (let index = 0; index < 30; index++) {
      properties.push(
        {
          seller_id: faker.number.int({min: 1, max: 10}),
          title: faker.word.words({ count: { min: 3, max: 10}}),
          description: faker.word.words({ count: { min: 10, max: 30}}),
          price: faker.commerce.price({ min: 1000000, max: 6000000 }),
          location: faker.location.ordinalDirection(),
          type_house: 'house',
          number_floors: faker.number.int({min: 1, max: 2}),
          number_bedrooms: faker.number.int({min: 1, max: 2}),
          number_bathRooms: faker.number.int({min: 1, max: 3}),
          width: faker.number.int({min: 5, max: 15}),
          heigth: faker.number.int({min: 15, max: 30})
        }
      );
    }



    return queryInterface.bulkInsert(PROPERTY_TABLE, properties);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(PROPERTY_TABLE, null, {});
  }
};
