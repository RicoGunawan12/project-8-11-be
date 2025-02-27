import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductVariant = sequelize.define('product_variants', {
  productVariantId: {
    field: "product_variant_id",
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false
  },
  productId: {
    field: "ref_product_id",
    type: DataTypes.UUID
  },
  productVariantCode: {
    field: "product_variant_code",
    type: DataTypes.STRING,
    allowNull: true
  },
  productColor: {
    field: "product_color",
    type: DataTypes.STRING,
    allowNull: true
  },
  sku: {
    field: "sku",
    type: DataTypes.STRING,
    length: 200,
    allowNull: false
  },
  spu: {
    field: "spu",
    type: DataTypes.STRING,
    length: 200,
    allowNull: true
  },
  barcode: {
    field: "barcode",
    type: DataTypes.STRING,
    length: 50,
    allowNull: true
  },
  productImage: {
    field: "product_image",
    type: DataTypes.TEXT,
    allowNull: true
  },
  productPrice: {
    field: "product_price",
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productStock: {
    field: "product_stock",
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    field: "is_deleted",
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},{
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['ref_product_id', 'product_color']
    }
  ]
})

export default ProductVariant;