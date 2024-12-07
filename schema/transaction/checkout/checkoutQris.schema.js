export const checkoutQrisSchema = {
    transactionId: {
      isUUID: {
        errorMessage: 'Transaction ID must be a valid UUID',
      },
      notEmpty: {
        errorMessage: 'Transaction ID is required',
      },
    },
    amount: {
      isInt: {
        options: { min: 1 },
        errorMessage: 'Amount must be a valid integer greater than or equal to 1',
      },
      toInt: true,
      notEmpty: {
        errorMessage: 'Amount is required',
      },
    },
  };
  