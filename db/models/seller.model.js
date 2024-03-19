const { Sequelize, Model, DataTypes } = require("sequelize");

//Nombre de la tabla 
const SELLER_TABLE = 'sellers';

//Schema
const SellerSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING(20)
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false, 
        type: DataTypes.STRING
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

//Class
class Seller extends Model {
    static associate(models){
        //relations
        //Un vendedor tiene muchas propiedades
        this.hasMany(models.Property, {
            as: 'properties',
            foreignKey: 'sellerId'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: SELLER_TABLE,
            timestamps: false,
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            }
        }
    }
}

module.exports = {
    SELLER_TABLE,
    SellerSchema,
    Seller
};