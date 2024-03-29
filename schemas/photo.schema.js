const Joi = require('joi');

//Definición de datos
const id = Joi.number().integer();
const propertyId = Joi.number().integer();
const url = Joi.string().max(255);
const main = Joi.boolean();
const active = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

//Schemas
const getPhotoSchema = Joi.object({
    id: id.required()
});

const createPhotoSchema = Joi.object({
    propertyId: propertyId.required(),
    url: url.required()
});

const updatePhotoSchema = Joi.object({
    url: url.required(),
    main: main,
    active: active
});

const queryPhotoSchema = Joi.object({
    limit,
    offset
});

module.exports = { getPhotoSchema, createPhotoSchema, updatePhotoSchema, queryPhotoSchema };
