export const cardSchema = {
    currency: {
      isString: {
        errorMessage: 'Currency must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Currency is required',
      },
    },
    card_data_id: {
      isString: {
        errorMessage: 'Card data ID must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Card data ID is required',
      },
    },
    card_verification_results: {
      optional: true,
      isString: {
        errorMessage: 'Card verification results must be a valid string',
      },
    },
};
  