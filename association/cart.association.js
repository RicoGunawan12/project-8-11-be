import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import User from "../models/user.model.js";
import { ProductVariant } from "./product.association.js";

User.belongsTo(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

CartItem.belongsTo(ProductVariant, { foreignKey: 'productId'} );
ProductVariant.belongsTo(CartItem, { foreignKey: 'productId'} );

export { User, Cart, CartItem, ProductVariant }