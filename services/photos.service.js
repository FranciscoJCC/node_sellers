const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PhotoService {
    constructor () {

    }

    async list() {
        const response = await models.Photo.findAll();

        return response;
    }

    async findOne(id){
        const photo = await models.Photo.findByPk(id);

        if(!photo)
            throw boom.notFound('photo not found');

        return photo;
    }

    async create(data){

        const newPhoto = await models.Photo.create(data);

        return newPhoto;
    }

    async update(id, changes){
        const photo = await this.findOne(id);

        const response = await photo.update(changes);

        return response;
    }

    async delete(id){
        const photo = await this.findOne(id);

        await photo.destroy();

        return { id };
    }
}

module.exports = PhotoService;