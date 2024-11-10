import { calculateDeliveryFeeService } from "../services/address.service.js";
import { getCartItemsByUserService } from "../services/cart.service.js";
import { getAllTransactionsService, getTransactionsByUserService } from "../services/transaction.service.js";


export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await getAllTransactionsService();
        return res.status(200).json({ message: "Transaction fetched successfully", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTransactionsByUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const transactions = await getTransactionsByUserService(userId);
        return res.status(200).json({ message: "Transaction fetched successfully", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createTransaction = async (req, res) => {
    const { addressId, paymentMethod, voucherId } = req.body;
    const userId = req.user.userId;

    if (!addressId) {
        return res.status(400).json({ message: "address id must be filled" });
    }
    else if (paymentMethod.length <= 0) {
        return res.status(400).json({ message: "Payment method must be filled" });
    }

    try {
        // get all item from user cart
        const userCart = await getCartItemsByUserService(userId);
        const productsInCart = userCart.product_variants;

        // calculate the total price
        // calculate the total weight
        var totalPrice = 0;
        var totalWeight = 0;
        productsInCart.map(product => {
            const itemTotal = product.price * product.quantity;
            totalPrice += itemTotal;
            totalWeight += product.weight;
        });
        
        // calculate the delivery fee
        const deliveryFee = await calculateDeliveryFeeService(addressId, addressId, totalWeight, totalPrice, "no");

        // set transaction date to now
        // set gateway response to null
        // set status to Wait for payment
        // set payment deadline to now + 1 day 
        // insert transaction header and get the id

        // insert transaction detail
        const transactionDetails = products.map(product => {
            return {
                transactionId: transactionId,
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
            };
        });
        // 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}