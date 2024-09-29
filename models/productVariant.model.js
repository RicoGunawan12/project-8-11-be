import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';
import Product from "./product.model.js";

const ProductVariant = sequelize.define('ProductVariant', {
    productVariantId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
      allowNull: false
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    productVariantName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productImage: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  }, {
    tableName: 'product_variants',
    timestamps: false
  });

export default ProductVariant;