import Promo from "../models/promo.model.js";
import PromoDetail from "../models/promoDetail.model.js";
import { Product } from "./product.association.js";

Promo.hasMany(PromoDetail, { foreignKey: 'promo_id', onDelete: 'CASCADE' });
PromoDetail.belongsTo(Promo, { foreignKey: 'promo_id' })

Product.hasMany(PromoDetail, { foreignKey: 'product_id' })
PromoDetail.belongsTo(Product, { foreignKey: 'product_id' })

export  { Promo, PromoDetail, Product }