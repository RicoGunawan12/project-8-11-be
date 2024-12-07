export const transactionIdSchema = {
    transactionId: {
      isUUID: {
        errorMessage: 'Transaction ID must be a valid UUID',
      },
      notEmpty: {
        errorMessage: 'Transaction ID is required',
      },
    },
  };
  