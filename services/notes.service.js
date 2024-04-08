const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('./../libs/sequelize');

class NoteService {
    constructor() {

    }

    async list(query, sellerId) {
        const options = {
            include: [{
                model: models.Date,
                as: 'date',
                where: {
                    sellerId: sellerId
                }
            }],
            where: {
                active: true
            },
            limit: (query.limit) ? parseInt(query?.limit) : 10,
            offset: (query.offset) ? parseInt(query?.offset) : 0
        }

        const response = await models.Note.findAll(options);

        return response;
    }

    async find(id) {
        const note = await models.Note.findOne({
            where: {
                active: true,
                id: id
            }
        });

        if(!note)
            throw boom.notFound('note not found');

        return note;
    }

    async findOne(id) {
        const note = await models.Note.findByPk(id);

        if(!note)
            throw boom.notFound('note not found');

        return note;
    }

    async create(data){
        const newNote = await models.Note.create(data);

        return newNote;
    }

    async update(id, changes){
        const note = await this.findOne(id);

        const response = await note.update(changes);

        return response;
    }

    async delete(id){
        const note = await this.findOne(id);

        await note.update({active: false});

        return { id };
    }
}

module.exports = NoteService;