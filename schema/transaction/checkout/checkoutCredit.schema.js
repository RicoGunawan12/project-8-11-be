export const checkoutCreditSchema = {
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
    card_number: {
      isCreditCard: {
        errorMessage: 'Card Number must be a valid credit card number',
      },
      notEmpty: {
        errorMessage: 'Card Number is required',
      },
    },
    card_exp_month: {
      isInt: {
        options: { min: 1, max: 12 },
        errorMessage: 'Card Expiration Month must be between 1 and 12',
      },
      toInt: true,
      notEmpty: {
        errorMessage: 'Card Expiration Month is required',
      },
    },
    card_exp_year: {
      isInt: {
        options: { min: new Date().getFullYear() },
        errorMessage: 'Card Expiration Year must be the current year or later',
      },
      toInt: true,
      notEmpty: {
        errorMessage: 'Card Expiration Year is required',
      },
    },
    card_cvn: {
      isInt: {
        options: { min: 100, max: 9999 },
        errorMessage: 'Card CVN must be a valid 3- or 4-digit number',
      },
      toInt: true,
      notEmpty: {
        errorMessage: 'Card CVN is required',
      },
    },
    is_multiple_use: {
      isBoolean: {
        errorMessage: 'Is Multiple Use must be TRUE or FALSE',
      },
      toBoolean: true,
      notEmpty: {
        errorMessage: 'Is Multiple Use is required',
      },
    },
    should_authenticate: {
      isBoolean: {
        errorMessage: 'Should Authenticate must be TRUE or FALSE',
      },
      toBoolean: true,
      notEmpty: {
        errorMessage: 'Should Authenticate is required',
      },
    },
    card_holder_email: {
      isEmail: {
        errorMessage: 'Card Holder Email must be a valid email address',
      },
      notEmpty: {
        errorMessage: 'Card Holder Email is required',
      },
    },
    card_holder_first_name: {
      isString: {
        errorMessage: 'Card Holder First Name must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Card Holder First Name is required',
      },
    },
    card_holder_last_name: {
      isString: {
        errorMessage: 'Card Holder Last Name must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Card Holder Last Name is required',
      },
    },
    card_holder_phone_number: {
      isString: {
        errorMessage: 'Card Holder Phone Number must be a valid string',
      },
      matches: {
        options: [/^\d{10,15}$/],
        errorMessage: 'Card Holder Phone Number must be between 10 to 15 digits',
      },
      notEmpty: {
        errorMessage: 'Card Holder Phone Number is required',
      },
    },
  };
  