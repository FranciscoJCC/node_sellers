const { Sequelize, Model, DataTypes } = require('sequelize');
const { DATES_TABLE } = require('./date.model');

//Nombre de la tabla 
const NOTES_TABLE = 'notes';

//Schema
const NoteSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    dateId: {
        field: 'date_id',
        allowNull: false, 
        type: DataTypes.INTEGER,
        references: {
            model: DATES_TABLE,
            key: 'id'            
        }
    },
    note: {
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
    }
}

class Note extends Model {
    static associate(models){
        //Una nota pertenece a una cita 
        this.belongsTo(models.Date, {
            as: 'date',
        });
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: NOTES_TABLE,
            modelName: 'Note',
            timestamps: false
        }
    }
}

module.exports = {
    NOTES_TABLE,
    NoteSchema,
    Note
}