import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';
import Product from "./product.model.js";

const ProductVariant = sequelize.define('ProductVariant', {
    product_variant_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
      allowNull: false
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    product_variant_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  }, {
    tableName: 'product_variants',
    timestamps: false
  });

ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });

export default ProductVariant;