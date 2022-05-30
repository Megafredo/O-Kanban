//~ IMPORTATION MODULES
import { Model, DataTypes } from 'sequelize';

import getConnexion from '../database.js';
const sequelize = getConnexion();

class Card extends Model {}

Card.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },

    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    order: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    color: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    list_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue : DataTypes.NOW
    },

    updated_at:{
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    sequelize,
    tableName: 'card'
});

export { Card };