const express = require('express');
const DateService = require('./../../services/dates.service');
//Validator
const validatorHandler = require('./../../middelwares/validatorHandler');
const { getDateSchema, createDateSchema, updateDateSchema, queryDateSchema } = require('./../../schemas/date.schema');

const router = express.Router();
const service = new DateService();

router.get('/', 
    validatorHandler(queryDateSchema, 'query'),
    async (req, res, next) => {
        try {
            const dates = await service.list(req.query);

            res.status(200).json(dates)
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', 
    validatorHandler(getDateSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const date = await service.findOne(id);

            res.status(200).json(date);
        } catch (error) {
            next(error);
        }
    } 
);

router.post('/', 
    validatorHandler(createDateSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;
            
            const newDate = await service.create(data);

            res.status(201).json(newDate);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getDateSchema, 'params'),
    validatorHandler(updateDateSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const date = await service.update(id, data);

            res.status(200).json(date);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getDateSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const date = await service.delete(id);

            res.status(200).json(date);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;