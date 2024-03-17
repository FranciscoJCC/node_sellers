const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models }  = require('./../libs/sequelize');

class SellerService {
    constructor() {

    }

    async list(){
        const response = await models.Seller.findAll();

        return response;
    }

    async find(id){
        const response = await models.Seller.findByPk(id);

        return response;
    }

    async findOne(id){
        const seller = await models.Seller.findByPk(id);

        if(!seller)
            throw boom.notFound('user not found');

        return seller;
    }

    async create(data){
        //Hash al password
        const hash = await bcrypt.hash(data.password, 10);
        
        //Add hash password to data
        const newData = {
            ...data,
            password: hash
        };

        //Create seller
        const newSeller = await models.Seller.create(newData);

        return newSeller;
    }

    async update(id, changes){
        const seller = await this.findOne(id);

        const response = await seller.update(changes);

        return response;
    }

    async delete(id){

        //Validamos si existe el usuario
        const seller = await this.findOne(id);

        //Eliminamos el vendedor
        await seller.destroy();

        return { id };
    }
}

module.exports = SellerService;