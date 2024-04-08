const express = require('express');
const passport = require('passport');
const NoteService = require('../../services/notes.service');
//Validator
const validatorHandler = require('./../../middelwares/validatorHandler');
const verifyToken = require('./../../middelwares/token.handler');
const { getNoteSchema, createNoteSchema, updateNoteSchema, queryNoteSchema } = require('./../../schemas/note.schema');

const router = express.Router();
const service = new NoteService();

router.get('/', 
    validatorHandler(queryNoteSchema, 'query'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
    async(req, res, next) => {
        try {

            const sellerId = req.user.sub; //Obtenemos el sellerId del token

            const notes = await service.list(req.query, sellerId);

            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getNoteSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            const sellerId = req.params; //Obtenemos el sellerId del token

            const note = await service.find(id, sellerId);

            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createNoteSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false}),
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
    verifyToken, 
    passport.authenticate('jwt', { session: false}),
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
    verifyToken,
    passport.authenticate('jwt', {session: false}),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const note = await service.delete(id);

            res.status(200).json({...note, message: "the note was deleted"});
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;