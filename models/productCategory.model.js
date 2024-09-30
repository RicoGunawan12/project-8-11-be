import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import Product from './product.model.js';

const ProductCategory = sequelize.define('product_categories', {
  productCategoryId: {
    field: "product_category_id",
    type: DataTypes.UUID,
    defaultValue: uuidv4(), 
    primaryKey: true,
    allowNull: false
  },
  productCategoryName: {
    field: "product_category_name",
    type: DataTypes.STRING,
    length: 100,
    allowNull: false
  }
},{
  timestamps: false
})


export default ProductCategory