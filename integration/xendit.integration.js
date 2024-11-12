import { Xendit, PaymentRequest as PaymentRequestClient } from "xendit-node"

const xenditClient = new Xendit({secretKey: process.env.XENDIT_API})
const { PaymentRequest } = xenditClient

const xenditPaymentRequestClient = new PaymentRequestClient({secretKey: process.env.XENDIT_API})


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
    console.log(
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
                    channelProperties : {
                        successReturnUrl : "https://redirect.me/success",
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
            referenceId : transactionId,
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
        amount : amount,
        paymentMethod : {
            qrCode : {
                channelCode : "QRIS"
            },
            reusability : "ONE_TIME_USE",
            type : "QR_CODE"
        },
        currency : "IDR",
        referenceId : transactionId
    }
    
    const response = await xenditPaymentRequestClient.createPaymentRequest({
        data
    })

    return response;
}

export const createVATransactionXendit = async (req, res) => {
    const data = {
        country : "ID",
        amount : 15000,
        metadata : {
            sku : "example-sku-1234"
        },
        paymentMethod : {
            reusability : "ONE_TIME_USE",
            type : "VIRTUAL_ACCOUNT",
            virtualAccount : {
                channelProperties : {
                    customerName : "csfskhskdh",
                    expiresAt : new Date("2025-01-03T17:00:00Z")
                },
                channelCode : "BNI"
            },
            referenceId : "example-1234"
        },
        currency : "IDR",
        referenceId : "example-ref-1234"
    }
      
    const response = await xenditPaymentRequestClient.createPaymentRequest({
        data
    })
    return res.status(200).json({ response });
}