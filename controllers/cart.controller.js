import { addCartItemService, getCartItemsByUserService } from "../services/cart.service.js";


export const getCartItemsByUser = async (req, res) => {
    const user = req.user;

    try {
        const cartItems = getCartItemsByUserService(user.userId);
        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const addCartItem = async (req, res) => {
    const user = req.user;
    const { productVariantId, quantity } = req.body;

    try {
        const cartItem = await addCartItemService(user.userId, productVariantId, quantity);
        return res.status(200).json({ message: "Product added to cart!", cartItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}