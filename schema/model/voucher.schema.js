

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
    isFloat: {
      options: { min: 0, max: 100 },
      errorMessage: 'Discount must be a valid number with two decimal places',
    },
    optional: true,
    toFloat: true,
  }
};