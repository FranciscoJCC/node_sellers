const { Seller, SellerSchema } = require('./seller.model');
const { Property, PropertySchema } = require('./property.model');
const { Photo, PhotosSchema } = require('./photo.model');

function setupModels(sequelize){
    Seller.init(SellerSchema, Seller.config(sequelize));
    Property.init(PropertySchema, Property.config(sequelize));
    Photo.init(PhotosSchema, Photo.config(sequelize));
    
    //relations
    Seller.associate(sequelize.models);
    Property.associate(sequelize.models);
    Photo.associate(sequelize.models);
}

module.exports = setupModels;