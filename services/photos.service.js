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

    async create(data, sellerIdToken){
        
        //Validamos la propiedad de las fotos
        await this.validateOwnerProperty(data.propertyId, sellerIdToken);


        //Agregamos el propertyId a los elementos en photos
        data.photos.forEach(photo => {
            photo.propertyId = data.propertyId
        });

        //Eliminamos el elemento propertyId que está fuera de photos. 
        delete data.propertyId;

        //Creamos las fotos en la propiedad
        const newPhoto = await models.Photo.bulkCreate(data.photos);

        return newPhoto;
    }

    async update(id, sellerIdToken, changes){
        const photo = await this.findOne(id);
        
        //Validamos la propiedad de la foto
        await this.validateOwnerProperty(photo.propertyId, sellerIdToken);

        const response = await photo.update(changes);

        return response;
    }

    async delete(id, sellerIdToken){

        const photo = await this.findOne(id);

        //Validamos la propiedad de la foto
        await this.validateOwnerProperty(photo.propertyId, sellerIdToken)
        
        await photo.update({ active: false});

        return { id };
    }

    async validateOwnerProperty(propertyId, sellerIdToken){
        //Buscamos la propiedad y obtenemos el id
        const { sellerId } = await models.Property.findByPk(propertyId);
        
        //Comparamos el idSeller del token vs la sellerId de la bdd en la propiedad
        if(sellerId !== sellerIdToken){
            throw boom.unauthorized('You don´t have permission to perform this action');
        }
    }
}

module.exports = PhotoService;