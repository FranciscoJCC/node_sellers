const { Sequelize, Model, DataTypes } = require("sequelize");

const { SELLER_TABLE } = require("./seller.model");

//Nombre de la tabla 
const PROPERTY_TABLE = 'properties';

//Schema
const PropertySchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    sellerId: {
        field: 'seller_id',
        allowNull: false, 
        type: DataTypes.INTEGER,
        references: {
            model: SELLER_TABLE,
            key: 'id'            
        }
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT(10,2)
    },
    location: {
        allowNull: false, 
        type: DataTypes.STRING
    },
    typeHouse: {
        field: 'type_house',
        allowNull: true,
        type: DataTypes.ENUM(['casa', 'apartamento', 'duplex']),
        defaultValue: 'casa'
    },
    numberFloors: {
        field: 'number_floors',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    numberBathrooms: {
        field: 'number_bathrooms',
        allowNull: false,
        type: DataTypes.INTEGER
    },
    width: {
        allowNull: false, 
        type: DataTypes.INTEGER
    },
    heigth: {
        allowNull: false, 
        type: DataTypes.INTEGER
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
        defaultValue: DataTypes.NOW
    },
}

class Property extends Model {
    static associate(){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName: PROPERTY_TABLE,
            timestamps: false
        }
    }
}

module.exports = {
    PROPERTY_TABLE,
    PropertySchema,
    Property
}