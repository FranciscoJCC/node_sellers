const { Sequelize, Model, DataTypes } = require('sequelize');

//Nombre de la tabla 
const NOTES_TABLE = 'notes';

//Schema
const NoteSchema = {
}

class Note extends Model {
    static associate(models){

    }

    static config(sequelize){
        return{
            sequelize,
            tableName
        }
    }
}

module.exports = {
    NOTES_TABLE,
    NoteSchema
}