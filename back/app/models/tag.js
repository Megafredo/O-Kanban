// ~ import modules
import {Model, DataTypes } from "sequelize";

import getConnexion from '../database.js';
const sequelize = getConnexion();

class Tag extends Model {}

Tag.init({
   id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
   },
   name: { 
      type: DataTypes.TEXT,
      allowNull: false,
   },
   color: { 
      type: DataTypes.TEXT,
      allowNull: true,
   },
   created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
   },
   updated_at: {
      type: DataTypes.DATE,
      allowNull: true
   },
},
   {
    sequelize,
    tableName: 'tag',
   }
);

export { Tag };