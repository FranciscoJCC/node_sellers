const express = require('express');
const sellerRouter = require('./sellers.router');

function routerApi(app){
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/sellers',sellerRouter);
};

module.exports = routerApi;
