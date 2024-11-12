import { createQrisTransactionXendit } from "../integration/xendit.integration.js";
import { getCartItemsByUserService, removeAllCartItemInUserService } from "../services/cart.service.js";
import { checkOutCreditTransactionService, checkOutQrisTransactionService, createTransactionDetailService, createTransactionService, getAllTransactionsService, getTransactionsByIdService, getTransactionsByUserService } from "../services/transaction.service.js";


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

export const getTransactionById = async (req, res) => {
    const transactionId = req.params.id;
    try {
        const transaction = await getTransactionsByIdService(transactionId);
        return res.status(200).json({ message: "Transaction fetched successfully", transaction })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createTransaction = async (req, res) => {
    const { 
        addressId, 
        paymentMethod, 
        voucherId, 
        deliveryFee, 
        notes
    } = req.body;
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
        const productsInCart = userCart;
        console.log(userCart);

        // calculate the total price
        // calculate the total weight
        var totalPrice = deliveryFee;
        var totalWeight = 0;
        productsInCart.map(product => {
            console.log(product.product_variant);
            const itemTotal = product.product_variant.productPrice * product.quantity;
            totalPrice += itemTotal;
            totalWeight += product.product_variant.productWeight;
        });
        console.log(totalWeight);

        if (voucherId) {
            // minus the totalprice
        }

        // set transaction date to now 
        // set gateway response to null
        // set status to Wait for payment
        // set payment deadline to now + 1 day 
        // insert transaction header and get the id
        const transaction = await createTransactionService(
            userId, 
            addressId, 
            voucherId, 
            new Date(), 
            paymentMethod, 
            null, 
            "Unpaid", 
            deliveryFee, 
            new Date(Date.now() + 1 * 60 * 60 * 1000), 
            notes,
            totalPrice,
            totalWeight
        );

        // insert transaction detail
        const transactionDetails = productsInCart.map(product => {
            return {
                transactionId: transaction.transactionId,
                productVariantId: product.product_variant.productVariantId,
                quantity: product.quantity,
                paidProductPrice: product.product_variant.productPrice,
                realizedPromo: product.product_variant.productPromoExpiry ? (product.product_variant.productPromoExpiry > new Date() ? product.product_variant.productPromo : 0) : 0 
            };
        });
        const insertedTransactionDetails = await createTransactionDetailService(transactionDetails);
        const deletedCartItem = await removeAllCartItemInUserService(userId);
        return res.status(200).json({ message: "Transaction created!", transaction, insertedTransactionDetails });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const checkOutCreditTransaction = async (req, res) => {
    const {
        transactionId,
        amount,
        card_number,
        card_exp_month,
        card_exp_year,
        card_cvn,
        is_multiple_use,
        should_authenticate,
        card_holder_email,
        card_holder_first_name,
        card_holder_last_name,
        card_holder_phone_number,
    } = req.body;

    try {
        const response = await checkOutCreditTransactionService(
            transactionId,
            amount,
            card_number,
            card_exp_month,
            card_exp_year,
            card_cvn,
            is_multiple_use,
            should_authenticate,
            card_holder_email,
            card_holder_first_name,
            card_holder_last_name,
            card_holder_phone_number
        );
        return res.status(200).json({ message: "Transaction paid!", response })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const checkOutQrisTransaction = async (req, res) => {
    const {
        transactionId,
        amount,
    } = req.body;
    try {
        const response = await checkOutQrisTransactionService(transactionId, amount);
        return res.status(200).json({ message: "Fetch QRIS Success!", response })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTransactionStatus = async (req, res) => {
    const {
        updated,
        created,
        payment_id,
        callback_virtual_account_id,
        owner_id,
        external_id,
        account_number,
        bank_code,
        amount,
        transaction_timestamp,
        merchant_code,
        id
    } = req.body;
    console.log(
        updated,
        created,
        payment_id,
        callback_virtual_account_id,
        owner_id,
        external_id,
        account_number,
        bank_code,
        amount,
        transaction_timestamp,
        merchant_code,
        id
    );
}