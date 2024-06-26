const { Sequelize, Model, DataTypes } = require("sequelize");
const { PROPERTY_TABLE } = require('./property.model');

//Nombre de la tabla
const PHOTOS_TABLE = 'photos';

//Schema 
const PhotosSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    propertyId: {
        field: 'property_id',
        allowNull: false, 
        type: DataTypes.INTEGER,
        references: {
            model: PROPERTY_TABLE,
            key: 'id'            
        }
    },
    url: {
        allowNull: false, 
        type: DataTypes.STRING,
    },
    main: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get(){
            const rawValue = this.getDataValue('createdAt');
            return rawValue.toLocaleString('es-MX', { timeZone: 'America/Mexico_City'});
        }
    },
}

class Photo extends Model {
    static associate(models){
        //Una photo pertene a una propiedad
        this.belongsTo(models.Property, {
            as: 'property'
        });
    }

    static config(sequelize){
        return {
            sequelize, 
            tableName: PHOTOS_TABLE,
            modelName: 'Photo',
            timestamps: false
        }
    }
}

module.exports = {
    PHOTOS_TABLE,
    PhotosSchema,
    Photo
};