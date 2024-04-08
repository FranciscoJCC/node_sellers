const express = require('express');
const passport = require('passport');
const PropertyService = require('./../../services/properties.service');
//Validtor
const validatorHandler = require('./../../middelwares/validatorHandler');
const verifyToken = require('../../middelwares/token.handler');
const { getPropertySchema, updatePropertySchema, createPropertySchema, queryPropertySchema } = require('./../../schemas/property.schema');


const router = express.Router();
const service = new PropertyService();

router.get('/', 
    validatorHandler(queryPropertySchema, 'query'),
    async (req, res, next) => {
        try {
            const properties = await service.list(req.query);

            res.status(200).json(properties);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', 
    validatorHandler(getPropertySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const property = await service.find(id);

            res.status(200).json(property);
        } catch (error) {
            next(error);
        }
    } 
);

router.post('/',
    validatorHandler(createPropertySchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const data = req.body;
            const sellerId = req.user.sub; //Obtenemos el sellerId del token

            const newProperty = await service.create(data, sellerId);
            
            res.status(201).json(newProperty);
        } catch (error) {
            next(error);
        }
    }
);  

router.patch('/:id',
    validatorHandler(getPropertySchema, 'params'),
    validatorHandler(updatePropertySchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const idSeller = req.user.sub; //Obtenemos el sellerId del token
            const propertyId = req.params.id;
            const data = req.body;

            const property = await service.update(propertyId, idSeller, data);

            res.status(200).json(property);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getPropertySchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
    async (req, res, next)=> {
        try {
            const { id } = req.params;
            const property = await service.delete(id);

            res.status(200).json({...property, message: "the property was deleted"});
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;