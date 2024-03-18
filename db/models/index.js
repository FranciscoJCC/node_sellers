const { Seller, SellerSchema } = require('./seller.model');
const { Property, PropertySchema } = require('./property.model');

function setupModels(sequelize){
    Seller.init(SellerSchema, Seller.config(sequelize));
    Property.init(PropertySchema, Property.config(sequelize));
    //relations
}

module.exports = setupModels;