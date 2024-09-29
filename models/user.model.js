import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4, 
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  tableName: 'users',
  timestamps: false
});

export default User;
