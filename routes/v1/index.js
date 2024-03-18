const express = require('express');
const sellerRouter = require('./sellers.router');
const propertyRouter = require('./properties.router');

function routerApi(app){
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/sellers',sellerRouter);
    router.use('/properties', propertyRouter);
};

module.exports = routerApi;
