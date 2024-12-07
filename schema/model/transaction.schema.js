export const transactionSchema = {
    addressId: {
        isUUID: {
            errorMessage: 'Address ID must be a valid UUID',
        },
        notEmpty: {
            errorMessage: 'Address ID is required',
        },
    },
    paymentMethod: {
        isString: {
            errorMessage: 'Payment Method must be a valid string',
        },
        notEmpty: {
            errorMessage: 'Payment Method is required',
        },
    },
    expedition: {
        isString: {
            errorMessage: 'Expedition must be a valid string',
        },
        notEmpty: {
            errorMessage: 'Expedition is required',
        },
    },
    shippingType: {
        isString: {
            errorMessage: 'Shipping Type must be a valid string',
        },
        notEmpty: {
            errorMessage: 'Shipping Type is required',
        },
    },
    deliveryFee: {
        isInt: {
            options: { min: 0 },
            errorMessage: 'Delivery Fee must be a valid integer and greater than or equal to 0',
        },
        toInt: true,
        notEmpty: {
            errorMessage: 'Delivery Fee is required',
        },
    },
    deliveryCashback: {
        isInt: {
            options: { min: 0 },
            errorMessage: 'Delivery Cashback must be a valid integer and greater than or equal to 0',
        },
        toInt: true,
        notEmpty: {
            errorMessage: 'Delivery Cashback is required',
        },
    },
    notes: {
        optional: true,
        isString: {
            errorMessage: 'Notes must be a valid string',
        },
    },
};
