require('dotenv').config();

const CONFIG = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3001,
}

module.exports = { CONFIG };