import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductCategory = sequelize.define('product_categories', {
  productCategoryId: {
    field: "product_category_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  productCategoryName: {
    field: "product_category_name",
    type: DataTypes.STRING,
    length: 100,
    allowNull: false
  },
  productCategoryPhoto: {
    field: "product_category_photo",
    type: DataTypes.TEXT,
    allowNull: false
  },
},{
  timestamps: false
})


export default ProductCategory