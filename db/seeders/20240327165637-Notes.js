'use strict';
const { faker } = require('@faker-js/faker');
const { NOTES_TABLE } = require('./../models/note.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let notes = [];

    for (let index = 0; index < 100; index++) {
      notes.push(
        {
          date_id: faker.number.int({min: 1, max: 50}),
          note: faker.word.words({ count: { min: 10, max: 30}}),
        }
      );
    }

    return queryInterface.bulkInsert(NOTES_TABLE, notes);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(NOTES_TABLE, null, {});
  }
};
