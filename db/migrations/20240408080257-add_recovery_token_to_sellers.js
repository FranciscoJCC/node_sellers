'use strict';

const { SELLER_TABLE } = require('../models/seller.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(SELLER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(SELLER_TABLE, 'recovery_token');
  }
};
