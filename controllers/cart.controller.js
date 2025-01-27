import { calculateDeliveryFeeKomship } from "../integration/komship.integration.js";
import { addCartItemService, getCartItemsByUserService, removeCartItemService, updateCartItemService } from "../services/cart.service.js";


export const getCartItemsByUser = async (req, res) => {
    const user = req.user;

    try {
        console.log("getting cart")
        const cartItems = await getCartItemsByUserService(user.userId);
        console.log("here in controller")
        console.log(cartItems)
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

export const removeCartItem = async (req, res) => {
    const cartItemId = req.params.id;

    if (!cartItemId) {
        return res.status(400).json({ message: "Cart item id must not null" })
    }

    try {
        const removeCartItem = await removeCartItemService(cartItemId);
        res.status(200).json({ message: "Product removed from the cart!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCartItem = async (req, res) => {
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    if (!cartItemId) {
        return res.status(400).json({ message: "Cart item id must not null" })
    }
    else if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Quantity must ber more than 0" })
    }

    try {
        const updatedCartItem = await updateCartItemService(cartItemId, quantity);
        res.status(200).json({ message: "Product in the cart is updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const calculateDeliveryFee = async (req, res) => {
    const { shipperDestinationId, receiverDestinationId, weight, itemValue, cod } = req.query;

    try {

        const calculation = await calculateDeliveryFeeKomship(shipperDestinationId, receiverDestinationId, weight, itemValue, cod);
        
        return res.status(200).json({ message: "Calculated successfully", calculation })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}