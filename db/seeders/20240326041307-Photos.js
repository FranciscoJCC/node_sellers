'use strict';
const { PHOTOS_TABLE } = require('./../models/photo.model');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let photos = [];

    for (let index = 0; index < 50; index++) {
      photos.push(
        {
          property_id: faker.number.int({ min: 1, max: 30 }),
          url: "https://picsum.photos/seed/picsum/500/500",
          main: false
        }
      );
    }

    return queryInterface.bulkInsert(PHOTOS_TABLE, photos);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(PHOTOS_TABLE, null, {});
  }
};
