const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class NoteService {
    constructor() {

    }

    async list(query) {
        const options = {
            include: ['date'],
            where: {
                active: true
            },
            limit: (query.limit) ? parseInt(query?.limit) : 10,
            offset: (query.offset) ? parseInt(query?.offset) : 0
        }

        const response = await models.Note.findAll(options);

        return response;
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
        const note = this.findOne(id);

        await note.destroy();

        return { id };
    }
}

module.exports = NoteService;