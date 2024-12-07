export const applyVoucherSchema = {
    voucherCode: {
        isString: true,
        notEmpty: {
        errorMessage: 'Voucher Code is required',
        },
    },
    totalAmount: {
        isFloat: true,
        notEmpty: {
            errorMessage: 'Voucher Code is required',
        },
    }
}