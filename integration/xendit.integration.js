import { Xendit, PaymentRequest as PaymentRequestClient } from "xendit-node"

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API })
const { PaymentRequest } = xenditClient

const xenditPaymentRequestClient = new PaymentRequestClient({ secretKey: process.env.XENDIT_API })

const credentials = btoa(`${process.env.XENDIT_API_TEST}:`);
const headers = new Headers({
    "Authorization": `Basic ${credentials}`,
    "Content-Type": "application/json",
});


export const createCreditCardTransactionXendit = async (
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
) => {
    // console.log(
    //     amount,
    //     card_number,
    //     card_exp_month,
    //     card_exp_year,
    //     card_cvn,
    //     is_multiple_use,
    //     should_authenticate,
    //     card_holder_email,
    //     card_holder_first_name,
    //     card_holder_last_name,
    //     card_holder_phone_number
    // );

    // const data = {
    //     country : "ID",
    //     amount : 15000,
    //     paymentMethod : {
    //       ewallet : {
    // channelProperties : {
    //   successReturnUrl : "https://redirect.me/success"
    // },
    //         channelCode : "SHOPEEPAY"
    //       },
    //       reusability : "ONE_TIME_USE",
    //       type : "EWALLET"
    //     },
    //     currency : "IDR",
    //     referenceId : "example-ref-1234"
    //   }

    // const tokenResponse = await xenditPaymentRequestClient.createPaymentRequest({data});
    const tokenResponse = await xenditPaymentRequestClient.createPaymentRequest({
        data: {
            amount: amount,
            currency: "IDR", // e.g., "IDR" for Indonesian Rupiah
            country: "ID",
            paymentMethod: {
                card: {
                    channelProperties: {
                        successReturnUrl: "http://localhost:4650/transactions/" + transactionId,
                        failureReturnUrl: "https://redirect.me/failed"
                    },
                    cardInformation: {
                        expiryMonth: card_exp_month,
                        expiryYear: card_exp_year,
                        cardNumber: card_number,
                        cardHolderName: card_holder_first_name + " " + card_holder_last_name
                    },
                    channelCode: "BBL_CARD_INSTALLMENT"
                },
                channelProperties: {
                    cvv: card_cvn
                },
                reusability: is_multiple_use ? "MULTIPLE_USE" : "ONE_TIME_USE",
                type: "CARD"
            },
            referenceId: transactionId,
            // customer: {
            //     mobileNumber: card_holder_phone_number
            // }
        },
        callback_url: "http://localhost:5000/api/transactions/test"
    });
    return tokenResponse
}


export const createQrisTransactionXendit = async (transactionId, amount) => {
    const data = {
        amount: amount,
        paymentMethod: {
            qrCode: {
                channelCode: "QRIS"
            },
            reusability: "ONE_TIME_USE",
            type: "QR_CODE"
        },
        currency: "IDR",
        referenceId: transactionId
    }

    const response = await xenditPaymentRequestClient.createPaymentRequest({
        data
    })

    return response;
}

export const checkOutVATransactionXendit = async (transactionId, amount, bank, customerName) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const data = {
        country: "ID",
        amount: amount,
        metadata: {
            sku: "example-sku-1234"
        },
        paymentMethod: {
            reusability: "ONE_TIME_USE",
            type: "VIRTUAL_ACCOUNT",
            virtualAccount: {
                channelProperties: {
                    customerName: customerName,
                    // expiresAt : expiredDate
                    expiresAt: tomorrow
                },
                channelCode: bank
            },
            referenceId: transactionId
        },
        currency: "IDR",
        referenceId: transactionId
    }

    const response = await xenditPaymentRequestClient.createPaymentRequest({
        data
    })
    return response
}

