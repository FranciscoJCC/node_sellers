const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PropertyService {
    constructor() {

    }

    async list(){
        const response = await models.Property.findAll({
            include: ['seller'],
        });

        return response;
    }

    async findOne(id){
        const property = await models.Property.findByPk(id, {
            include: ['seller'],
        });

        if(!property)
            throw boom.notFound('property not found');

        return property;
    }

    async create(data){
        const property = await models.Property.create(data);

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

        await property.destroy();

        return { id };
    }
}

module.exports = PropertyService;