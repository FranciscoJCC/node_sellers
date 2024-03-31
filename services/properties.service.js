const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PropertyService {
    constructor() {

    }

    async list(query){

        const options = {
            include: ['seller', 'photos', 'dates'],
            where: {
                active: true
            },
            limit: (query.limit) ? parseInt(query?.limit) : 10,
            offset: (query.offset) ? parseInt(query?.offset) : 0
        }

        const response = await models.Property.findAll(options);

        return response;
    }

    async find(id){
        const response = await models.Property.findOne({
            include: ['seller', 'photos', 'dates'],
            where: {
                active: true,
                id: id
            }
        });

        if(!response)
            throw boom.notFound('property not found');

        return response;
    }

    async findOne(id){
        const property = await models.Property.findByPk(id);

        if(!property)
            throw boom.notFound('property not found');

        return property;
    }

    async create(data){

        const property = await models.Property.create(data, {
            include: ['photos']
        });

        return property;
    }

    async update(id, changes){

        //Consultamos la propiedad, ya se valida existencia
        const property = await this.findOne(id);

        const response = await property.update(changes);

        return response;
    }

    async delete(id) {
        //Validamos que exista 
        const property = await this.findOne(id);

        await property.update({ active: false});

        return { id };
    }
}

module.exports = PropertyService;