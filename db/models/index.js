const { Seller, SellerSchema } = require('./seller.model');
const { Property, PropertySchema } = require('./property.model');
const { Photo, PhotosSchema } = require('./photo.model');
const { Date, DateSchema } = require('./date.model');
const { Note, NoteSchema } = require('./note.model');

function setupModels(sequelize){
    Seller.init(SellerSchema, Seller.config(sequelize));
    Property.init(PropertySchema, Property.config(sequelize));
    Photo.init(PhotosSchema, Photo.config(sequelize));
    Date.init(DateSchema, Date.config(sequelize));
    Note.init(NoteSchema, Note.config(sequelize));
    
    //relations
    Seller.associate(sequelize.models);
    Property.associate(sequelize.models);
    Photo.associate(sequelize.models);
    Date.associate(sequelize.models);
    Note.associate(sequelize.models);
}

module.exports = setupModels;