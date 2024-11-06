import { addCartItemService, getCartItemsByUserService, removeCartItemService, updateCartItemService } from "../services/cart.service.js";


export const getCartItemsByUser = async (req, res) => {
    const user = req.user;

    try {
        const cartItems = await getCartItemsByUserService(user.userId);
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
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", process.env.KOMSHIP_API);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const komshipResponse = await fetch(`https://api.collaborator.komerce.my.id/tariff/api/v1/calculate?shipper_destination_id=${shipperDestinationId}&receiver_destination_id=${receiverDestinationId}&weight=${weight}&item_value=${itemValue}&cod=${cod}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
        if (!komshipResponse.ok) {
            return res.status(response.status).json({ message: "Failed to calculate delivery fee", error: await response.text() });
        }

        const calculation = await response.json();
        return res.status(200).json({ message: "Calculated successfully", calculation })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}