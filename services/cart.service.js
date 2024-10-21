import { CartItemModel, CartModel, ProductVariantModel } from "../association/association.js"


export const createCart = async (userId) => {
    const cart = await CartModel.create({ userId });
    return cart
}

export const getCartItemsByUserService = async (userId) => {
    const cart = await CartItemModel.findAll({
        include: {
            model: CartModel,
            where: { userId: userId },
        }
    });
    return cart;
}

export const addCartItemService = async (userId, productVariantId, quantity) => {

    const productVariant = await ProductVariantModel.findOne({ where: { productVariantId } });
    if (productVariant.productStock < quantity) {
        throw new Error("There are only " + productVariant.productStock + " stock");
    }


    const cart = await CartModel.findOne({ where: { userId } });

    const cartItemInDB = await CartItemModel.findOne({
        where: {
            cartId: cart.cartId,
            productVariantId: productVariantId
        }
    });

    if (cartItemInDB) {
        if (cartItemInDB.quantity == quantity) {
            return;
        }
        else {
            const cartItem = await CartItemModel.update(
                { quantity: quantity },
                { where: { cartId: cart.cartId, productVariantId: productVariantId } }
            )
            return
        }
    }
    const cartId = cart.cartId;
    const cartItem = await CartItemModel.create({ cartId, productVariantId, quantity });

    return cartItem;
}

export const removeCartItemService = async (userId, productVariantId) => {
    
}