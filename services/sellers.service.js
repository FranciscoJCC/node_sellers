const boom = require('@hapi/boom');

const { models }  = require('./../libs/sequelize');

class SellerService {
    constructor() {

    }

    async list(query){
        
        const options = {
            include: ['properties','dates'],
            where: {
                active: true
            },
            limit: (query.limit) ? parseInt(query?.limit) : 10,
            offset: (query.offset) ? parseInt(query?.offset) : 0
        }

        const response = await models.Seller.findAll(options);

        return response;
    }

    async find(id){
        const response = await models.Seller.findByPk(id);

        if(!response)
            throw boom.notFound('user not found');

        return response;
    }

    async findOne(id){
        const seller = await models.Seller.findByPk(id);

        if(!seller)
            throw boom.notFound('user not found');

        return seller;
    }

    async findByEmail(email){
        const response = await models.Seller.scope('allProperties').findOne({
            where: { email }
        });
        
        return response;
    }

    async create(data){
        //Create seller
        const newSeller = await models.Seller.create(data);

        return newSeller;
    }

    async update(id, idParams, changes){
        
        if(id !== parseInt(idParams))
            throw boom.badRequest("ID, Bad Request URL");

        const seller = await this.findOne(id);

        const response = await seller.update(changes);

        return response;
    }

    async delete(id, idParams){

        if(id !== parseInt(idParams))
            throw boom.badRequest("ID, Bad Request URL");

        //Validamos si existe el usuario
        const seller = await this.findOne(id);

        //Eliminamos el vendedor
        await seller.update({ active: false});

        return { id };
    }
}

module.exports = SellerService;