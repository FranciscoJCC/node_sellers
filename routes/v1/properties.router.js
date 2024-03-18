const express = require('express');
const PropertyService = require('./../../services/properties.service');
//Validtor
const validatorHandler = require('./../../middelwares/validatorHandler');
const { getPropertySchema, updatePropertySchema, createPropertySchema } = require('./../../schemas/property.schema');

const router = express.Router();
const service = new PropertyService();

router.get('/', async (req, res, next) => {
    try {
        const properties = await service.list();

        res.status(200).json(properties)
    } catch (error) {
        next(error);
    }
});

router.get('/:id', 
    validatorHandler(getPropertySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const property = await service.findOne(id);

            res.status(200).json(property);
        } catch (error) {
            next(error);
        }
    } 
);

router.post('/',
    validatorHandler(createPropertySchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;

            const newProperty = await service.create(data);

            res.status(201).json(newProperty);
        } catch (error) {
            next(error);
        }
    }
);  

router.patch('/:id',
    validatorHandler(getPropertySchema, 'params'),
    validatorHandler(updatePropertySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const property = await service.update(id, data);

            res.status(200).json(property);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getPropertySchema, 'params'),
    async (req, res, next)=> {
        try {
            const { id } = req.params;
            const property = await service.delete(id);

            res.status(200).json(property);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;