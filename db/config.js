const { CONFIG }  = require('./../config/config');

const USER = encodeURIComponent(CONFIG.dbUser);
const PASSWORD = encodeURIComponent(CONFIG.dbPassword);

const URI = `mysql://${USER}:${PASSWORD}@${CONFIG.dbHost}:${CONFIG.dbPort}/${CONFIG.dbName}`;

module.exports = {
    development : {
        url: URI,
        dialect: 'mysql'
    },
    production : {
        url: URI,
        dialect: 'mysql'
    }
};

