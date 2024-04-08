const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class DateService {
    constructor() {
         
    }

    async list(query, sellerId){

        const options = {
            include: ['property','seller', 'notes'],
            where: {
                active: true,
                sellerId: sellerId
            },
            limit: (query.limit) ? parseInt(query?.limit) : 10,
            offset: (query.offset) ? parseInt(query?.offset) : 0
        }

        const response = await models.Date.findAll(options);

        return response;
    }

    async find(id, sellerId){
        const date = await models.Date.findOne({
            include: ['property','seller', 'notes'],
            where: {
                active: true,
                id: id,
                sellerId: sellerId
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

    async update(id, sellerId, changes){
        const date = await this.findOne(id);

        if(date.sellerId !== sellerId){
            throw boom.unauthorized('You don´t have permission to perform this action');
        }

        const response = await date.update(changes);

        return response;
    }

    async delete(id, sellerId){

        const date = await this.findOne(id);
        
        if(date.sellerId !== sellerId){
            throw boom.unauthorized('You don´t have permission to perform this action');
        }

        await date.update({ active: false });

        return { id };
    }
}

module.exports = DateService;