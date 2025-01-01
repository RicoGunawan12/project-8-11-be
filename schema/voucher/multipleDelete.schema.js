export const voucherMultipleDeleteSchema = {
  voucherCode: {
    custom: {
      options: (value) => {
        if (value === null || value === undefined) {
          return false;
        }

        return Array.isArray(value);
      },
      errorMessage: "Voucher target(s) must be specified",
    },
  },
};