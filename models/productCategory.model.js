import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import Product from './product.model.js';

const ProductCategory = sequelize.define('ProductCategory', {
  categoryId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
    allowNull: false
  },
  categoryName: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'product_categories',
  timestamps: false
});

export default ProductCategory