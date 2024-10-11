import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ColorVariant = sequelize.define('color_variants', {
  productVariantId: {
    field: "ref_product_variant_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false
  },
  productColor: {
    field: "product_color",
    type: DataTypes.STRING, 
    allowNull: false
  },
  productImage: {
    field: "product_color_image",
    type: DataTypes.TEXT,
    allowNull: true
  },

},{
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['ref_product_variant_id', 'product_color']
    }
  ]
})

export default ColorVariant;