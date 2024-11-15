
export const voucherTypeSchema = {
  voucherTypeCode: {
    isString: true,
    notEmpty: {
      errorMessage: 'Voucher Type Code is required',
    },
  },
  voucherTypeName: {
    isString: true,
    notEmpty: {
      errorMessage: 'Voucher Type Name is required',
    },
  }
};