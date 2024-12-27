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
  productColor: {
    field: "product_color",
    type: DataTypes.STRING,
    allowNull: true
  },
  sku: {
    field: "sku",
    type: DataTypes.STRING,
    length: 100,
    allowNull: false
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