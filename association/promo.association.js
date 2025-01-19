import Promo from "../models/promo.model.js";
import PromoDetail from "../models/promoDetail.model.js";
import PromoHistory from "../models/promoHistory.model.js";
import { Product } from "./product.association.js";
import { User } from "./transaction.association.js";

Promo.hasMany(PromoDetail, { foreignKey: 'promo_id', onDelete: 'CASCADE' });
PromoDetail.belongsTo(Promo, { foreignKey: 'promo_id' })

Product.hasMany(PromoDetail, { foreignKey: 'product_id', onDelete: 'CASCADE' })
PromoDetail.belongsTo(Product, { foreignKey: 'product_id' })

User.hasMany(PromoHistory, { foreignKey: 'user_id' });
PromoHistory.belongsTo(User, { foreignKey: 'user_id' })

Product.hasMany(PromoHistory, { foreignKey: 'product_id' });
PromoHistory.belongsTo(Product, { foreignKey: 'product_id' })

Promo.hasMany(PromoHistory, { foreignKey: 'promo_id' });
PromoHistory.belongsTo(Promo, { foreignKey: 'promo_id' })

export  { Promo, PromoDetail, Product, User, PromoHistory }