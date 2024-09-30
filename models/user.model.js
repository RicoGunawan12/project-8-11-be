import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('users', {
  userId: {
    field: "user_id",
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4, 
    allowNull: false
  },
  username: {
    field: "username",
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    field: "email",
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    field: "password",
    type: DataTypes.STRING,
    allowNull: false,
    length: 255
  },
  role: {
    field: "role",
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    length: 50
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});


export default User;
