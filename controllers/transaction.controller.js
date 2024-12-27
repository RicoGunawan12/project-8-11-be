import sequelize from "../config/database.js";
import { createQrisTransactionXendit } from "../integration/xendit.integration.js";
import { getCartItemsByUserService, removeAllCartItemInUserService } from "../services/cart.service.js";
import { checkPromoService } from "../services/promo.service.js";
import { allMonthSalesAnalyticService, cancelTransactionService, checkOutCreditTransactionService, checkOutQrisTransactionService, checkOutVATransactionService, checkTransactionWithVoucher, createKomshipOrderService, createTransactionDetailService, createTransactionService, deliveryDetailService, fetchSalesByCategoryService, getAllTransactionsService, getTransactionsByIdService, getTransactionsByUserService, monthlySalesReportService, payTransactionService, printLabelService, requestPickupTransactionService, updatePaymentLinkService, updateTransactionDeliveryService, updateTransactionStatusService } from "../services/transaction.service.js";
import { applyVoucherService } from "../services/voucher.service.js";


export const getAllTransactions = async (req, res) => {
    var { status } = req.query
    if (status === undefined) {
        status = ""
    }
    try {
        const transactions = await getAllTransactionsService(status);
        return res.status(200).json({ message: "Transaction fetched successfully", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTransactionsByUser = async (req, res) => {
    var { status } = req.query
    const userId = req.user.userId;
    if (status === undefined) {
        status = ""
    }
    try {
        const transactions = await getTransactionsByUserService(userId, status);
        return res.status(200).json({ message: "Transaction fetched successfully", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTransactionById = async (req, res) => {
    const transactionId = req.params.id;
    if (!transactionId) {
        return res.status(400).json({ message: "Transaction id is required" })
    }
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
        voucherCode, 
        expedition,
        shippingType,
        deliveryFee, 
        deliveryCashback,
        notes
    } = req.body;
    const userId = req.user.userId;

    if (!addressId) {
        return res.status(400).json({ message: "address id must be filled" });
    }
    else if (paymentMethod.length <= 0) {
        return res.status(400).json({ message: "Payment method must be filled" });
    }

    const seqTransaction = await sequelize.transaction();
    try {
        // get all item from user cart
        const userCart = await getCartItemsByUserService(userId);
        if (userCart.length === 0) {
            return res.status(400).json({ message: "There is no items in cart!" });
        }
        const productsInCart = userCart;
        // console.log(userCart);

        // calculate the total price
        // calculate the total weight
        var totalPrice = deliveryFee;
        var totalWeight = 0;
        await Promise.all(
            productsInCart.map(async (product) => {
                // console.log(product.product_variant.ref_product_id);
                const promoDetails = await checkPromoService(product.product_variant.ref_product_id);
                // console.log(product.product_variant.productPrice);
                if (promoDetails) {
                    product.product_variant.productPrice = 
                    product.product_variant.productPrice - promoDetails.promo.promoAmount <= 0 ? 0 :
                    product.product_variant.productPrice - promoDetails.promo.promoAmount;
                    product.product_variant.realizedPromo = promoDetails.promo.promoAmount;
                }
                // console.log(product.product_variant.productPrice);

                const itemTotal = product.product_variant.productPrice * product.quantity;
                totalPrice += itemTotal;
                totalWeight += product.product_variant.productWeight;
            })
        );
        // console.log(totalWeight);

        if (voucherCode) {
            // minus the totalprice
            const voucherHasUsed = await checkTransactionWithVoucher(voucherCode, userId);
            if (voucherHasUsed) {
                return res.status(400).json({ message: "Voucher has used!" });
            }
            else {
                const discount = await applyVoucherService(voucherCode, totalPrice - deliveryFee);
                totalPrice -= discount
            }
        }
        
        // set transaction date to now 
        // set gateway response to null
        // set status to Wait for payment
        // set payment deadline to now + 1 day 
        // insert transaction header and get the id
        const transaction = await createTransactionService(
            userId, 
            addressId, 
            voucherCode.length === 0 ? null : voucherCode, 
            // null, 
            new Date(), 
            paymentMethod, 
            null, 
            "Unpaid",
            expedition, 
            shippingType,
            deliveryFee, 
            deliveryCashback,
            new Date(Date.now() + 1 * 60 * 60 * 1000), 
            notes,
            totalPrice,
            totalWeight
        );

        // insert transaction detail
        const transactionDetails = productsInCart.map(product => {
            const currentDate = new Date();
    
            // const isPromoActive =
            //     product.isPromo &&
            //     new Date(product.startDate) <= currentDate &&
            //     currentDate <= new Date(product.endDate);
            return {
                transactionId: transaction.transactionId,
                productVariantId: product.product_variant.productVariantId,
                quantity: product.quantity,
                paidProductPrice: product.product_variant.productPrice,
                realizedPromo: product.product_variant.realizedPromo
            };
        });
        const insertedTransactionDetails = await createTransactionDetailService(transactionDetails);
        // const deletedCartItem = await removeAllCartItemInUserService(userId);
        const payTransactionResponse = await payTransactionService(transaction, req.user.customerId)
        const updatePaymentLink = await updatePaymentLinkService(transaction, payTransactionResponse.actions[0].url);
        
        await seqTransaction.commit();
        return res.status(200).json({ message: "Transaction created!", payTransactionResponse, transaction, insertedTransactionDetails });
        
    } catch (error) {
        await seqTransaction.rollback();
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
        const getTransactionById = await getTransactionsByIdService(reference_id);

        const response = await createKomshipOrderService(getTransactionById);
        // return res.status(200).json({ response });
        return res.redirect('/');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const requestPickupTransaction = async (req, res) => {
    const { transactionId } = req.body;
    try {
        const getTransactionById = await getTransactionsByIdService(transactionId);
        const response = await requestPickupTransactionService(getTransactionById);
        return res.status(200).json({ message: "Success!", response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deliveryDetail = async (req, res) => {
    const { orderNumber } = req.body;

    try {
        const detail = await deliveryDetailService(orderNumber);
        return res.status(200).json({ message: "Success!", detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const printLabel = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const getTransactionById = await getTransactionsByIdService(transactionId);
        const label = await printLabelService(getTransactionById.orderNumber);
        return res.status(200).json({ message: "Success!", label });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const monthlySalesReport = async (req, res) => {
    const { year, month } = req.body;

    if (year <= 0) {
        return res.status(400).json({ message: "Invalid Year" });   
    }
    else if (month <= 0) {
        return res.status(400).json({ message: "Invalid Month" });   
    } 

    try {
        const response = await monthlySalesReportService(year, month);
        return res.status(200).json({ message: "Fetch successfully", response })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const allMonthSalesAnalytic = async (req, res) => {
    const { year } = req.body;
    if (year <= 0) {
        return res.status(400).json({ message: "Invalid Year" });   
    }

    try {
        const response = await allMonthSalesAnalyticService(year);
        return res.status(200).json({ message: "Fetch successfully", response })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const fetchSalesByCategory = async (req, res) => {
    const { year, month } = req.body;

    if (year <= 0) {
        return res.status(400).json({ message: "Invalid Year" });   
    }
    else if (month <= 0) {
        return res.status(400).json({ message: "Invalid Month" });   
    } 

    try {
        const response = await fetchSalesByCategoryService(year, month);
        return res.status(200).json({ message: "Fetch successfully", response })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTransactionDelivery = async (req, res) => {
    const { order_no, cnote, status } = req.body; 
    if (!order_no || !cnote || !status) {
        return res.status(400).json({ message: "Invalid input" }); 
    }

    try {
        const response = updateTransactionDeliveryService(order_no, status);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const cancelTransaction = async (req, res) => {
    const transactionId = req.params.id;

    if (!transactionId) {
        return res.status(400).json({ message: "Transaction is required!" });
    }

    try {
        const cancelledTransaction = await cancelTransactionService(transactionId);
        return res.status(200).json({ message: "Transaction cancelled!" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const payTransaction = async (req, res) => {
    const user = req.user;
    const { transactionId } = req.body;

    if (!transactionId) {
        return res.status(400).json({ message: "Transaction is required!" });
    }

    try {
        const transactionPlan = await payTransactionService(transactionId, user);
        return res.status(200).json({ message: "Plan created!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}