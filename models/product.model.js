import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const Product = sequelize.define('Product', {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    productDescription: {
      type: DataTypes.STRING(255)
    }
  }, {
    tableName: 'products',
    timestamps: false
  });



export default Product