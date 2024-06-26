const Joi = require('joi');

//Definición datos
const id = Joi.number().integer();
const name = Joi.string().min(5).max(150);
const phone = Joi.string().min(10).max(13);
const email = Joi.string().min(5).max(80);
const password = Joi.string().min(10).max(255);
const active = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const getSellerSchema = Joi.object({
    id: id.required()
});

const createSellerSchema = Joi.object({
    name: name.required(),
    phone: phone.required(),
    email: email.required(),
    password: password.required()
});

const updateSellerSchema = Joi.object({
    name: name,
    phone: phone,
    email: email,
    password: password,
    active: active
});

const queryProductSchema = Joi.object({
    limit,
    offset
})

module.exports = { getSellerSchema, createSellerSchema, updateSellerSchema, queryProductSchema };