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
}

module.exports = SellerService;