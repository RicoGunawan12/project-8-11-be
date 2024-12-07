import { body, checkSchema, validationResult } from "express-validator";
import { voucherSchema } from "../../schema/model/voucher.schema.js";
import { updateStatusSchema } from "../../schema/transaction/updateStatus.schema.js";
import { paymentMethodSchema } from "../../schema/transaction/datas/paymentMethod.schema.js";
import { cardSchema } from "../../schema/transaction/datas/card.schema.js";
import { billingInformationSchema } from "../../schema/transaction/datas/billingInformation.schema.js";
import { cardInformationSchema } from './../../schema/transaction/datas/cardInformation.schema.js';

export const updateStatusValidator = [

    checkSchema(updateStatusSchema),

    body("data")
    .isObject()
    .withMessage("Data should be an object"),

    body("data.payment_method")
    .isObject()
    .withMessage("Payment Method should be an object")
    .custom(async (paymentMethod, { req }) => {
        const paymentMethodValidator = checkSchema(paymentMethodSchema);
        const paymentMethodRequest = { body: paymentMethod };
        for (const validator of paymentMethodValidator) {
            await validator.run(paymentMethodRequest);
        }

        const result = validationResult(paymentMethodRequest);
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg);
        }

        return true;
    }),

    body("data.payment_method.card")
    .isObject()
    .withMessage("Card should be an object")
    .custom(async (card, { req }) => {
        const cardValidator = checkSchema(cardSchema);
        const cardRequest = { body: card };
        for (const validator of cardValidator) {
            await validator.run(cardRequest);
        }

        const result = validationResult(cardRequest);
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg);
        }

        return true;
    }),

    body("data.payment_method.card.card_information")
    .isObject()
    .withMessage("Card Information should be an object")
    .custom(async (cardInformation, { req }) => {
        const cardInformationValidator = checkSchema(cardInformationSchema);
        const cardInformationRequest = { body: cardInformation };
        for (const validator of cardInformationValidator) {
            await validator.run(cardInformationRequest);
        }

        const result = validationResult(cardInformationRequest);
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg);
        }

        return true;
    }),
    body("data.payment_method.card.channel_properties")
    .isObject()
    .withMessage("Card Properties should be an object")
    .custom(async (channelProperties, { req }) => {
        const channelPropertiesValidator = checkSchema(channelPropertiesSchema);
        const channelPropertiesRequest = { body: channelProperties };
        for (const validator of channelPropertiesValidator) {
            await validator.run(channelPropertiesRequest);
        }

        const result = validationResult(channelPropertiesRequest);
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg);
        }

        return true;
    }),

    body("data.payment_method.billing_information")
    .isObject()
    .withMessage("Billing Information should be an object")
    .custom(async (billingInformation, { req }) => {
        const billingInformationValidator = checkSchema(billingInformationSchema);
        const billingInformationRequest = { body: billingInformation };
        for (const validator of billingInformationValidator) {
            await validator.run(billingInformationRequest);
        }

        const result = validationResult(billingInformationRequest);
        if (!result.isEmpty()) {
            throw new Error(result.array()[0].msg);
        }

        return true;
    }),
];
