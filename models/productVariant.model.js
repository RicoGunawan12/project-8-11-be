import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';
import Product from "./product.model.js";

const ProductVariant = sequelize.define('product_variants', {
  productVariantId: {
    field: "product_variant_id",
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4(), 
    allowNull: false
  },
  productId: {
    field: "ref_product_id",
    type: DataTypes.UUID
  },
  sku: {
    field: "sku",
    type: DataTypes.STRING,
    length: 100,
    allowNull: false
  },
  productVariantName: {
    field: "product_variant_name",
    type: DataTypes.STRING,
    allowNull: true,
    length: 100
  },
  productPrice: {
    field: "product_price",
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  productStock: {
    field: "product_stock",
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{
  timestamps: false
})

export default ProductVariant;