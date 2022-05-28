// ~ import modules
import { Model, DataTypes } from "sequelize";

import getConnexion from '../database.js';
const sequelize = getConnexion();

class User extends Model {}

User.init({
   id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
   },
   avatar: { 
      type: DataTypes.TEXT,
      allowNull: true,
   },
   firstname: { 
      type: DataTypes.TEXT,
      allowNull: true,
   },
   lastname: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
   email: { 
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
   },
   password: { 
      type: DataTypes.TEXT,
      allowNull: false
   },
   created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
   },
   updated_at: {
      type: DataTypes.DATE,
      allowNull: true
   }
},
   {
   sequelize,
   tableName: 'user'
   }
)


export { User };