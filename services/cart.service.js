import { CartModel } from "../association/association.js"


export const createCart = async (userId) => {
    const cart = await CartModel.create({ userId });
    return cart
}