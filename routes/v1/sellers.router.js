const express = require('express');
const passport = require('passport');
const SellerService = require('./../../services/sellers.service');
//validator
const validatorHandler = require('./../../middelwares/validatorHandler');
const verifyToken = require('../../middelwares/token.handler');
const { getSellerSchema, createSellerSchema, updateSellerSchema,queryProductSchema } = require('./../../schemas/seller.schema');

const router = express.Router();
const service = new SellerService();


router.get('/', 
    validatorHandler(queryProductSchema, 'query'),    
    async (req, res, next) => {
        try {

            const sellers = await service.list(req.query);

            res.status(200).json(sellers);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', 
    validatorHandler(getSellerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const seller = await service.find(id);

            res.status(200).json(seller);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', 
    validatorHandler(createSellerSchema, 'body'),
    async(req, res, next) => {
        try {
            const data = req.body;
            const newSeller = await service.create(data);

            res.status(201).json(newSeller);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
    validatorHandler(getSellerSchema, 'params'),    
    validatorHandler(updateSellerSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
    async (req, res, next ) => {
        try {
            const id = req.user.sub; //Obtenemos el id del token
            const idParams = req.params.id;
            const body = req.body;
            

            const seller = await service.update(id, idParams, body);

            res.status(200).json(seller);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getSellerSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
    async (req, res, next) => {
        try {
            const id = req.user.sub; //Obtenemos el id del token
            const idParams = req.params.id; 
            const seller = await service.delete(id, idParams);

            res.status(200).json({...seller, message: "your account was deleted"});
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;