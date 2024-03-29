const Joi = require('joi');

//Definición de datos 
const id = Joi.number().integer();
const sellerId = Joi.number().integer();
const title = Joi.string().max(150);
const description = Joi.string().max(255);
const price = Joi.number();
const location = Joi.string().max(255);
const typeHouse = Joi.string().max(50);
const numberFloors = Joi.number();
const numberBedrooms = Joi.number();
const numberBathrooms = Joi.number();
const width = Joi.number();
const heigth = Joi.number();
const active = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const getPropertySchema = Joi.object({
    id: id.required()
});

const createPropertySchema = Joi.object({
    sellerId: sellerId.required(),
    title: title.required(),
    description: description,
    price: price.required(),
    location: location.required(),
    typeHouse: typeHouse.required(),
    numberFloors: numberFloors.required(),
    numberBedrooms: numberBedrooms.required(),
    numberBathrooms: numberBathrooms.required(),
    width: width.required(),
    heigth: heigth.required()
});

const updatePropertySchema = Joi.object({
    sellerId: sellerId,
    title: title,
    description: description,
    price: price,
    location: location,
    typeHouse: typeHouse,
    numberFloors: numberFloors,
    numberBedrooms: numberBedrooms,
    numberBathrooms: numberBathrooms,
    width: width,
    heigth: heigth,
    active: active
});

const queryPropertySchema = Joi.object({
    limit,
    offset
});

module.exports = { getPropertySchema, createPropertySchema, updatePropertySchema, queryPropertySchema };