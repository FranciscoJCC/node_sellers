const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PhotoService {
    constructor () {

    }

    async list(query) {

        const options = {
            where: {
                active: true
            },
            limit: (query.limit) ? parseInt(query?.limit) : 10,
            offset: (query.offset) ? parseInt(query?.offset) : 0
        };

        const response = await models.Photo.findAll(options);

        return response;
    }

    async find(id){
        const photo = await models.Photo.findOne({
            where: {
                active: true,
                id: id
            }
        });

        if(!photo)
            throw boom.notFound('photo not found');

        return photo;
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

        await photo.update({ active: false});

        return { id };
    }
}

module.exports = PhotoService;