const { Seller, SellerSchema } = require('./seller.model');
const { Property, PropertySchema } = require('./property.model');

function setupModels(sequelize){
    Seller.init(SellerSchema, Seller.config(sequelize));
    Property.init(PropertySchema, Property.config(sequelize));
    
    //relations
    Seller.associate(sequelize.models);
    Property.associate(sequelize.models);
}

module.exports = setupModels;