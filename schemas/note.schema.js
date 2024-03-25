const Joi = require('joi');

//Definición de datos 
const id = Joi.number().integer();
const dateId = Joi.number().integer();
const note = Joi.string().max(255);
const active = Joi.boolean();

const getNoteSchema = Joi.object({
    id: id.required()
});

const createNoteSchema = Joi.object({
    dateId: dateId.required(),
    note: note.required()
});

const updateNoteSchema = Joi.object({
    id: id,
    dateId: dateId,
    note: note,
    active: active
});

module.exports = { getNoteSchema, createNoteSchema, updateNoteSchema };