export const createCustomerXendit = async (userId, fullName, email, phone) => {
    const body = {
        reference_id: userId,
        type: "INDIVIDUAL",
        individual_detail: {
            given_names: fullName,
            surname: fullName
        },
        email: email,
        mobile_number: phone
    }

    const requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
        body: JSON.stringify(body)
    }

    try {
        const xenditResponse = await fetch(`${process.env.XENDIT_URL}/customers`, requestOptions);
        if (!xenditResponse.ok) {
            throw new Error(`Error: ${xenditResponse.statusText}`);
        }
        const result = await xenditResponse.json();
        return result;
    } catch (error) {
        // console.log(error);
        throw new Error(error.message);
    }
}

export const createPlanXendit = async (transaction, customerId, productsInCart) => {
    const items = productsInCart.map((product) => {
        console.log(product.product_variant.product.productName + " - " + product.product_variant.productColor);
        console.log(product.product_variant.productPrice);
        console.log(product.quantity);
        console.log(process.env.BASE_URL + product.product_variant.productImage);
        
        return {
            type: "PHYSICAL_PRODUCT",
            name: product.product_variant.product.productName + " - " + product.product_variant.productColor,
            net_unit_amount: product.product_variant.productPrice,
            quantity: product.quantity,
            url: process.env.BASE_URL + product.product_variant.productImage
            // url: "https://th.bing.com/th/id/OIP.ULq5QQnJfNFuhcLNBVqzAwHaE7?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            // category: "Gaming",
            // subcategory: "Open World"
        };
    })
    
    const body = {
        reference_id: transaction.transactionId,
        customer_id: customerId,
        recurring_action: "PAYMENT",
        currency: "IDR",
        amount: transaction.totalPrice,
        payment_methods: [],
        schedule: {
            reference_id: transaction.transactionId,
            interval: "DAY",
            interval_count: 1,
            total_recurrence: 1,
            anchor_date: new Date().toISOString(),
            retry_interval: "DAY",
            retry_interval_count: 3,
            total_retry: 2,
            failed_attempt_notifications: [1, 2]
        },
        immediate_action_type: "FULL_AMOUNT",
        notification_config: {
            recurring_created: ["WHATSAPP", "EMAIL"],
            recurring_succeeded: ["WHATSAPP", "EMAIL"],
            recurring_failed: ["WHATSAPP", "EMAIL"],
            locale: "en"
        },
        failed_cycle_action: "STOP",
        payment_link_for_failed_attempt: true,
        metadata: null,
        description: "Tyeso Payment",
        success_return_url: process.env.PRODUCTION_WEB + "/transactions/" + transaction.transactionId,
        failure_return_url: process.env.PRODUCTION_WEB
    }
    if (process.env.BASE_URL !== "http://localhost:5000") {
        body.items = items; 
        items.push({
            type: "DIGITAL_PRODUCT",
            name: "Delivery Fee",
            net_unit_amount: transaction.deliveryFee,
            quantity: 1,
            url: "https://th.bing.com/th/id/OIP.ULq5QQnJfNFuhcLNBVqzAwHaE7?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        })
    }
    // console.log(body);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
        body: JSON.stringify(body)
    }

    try {
        const xenditResponse = await fetch(`${process.env.XENDIT_URL}/recurring/plans`, requestOptions);
        console.log(xenditResponse);
        
        if (!xenditResponse.ok) {
            throw new Error(`Error: ${xenditResponse.statusText}`);
        }
        const result = await xenditResponse.json();
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const refundXendit = async (transactionId, paymentRequestId, amount) => {
    try {
        const body = {
            amount: amount,
            external_refund_id: transactionId,
            reason: "REQUESTED_BY_CUSTOMER",
            payment_request_id: paymentRequestId
        }
        console.log(body);
        
        const requestOptions = {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify(body)
        }

        const xenditResponse = await fetch(`${process.env.XENDIT_URL}/refunds`, requestOptions);
        console.log(xenditResponse);
        
        if (!xenditResponse.ok) {
            throw new Error(`Error: ${xenditResponse.statusText}`);
        }
        const result = await xenditResponse.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    }
}