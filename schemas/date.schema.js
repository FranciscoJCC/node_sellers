const Joi = require('joi');

//Definición de datos
const id = Joi.number().integer();
const sellerId = Joi.number().integer();
const propertyId = Joi.number().integer();
const name = Joi.string().max(150);
const phone = Joi.string().max(12);
const email = Joi.string().max(150);
const date = Joi.date();
const active = Joi.boolean();


const getDateSchema = Joi.object({
    id: id.required()
});

const createDateSchema = Joi.object({
    sellerId: sellerId.required(),
    propertyId: propertyId.required(),
    name: name.required(),
    phone: phone.required(),
    email: email.required(),
    date: date.required()
});

const updateDateSchema = Joi.object({
    sellerId: sellerId,
    propertyId: propertyId,
    name: name,
    phone: phone,
    email: email,
    date: date,
    active: active
});

module.exports = { getDateSchema, updateDateSchema, createDateSchema };
