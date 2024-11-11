import { Xendit, PaymentRequest as PaymentRequestClient } from "xendit-node"

const xenditClient = new Xendit({secretKey: process.env.XENDIT_API})
const { PaymentRequest } = xenditClient

const xenditPaymentRequestClient = new PaymentRequestClient({secretKey: process.env.XENDIT_API})


export const createCreditCardTransactionXendit = async (
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
            amount: 15000,
            currency: "IDR", // e.g., "IDR" for Indonesian Rupiah
            country: "ID",
            paymentMethod: {
                card: {
                    channelProperties : {
                        successReturnUrl : "https://redirect.me/success",
                        failureReturnUrl: "https://redirect.me/failed"
                    },
                    cardInformation: {
                        expiryMonth: "11",
                        expiryYear: "2035",
                        cardNumber: card_number
                        // cardHolderName: card_holder_name
                    },
                    channelCode: "BBL_CARD_INSTALLMENT"
                },
                reusability: "ONE_TIME_USE",
                type: "CARD"
            },
            referenceId : "example-ref-15zshsudhfuisxc34"
        },
    });
    console.log(tokenResponse.status);
    
    if (tokenResponse.status === "SUCCEEDED") {
        console.log("asdxczxcasdsfd");
        
    }
    // ({
    //     amount: amount,
    //     card_number: card_number,
    //     card_exp_month: card_exp_month,
    //     card_exp_year: card_exp_year,
    //     card_cvn: card_cvn,
    //     is_multiple_use: is_multiple_use,
    //     should_authenticate: should_authenticate,
    //     card_holder_email: card_holder_email,
    //     card_holder_first_name: card_holder_first_name,
    //     card_holder_last_name: card_holder_last_name,
    //     card_holder_phone_number: card_holder_phone_number
    // });
    return tokenResponse
}