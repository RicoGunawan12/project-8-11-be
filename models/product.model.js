import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define('products', {
  productId: {
    field: "product_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  productCategoryId: {
    field: "ref_product_category_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  productName: {
    field: "product_name",
    type: DataTypes.STRING,
    length: 255,
    allowNull: false
  },
  productDescription: {
    field: "product_description",
    type: DataTypes.STRING,
    allowNull: true,
    length: 255
  },
  defaultImage:  {
    field: "default_image",
    type: DataTypes.STRING,
    allowNull: true,
  },
  isBestSeller: {
    field: "is_best_seller",
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isPromo: {
    field: "is_promo",
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  productPromo: {
    field: "product_promo",
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  startDate: {
    field: "start_date",
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    field: "end_date",
    type: DataTypes.DATE,
    allowNull: true,
  }
},{
  timestamps: false
})


export default Product