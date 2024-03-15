const boom = require('@hapi/boom');

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

    async create(data){
        const newSeller = await models.Seller.create(data);

        return newSeller;
    }
}

module.exports = SellerService;