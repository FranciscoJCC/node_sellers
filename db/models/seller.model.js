const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

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
        defaultValue: DataTypes.NOW,
        get(){
            const rawValue = this.getDataValue('createdAt');
            return rawValue.toLocaleString('es-MX', { timeZone: 'America/Mexico_City'});
        }
    },
    recoveryToken:{
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
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

        //Un vendedor tiene muchas citas
        this.hasMany(models.Date, {
            as: 'dates',
            foreignKey: 'sellerId'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: SELLER_TABLE,
            modelName: 'Seller',
            timestamps: false,
            hooks: {
                beforeCreate: async (user, options)=> {
                    const password = await bcrypt.hash(user.password, 10);

                    user.password = password;
                }
            },
            defaultScope: {
                attributes: { exclude: ['password', 'recoveryToken']}
            },
            scopes: {
                allProperties: { attributes: {}},
            }
        }
    }
}

module.exports = {
    SELLER_TABLE,
    SellerSchema,
    Seller
};