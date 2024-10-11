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
  productImage: {
    field: "product_image",
    type: DataTypes.TEXT,
    allowNull: true
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
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['product_variant_id', 'ref_product_id']
    }
  ]
})

export default ProductVariant;