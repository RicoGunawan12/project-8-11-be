import { Xendit, PaymentRequest as PaymentRequestClient } from "xendit-node"

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API })
const { PaymentRequest } = xenditClient

const xenditPaymentRequestClient = new PaymentRequestClient({ secretKey: process.env.XENDIT_API })

const credentials = btoa(`${process.env.XENDIT_API}:`);
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
    console.log(body);
    
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
 
        throw new Error(error.message);
    }
}

export const createPlanXendit = async (transaction, productsInCart, disc, freeOngkir) => {
    
    const items = productsInCart.map((product) => {
 
        return {
            name: product.product_variant.product.productName + " - " + product.product_variant.productColor,
            price: product.product_variant.productPrice === 0 ? 1 : product.product_variant.productPrice,
            quantity: product.quantity,
            // url: process.env.BASE_URL + product.product_variant.productImage
            // url: "https://th.bing.com/th/id/OIP.ULq5QQnJfNFuhcLNBVqzAwHaE7?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            // category: "Gaming",
            // subcategory: "Open World"
        };
    })
    
    const body = {
        external_id: transaction.transactionId,
        amount: transaction.totalPrice,
        success_redirect_url: process.env.PRODUCTION_WEB + "/transactions/" + transaction.transactionId,
        failure_return_url: process.env.PRODUCTION_WEB
    }
    const fees = []
    if (disc != 0) {
        fees.push({
            type: "DISCOUNT",
            value: disc * -1,
            // quantity: 1,
            // url: "https://th.bing.com/th/id/OIP.ULq5QQnJfNFuhcLNBVqzAwHaE7?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        })    
    }

    items.push({
        // type: "DIGITAL_PRODUCT",
        name: "Delivery Fee",
        price: transaction.deliveryFee,
        quantity: 1,
        // url: "https://th.bing.com/th/id/OIP.ULq5QQnJfNFuhcLNBVqzAwHaE7?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    })
    if (freeOngkir > 0) {
        fees.push({
            type: "Free Ongkir",
            // name: "Free Ongkir Promo",
            value: freeOngkir * -1,
            // quantity: 1,
            // url: "https://th.bing.com/th/id/OIP.ULq5QQnJfNFuhcLNBVqzAwHaE7?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        })
    } 
    body.items = items; 
    console.log(body);
    
    body.fees = fees;

    const requestOptions = {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
        body: JSON.stringify(body)
    }

    try {
        const xenditResponse = await fetch(`${process.env.XENDIT_URL}/v2/invoices`, requestOptions);
 
        
        if (!xenditResponse.ok) {
            throw new Error(`Error: ${xenditResponse.statusText}`);
        }
        const result = await xenditResponse.json();
        return result;
    } catch (error) {
 
        throw new Error(error.message);
    }
}

export const getTransactionXendit = async (actionId) => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }

        const xenditResponse = await fetch(`${process.env.XENDIT_URL}/payment_requests/${actionId}`, requestOptions);
        if (!xenditResponse.ok) {
            throw new Error(`Error: ${xenditResponse.statusText}`);
        }
        const result = await xenditResponse.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const refundXendit = async (transactionId, gatewayResponse, amount) => {
    try {
        const body = {}
        // const body = {
        //     amount: amount,
        //     external_refund_id: transactionId,
        //     reason: "REQUESTED_BY_CUSTOMER",
        //     payment_request_id: paymentRequestId
        // }
        
        if (gatewayResponse.payment_method === "EWALLET" && 
            gatewayResponse.payment_channel != "OVO" &&
            gatewayResponse.payment_channel != "JENIUSPAY"
        ) {
            const requestOptions = {
                method: 'POST',
                headers: headers,
                redirect: 'follow',
                body: JSON.stringify(body)
            }
    
            const xenditResponse = await fetch(`${process.env.XENDIT_URL}/ewallets/charges/${gatewayResponse.payment_id}/refunds`, requestOptions);
     
            
            if (!xenditResponse.ok) {
                throw new Error(`Error: ${xenditResponse.statusText}`);
            }
            const result = await xenditResponse.json();
            return result;
        }
        else if (
            ["BCA", 
             "BNI", 
             "BSI", 
             "BRI", 
             "MANDIRI", 
             "PERMATA", 
             "SAHABAT_SAMPOERNA", 
             "BNC", 
             "DD_BRI", 
             "DD_BCA_KLIKPAY"].includes(gatewayResponse.payment_method)
        ) {
            const requestOptions = {
                method: 'POST',
                headers: headers,
                redirect: 'follow',
                body: JSON.stringify(body)
            }
    
            const xenditResponse = await fetch(`${process.env.XENDIT_URL}/cards/charges/${gatewayResponse.payment_id}/refunds`, requestOptions);
                 
            if (!xenditResponse.ok) {
                throw new Error(`Error: ${xenditResponse.statusText}`);
            }
            const result = await xenditResponse.json();
            return result;
        }
        else {
            throw new Error("Refund feature is not available as the method is not provided. Please contact admin for this payment method");
        }

    } catch (error) {
        throw new Error(error.message);
    }
}