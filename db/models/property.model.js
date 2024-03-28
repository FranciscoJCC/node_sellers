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
        type: DataTypes.FLOAT(10,2),
        get() {
            const rawValue = this.getDataValue('price');
            return `$${rawValue.toFixed(2)}`;
        }
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
    numberBedrooms: {
        field: 'number_bedrooms',
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
        defaultValue: DataTypes.NOW,
        get(){
            const rawValue = this.getDataValue('createdAt');
            return rawValue.toLocaleString('es-MX', { timeZone: 'America/Mexico_City'});
        }
    },
}

class Property extends Model {
    static associate(models){
        //Una propiedad tiene un vendedor
        this.belongsTo(models.Seller, {
            as: 'seller'
        });

        //Una propiedad tiene muchas fotos
        this.hasMany(models.Photo, {
            as: 'photos',
            foreignKey: 'propertyId'
        });

        // Una propiedad tiene muchas citas 
        this.hasMany(models.Date, {
            as: 'dates',
            foreignKey: 'propertyId',
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: PROPERTY_TABLE,
            modelName: 'Property',
            timestamps: false
        }
    }
}

module.exports = {
    PROPERTY_TABLE,
    PropertySchema,
    Property
}