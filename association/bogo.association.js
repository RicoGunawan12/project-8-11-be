import Bogo from "../models/bogo.model.js";
import { Product, ProductVariant } from "./product.association.js";

// ProductVariant.hasMany(BogoDetail, { foreignKey: 'product_id', onDelete: 'CASCADE' })
// BogoDetail.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' })
Product.hasMany(Bogo, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Bogo.belongsTo(Product, { foreignKey: 'product_id' });

export  { Bogo }