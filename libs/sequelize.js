const { Sequelize }  = require('sequelize');

const { CONFIG }  = require('./../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(CONFIG.dbUser);
const PASSWORD = encodeURIComponent(CONFIG.dbPassword);

const URI = `mysql://${USER}:${PASSWORD}@${CONFIG.dbHost}:${CONFIG.dbPort}/${CONFIG.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    logging: console.log 
});

setupModels(sequelize);

module.exports = sequelize;