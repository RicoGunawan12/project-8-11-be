
export const voucherSchema = {
  voucherTypeCode: {
    isString: true,
    notEmpty: {
      errorMessage: 'Voucher Type Code is required',
    },
  },
  voucherCode: {
    isString: true,
    notEmpty: {
      errorMessage: 'Voucher Code is required',
    },
  },
  voucherEndDate: {
    isISO8601: true,
    toDate: true,
    errorMessage: 'Voucher End Date must be a valid ISO date',
  },
  maxDiscount: {
    isFloat: {
      options: { min: 0, max: 100 },
      errorMessage: 'Max Discount must be a valid number with two decimal places',
    },
    optional: true,
    toFloat: true,
  },
  discount: {
    isFloat: {
      options: { min: 0, max: 100 },
      errorMessage: 'Discount must be a valid number with two decimal places',
    },
    optional: true,
    toFloat: true,
  }
};