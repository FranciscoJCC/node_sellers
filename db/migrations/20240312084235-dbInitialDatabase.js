'use strict';

const { SELLER_TABLE }  = require('./../models/seller.model');
const { PROPERTY_TABLE } = require('./../models/property.model');
const { PHOTOS_TABLE } = require('./../models/photo.model');
const { DATES_TABLE } = require('./../models/date.model');
const { NOTES_TABLE } = require('../models/note.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up : async (queryInterface, Sequelize) => {
    //CREATE TABLE SELLERS
    await queryInterface.createTable(SELLER_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING(20)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING
      },
      password: {
        allowNull: false, 
        type: Sequelize.DataTypes.STRING
      },
      active: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },
    }),

    //CREATE TABLE PROPERTIES
    await queryInterface.createTable(PROPERTY_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
        sellerId: {
        field: 'seller_id',
        allowNull: false, 
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: SELLER_TABLE,
          key: 'id'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(150),
      },
      description: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      price: {
        allowNull: false, 
        type: Sequelize.DataTypes.FLOAT(10,2)
      },
      location: {
        allowNull: false, 
        type: Sequelize.DataTypes.STRING
      },
      typeHouse: {
        field: 'type_house',
        allowNull: false,
        type: Sequelize.DataTypes.ENUM(['department','house','other'])
      },
      numberFloors: {
        field: 'number_floors',
        allowNull: false, 
        type: Sequelize.DataTypes.INTEGER
      },
      numberBedrooms: {
        field: 'number_bedrooms',
        allowNull: false, 
        type: Sequelize.DataTypes.INTEGER
      },
      numberBathrooms: {
        field: 'number_bathrooms',
        allowNull: false, 
        type: Sequelize.DataTypes.INTEGER
      },
      width: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      heigth: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      active: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }),

    //CREATE TABLE PHOTOS
    await queryInterface.createTable(PHOTOS_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      propertyId: {
        field: 'property_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PROPERTY_TABLE,
          key: 'id'
        },
      },
      url: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      main: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      active: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }),

    //CREATE TABLE DATES
    await queryInterface.createTable(DATES_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      sellerId: {
        field: 'seller_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: SELLER_TABLE,
          key: 'id'
        },
      },
      propertyId: {
        field: 'property_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PROPERTY_TABLE,
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING(150),
      },
      phone: {
        allowNull: false, 
        type: Sequelize.DataTypes.STRING(15)
      },
      email: {
        allowNull: false, 
        type: Sequelize.DataTypes.STRING(150),
      },
      date: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE
      },
      active: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }),  

    //CREATE TABLE NOTES
    await queryInterface.createTable(NOTES_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      dateId: {
        field: 'date_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: DATES_TABLE,
          key: 'id'
        },
      },
      note: {
        allowNull: false, 
        type: Sequelize.DataTypes.STRING
      },
      active: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      }
    })
  },

  down : async (queryInterface) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable(NOTES_TABLE), { transaction: t },
        queryInterface.dropTable(DATES_TABLE), { transaction: t },
        queryInterface.dropTable(PHOTOS_TABLE), { transaction: t },
        queryInterface.dropTable(PROPERTY_TABLE), { transaction: t },
        queryInterface.dropTable(SELLER_TABLE), { transaction: t },
      ]);
    });
  }
};
