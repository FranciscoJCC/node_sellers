const express = require('express');
const NoteService = require('../../services/notes.service');
//Validator
const validatorHandler = require('./../../middelwares/validatorHandler');
const { getNoteSchema, createNoteSchema, updateNoteSchema, queryNoteSchema } = require('./../../schemas/note.schema');

const router = express.Router();
const service = new NoteService();

router.get('/', 
    validatorHandler(queryNoteSchema, 'query'),
    async(req, res, next) => {
        try {
            const notes = await service.list(req.query);

            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getNoteSchema, 'params'),
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            const note = await service.findOne(id);

            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createNoteSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;

            const newNote = await service.create(data);

            res.status(201).json(newNote);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getNoteSchema, 'params'),
    validatorHandler(updateNoteSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;

            const note = await service.update(id, data);

            res.status(200).json(note);
        } catch (error) {
            next(error);   
        }
    }
);

router.delete('/:id', 
    validatorHandler(getNoteSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const note = await service.delete(id);

            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;