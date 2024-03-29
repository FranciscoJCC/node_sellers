const express = require('express');
const PhotoService = require('./../../services/photos.service');
//Validator
const validatorHandler = require('./../../middelwares/validatorHandler');
const { getPhotoSchema, createPhotoSchema, updatePhotoSchema, queryPhotoSchema } = require('./../../schemas/photo.schema');

const router = express.Router();
const service = new PhotoService();

router.get('/', 
    validatorHandler(queryPhotoSchema, 'query'),
    async (req, res, next) => {
        try {
            const photos = await service.list(req.query);

            res.status(200).json(photos);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', 
    validatorHandler(getPhotoSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const photo = await service.findOne(id);

            res.status(200).json(photo);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createPhotoSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;

            const newPhoto = await service.create(data);

            res.status(201).json(newPhoto);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id', 
    validatorHandler(getPhotoSchema, 'params'),
    validatorHandler(updatePhotoSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const photo = await service.update(id, body);

            res.status(200).json(photo);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const photo = await service.delete(id);

            res.status(200).json(photo);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;