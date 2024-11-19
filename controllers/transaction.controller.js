import { createQrisTransactionXendit } from "../integration/xendit.integration.js";
import { getCartItemsByUserService, removeAllCartItemInUserService } from "../services/cart.service.js";
import { checkOutCreditTransactionService, checkOutQrisTransactionService, checkOutVATransactionService, createTransactionDetailService, createTransactionService, getAllTransactionsService, getTransactionsByIdService, getTransactionsByUserService, updateTransactionStatusService } from "../services/transaction.service.js";


export const getAllTransactions = async (req, res) => {
    const { status } = req.query
    try {
        const transactions = await getAllTransactionsService(status);
        return res.status(200).json({ message: "Transaction fetched successfully", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTransactionsByUser = async (req, res) => {
    const { status } = req.query
    const userId = req.user.userId;
    try {
        const transactions = await getTransactionsByUserService(userId, status);
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
        expedition,
        shippingType,
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
            expedition, 
            shippingType,
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

export const checkOutVATransaction = async (req, res) => {

    const {
        transactionId, 
        amount, 
        bank
    } = req.body

    try {
        const response = await checkOutVATransactionService(transactionId, amount, bank);
        return res.status(200).json({ message: "VA Created!", response })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// Req body
// {
//     "created": "2024-11-12T07:45:11.134Z",
//     "business_id": "66cc3af7b141ca768e852751",
//     "event": "payment.succeeded",
//     "data": {
//         "id": "ca_67330775950a4a001656b419",
//         "items": null,
//         "amount": 50000,
//         "status": "SUCCEEDED",
//         "country": "ID",
//         "created": "2024-11-12T07:44:53.655Z",
//         "updated": "2024-11-12T07:45:08.653Z",
//         "currency": "IDR",
//         "metadata": null,
//         "customer_id": null,
//         "description": null,
//         "failure_code": null,
//         "reference_id": "9ade2902-39f8-4374-805d-38499e9a9e2b",
//         "payment_detail": null,
//         "payment_method": {
//             "id": "pm-088f4f0a-a43a-4161-b998-f6857ca648ca",
//             "card": {
//                 "currency": "IDR",
//                 "card_data_id": "60af646628b731002236ec87",
//                 "card_information": {
//                     "type": "CREDIT",
//                     "issuer": "BRI",
//                     "country": "ID",
//                     "network": "VISA",
//                     "expiry_year": "2025",
//                     "fingerprint": "60af646628b731002236ec87",
//                     "expiry_month": "12",
//                     "cardholder_name": null,
//                     "masked_card_number": "400000XXXXXX1091"
//                 },
//                 "channel_properties": {
//                     "cardonfile_type": null,
//                     "failure_return_url": "https://redirect.me/failed",
//                     "success_return_url": "https://redirect.me/success",
//                     "skip_three_d_secure": null
//                 },
//                 "card_verification_results": null
//             },
//             "type": "CARD",
//             "status": "ACTIVE",
//             "created": "2024-11-12T07:44:53.259624Z",
//             "ewallet": null,
//             "qr_code": null,
//             "updated": "2024-11-12T07:44:53.259624Z",
//             "metadata": null,
//             "description": null,
//             "reusability": "MULTIPLE_USE",
//             "direct_debit": null,
//             "reference_id": "a7ed1fb4-9be7-41d2-8621-7ac79675db9b",
//             "virtual_account": null,
//             "over_the_counter": null,
//             "billing_information": {
//                 "city": null,
//                 "country": "",
//                 "postal_code": null,
//                 "street_line1": null,
//                 "street_line2": null,
//                 "province_state": null
//             },
//             "direct_bank_transfer": null
//         },
//         "channel_properties": null,
//         "payment_request_id": "pr-4e1dbce0-94da-4e85-9784-859c10e55278"
//     },
//     "api_version": null
// }
export const updateTransactionStatus = async (req, res) => {
    const {
        reference_id
    } = req.body.data;
    
    try {
        const updatedTransaction = await updateTransactionStatusService(reference_id, req.body);
        return res.redirect('/');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

// "order_date": "2024-05-29 23:59:59",
// "brand_name": "Komship",
// "shipper_name": "Toko Official Komship",
// "shipper_phone": "6281234567689",
// "shipper_destination_id": 17588,
// "shipper_address": "order address detail",
// "shipper_email":"test@gmail.com",
// "receiver_name": "Buyer A",
// "receiver_phone": "6281209876543",
// "receiver_destination_id": 17589,
// "receiver_address": "order destination address detail",
// "shipping": "JNT",
// "shipping_type": "EZ",
// "payment_method": "COD",
// "shipping_cost":22000,
// "shipping_cashback":10000,
// "service_fee":2500,
// "additional_cost":1000,
// "grand_total":317000,
// "cod_value":317000,
// "insurance_value": 1000,
// "order_details": [
//     {
//         "product_name": "Komship package",
//         "product_variant_name": "Komship variant product",
//         "product_price": 500000,
//         "product_width": 5,
//         "product_height": 2,
//         "product_weight": 5100,
//         "product_length": 20,
//         "qty": 1,
//         "subtotal": 500000
//     }
// ]
export const requestPickupTransaction = async (req, res) => {
    const { transactionId } = req.body;
    try {
        const getTransactionById = await getTransactionsByIdService(transactionId);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}