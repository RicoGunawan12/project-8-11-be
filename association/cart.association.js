import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import User from "../models/user.model.js";
import { ProductVariant } from "./product.association.js";

User.hasMany(Cart, { foreignKey: 'ref_user_id' });
Cart.belongsTo(User, { foreignKey: 'ref_user_id' });

Cart.hasMany(CartItem, { foreignKey: 'ref_cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'ref_cart_id' });

CartItem.belongsTo(ProductVariant, { foreignKey: 'ref_product_variant_id'} );
ProductVariant.hasMany(CartItem, { foreignKey: 'ref_product_variant_id'} );

export { User, Cart, CartItem, ProductVariant }