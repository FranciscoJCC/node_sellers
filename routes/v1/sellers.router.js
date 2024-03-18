const express = require('express');
const SellerService = require('./../../services/sellers.service');
//validator
const validatorHandler = require('./../../middelwares/validatorHandler');
const { getSellerSchema, createSellerSchema, updateSellerSchema } = require('./../../schemas/seller.schema');

const router = express.Router();
const service = new SellerService();


router.get('/', async (req, res, next) => {
    try {
        const sellers = await service.list();

        res.status(200).json(sellers);
    } catch (error) {
        next(error);
    }
});

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
    async (req, res, next ) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const seller = await service.update(id, body);

            res.status(200).json(seller);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', 
    validatorHandler(getSellerSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const seller = await service.delete(id);

            res.status(200).json(seller);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;