

export const voucherSchema = {
  voucherType: {
    isString: true,
    notEmpty: {
      errorMessage: 'Voucher Type is required',
    },
  },
  voucherCode: {
    isString: true,
    notEmpty: {
      errorMessage: 'Voucher Code is required',
    },
  },
  voucherEndDate: {
    isISO8601: {
      errorMessage: 'Voucher End Date must be a valid ISO date'
    },
    optional: true, 
    toDate: true,
  },
  voucherStartDate: {
    isISO8601: {
      errorMessage: 'Voucher End Date must be a valid ISO date'
    },
    optional: true, 
    toDate: true,
  },
  maxDiscount: {
    optional: true,
    custom: {
      options: (value) => {
        if (value === null || value === undefined) {
          return true; 
        }
        const floatValue = parseFloat(value);
        return !isNaN(floatValue) && floatValue >= 0;
      },
      errorMessage: 'Max Discount must be a number between 0 and 100 or empty',
    },
  },
  discount: {
    isInt: {
      // options: { min: 0, max: 100 },
      errorMessage: 'Discount must be a valid number',
    },
    optional: true,
    toFloat: true,
  },
  quota: {
    isInt: {
      options: { min: 1 },
      errorMessage: 'Quota must be more than 0',
    },
    optional: true,
    toFloat: true,
  },
  minimumPayment: {
    isInt: {
      options: { min: 1 },
      errorMessage: 'Minimum payment must be more than 0',
    },
    optional: true,
    toFloat: true,
  }
};