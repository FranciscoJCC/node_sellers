const { Seller, SellerSchema } = require('./seller.model');

function setupModels(sequelize){
    Seller.init(SellerSchema, Seller.config(sequelize));

    //relations
}

module.exports = setupModels;