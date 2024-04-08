const Joi = require('joi');

//Definición de datos
const email = Joi.string().email();
const token = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
const password = Joi.string().min(8);

const recoverySchema = Joi.object({
    email: email.required()
});

module.exports = { recoverySchema };