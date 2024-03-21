const { Sequelize, Model, DataTypes } = require('sequelize');
const { SELLER_TABLE } = require('./seller.model');
const { PROPERTY_TABLE  } = require('./property.model');

//Nombre de la tabla
const DATES_TABLE = 'dates';

//Schema 
const DateSchema = {
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
    propertyId: {
        field: 'property_id',
        allowNull: false, 
        type: DataTypes.INTEGER,
        references: {
            model: PROPERTY_TABLE,
            key: 'id'            
        }
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE
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

class Date extends Model {
    static associate(models){
        //Una cita tiene una propiedad
        this.belongsTo(models.Property, {
            as: 'property',
        });

        //Una cita tiene un vendedor
        this.belongsTo(models.Seller, {
            as: 'seller'
        });

    }

    static config(sequelize){
        return{
            sequelize,
            tableName: DATES_TABLE,
            modelName: 'Date',
            timestamps: false
        }
    }
}

module.exports = {
    DATES_TABLE,
    DateSchema,
    Date
}