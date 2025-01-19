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
    type: DataTypes.TEXT("long"),
    allowNull: true,
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
  productSize: {
    field: "product_size",
    type: DataTypes.NUMBER,
    allowNull: true
  },
  productWeight: {
    field: "product_weight",
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productWidth: {
    field: "product_width",
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productLength: {
    field: "product_length",
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productHeight: {
    field: "product_height",
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productActivityStatus: {
    field: "product_activity_status",
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
    allowNull: false,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE
  }
},{
  timestamps: true,
  createdAt: 'created_at', // Match database column name
  updatedAt: 'updated_at',
})


export default Product