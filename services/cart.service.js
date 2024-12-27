import { Op } from "sequelize";
import { CartItemModel, CartModel, ProductModel, ProductVariantModel, PromoDetailModel, PromoModel } from "../association/association.js"
import ProductVariant from "../models/productVariant.model.js";


export const createCart = async (userId) => {
    const cart = await CartModel.create({ userId });
    return cart
}

export const getCart = async (userId) => {
    const cart = await CartModel.findOne({
        where: { userId: userId }
    })
    return cart;
}

export const getCartItemsByUserService = async (userId) => {

    const cartItem = await CartItemModel.findAll({
        include: [
            {
                model: CartModel,
                where: { userId: userId },
                attributes: []
            },
            {
                model: ProductVariantModel,
                include: [
                    {
                        model: ProductModel,
                        attributes: ['productName'],
                        include: [
                            {
                                model: PromoDetailModel,
                                attributes: ['promoDetailId'],
                                include: [
                                    {
                                        model: PromoModel,
                                        where: {
                                            startDate: {
                                                [Op.lte]: new Date(), 
                                            },
                                            endDate: {
                                                [Op.gte]: new Date(),
                                            },
                                        },
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        attributes: ['cartItemId', 'productVariantId', 'quantity']
    });
    return cartItem;
}

export const addCartItemService = async (userId, productVariantId, quantity) => {

    const productVariant = await ProductVariantModel.findOne({ where: { productVariantId } });
    // console.log(productVariant);
    
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

export const removeCartItemService = async (cartItemId) => {
    const removedCartItem = await CartItemModel.destroy({
        where: { cartItemId }
    })
    return removedCartItem;
}

export const updateCartItemService = async (cartItemId, quantity) => {

    const getProductVariant = await CartItemModel.findOne({
        where: { cartItemId },
        include: {
            model: ProductVariantModel
        }
    })

    if (getProductVariant.product_variant.productStock < quantity) {
        throw new Error("There are only " + getProductVariant.product_variant.productStock + " stock");
    }

    const updateCartItem = await CartItemModel.update(
        { quantity: quantity },
        { where: { cartItemId }}
    )
    return updateCartItem;
}


export const removeAllCartItemInUserService = async (userId) => {
    const userCart = await getCart(userId);
    const deletedCartItem = await CartItemModel.destroy({
        where: {
            cartId: userCart.cartId
        }
    });
    return deletedCartItem;
}