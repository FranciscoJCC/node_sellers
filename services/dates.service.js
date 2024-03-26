const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class DateService {
    constructor() {
         
    }

    async list(){
        const response = await models.Date.findAll({
            include: ['property','seller', 'notes']
        });

        return response;
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

        await date.destroy();

        return { id };
    }
}

module.exports = DateService;