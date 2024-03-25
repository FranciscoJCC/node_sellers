const express = require('express');
const sellerRouter = require('./sellers.router');
const propertyRouter = require('./properties.router');
const photoRouter = require('./photos.router');
const dateRouter = require('./dates.router');
const noteRouter = require('./notes.router');

function routerApi(app){
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/sellers',sellerRouter);
    router.use('/properties', propertyRouter);
    router.use('/photos', photoRouter);
    router.use('/dates', dateRouter);
    router.use('/notes', noteRouter);
};

module.exports = routerApi;
