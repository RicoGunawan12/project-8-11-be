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
  productSize: {
    field: "product_size",
    type: DataTypes.STRING,
    allowNull: true
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
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productWeight: {
    field: "product_weight",
    type: DataTypes.FLOAT,
    allowNull: false
  },
  productStock: {
    field: "product_stock",
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productPromo: {
    field: "product_promo",
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  productPromoExpiry: {
    field: "product_promo_expiry",
    type: DataTypes.DATE,
    allowNull: true
  }
},{
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['ref_product_id', 'product_color', 'product_size']
    }
  ]
})

export default ProductVariant;