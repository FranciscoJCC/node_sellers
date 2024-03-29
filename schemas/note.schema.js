const Joi = require('joi');

//Definición de datos 
const id = Joi.number().integer();
const dateId = Joi.number().integer();
const note = Joi.string().max(255);
const active = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

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

const queryNoteSchema = Joi.object({
    limit,
    offset
});

module.exports = { getNoteSchema, createNoteSchema, updateNoteSchema, queryNoteSchema };