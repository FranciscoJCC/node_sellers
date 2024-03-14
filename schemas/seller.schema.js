const Joi = require('joi');

//Definición datos
const id = Joi.number().integer();


const getSellerSchema = Joi.object({
    id: id.required()
});

module.exports = { getSellerSchema };