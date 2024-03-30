const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class DateService {
    constructor() {
         
    }

    async list(query){

        const options = {
            include: ['property','seller', 'notes'],
            where: {
                active: true
            },
            limit: (query.limit) ? parseInt(query?.limit) : 10,
            offset: (query.offset) ? parseInt(query?.offset) : 0
        }

        const response = await models.Date.findAll(options);

        return response;
    }

    async find(id){
        const date = await models.Date.findOne({
            include: ['property','seller', 'notes'],
            where: {
                active: true,
                id: id
            }
        });

        if(!date)
            throw boom.notFound('date not found');

        return date;
    }

    async findOne(id){
        const date = await models.Date.findByPk(id);

        if(!date)
            throw boom.notFound('date not found');

        return date;
    }

    async create(data){
        const newDate = await models.Date.create(data);

        return newDate;
    }

    async update(id, changes){
        const date = await this.findOne(id);

        const response = await date.update(changes);

        return response;
    }

    async delete(id){
        const date = await this.findOne(id);

        await date.update({ active: false });

        return { id };
    }
}

module.exports = DateService;