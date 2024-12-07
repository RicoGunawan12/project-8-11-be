export const cardInformationSchema = {
    type: {
      isString: {
        errorMessage: 'Type must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Type is required',
      },
    },
    issuer: {
      isString: {
        errorMessage: 'Issuer must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Issuer is required',
      },
    },
    country: {
      isString: {
        errorMessage: 'Country must be a valid string',
      },
      isLength: {
        options: { min: 2, max: 2 },
        errorMessage: 'Country must be a valid 2-character ISO code',
      },
      notEmpty: {
        errorMessage: 'Country is required',
      },
    },
    network: {
      isString: {
        errorMessage: 'Network must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Network is required',
      },
    },
    expiry_year: {
      isInt: {
        options: { min: new Date().getFullYear() },
        errorMessage: 'Expiry year must be a valid integer and in the future',
      },
      toInt: true,
      notEmpty: {
        errorMessage: 'Expiry year is required',
      },
    },
    expiry_month: {
      isInt: {
        options: { min: 1, max: 12 },
        errorMessage: 'Expiry month must be a valid integer between 1 and 12',
      },
      toInt: true,
      notEmpty: {
        errorMessage: 'Expiry month is required',
      },
    },
    fingerprint: {
      isString: {
        errorMessage: 'Fingerprint must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Fingerprint is required',
      },
    },
    cardholder_name: {
      optional: true,
      isString: {
        errorMessage: 'Cardholder name must be a valid string',
      },
    },
    masked_card_number: {
      isString: {
        errorMessage: 'Masked card number must be a valid string',
      },
      matches: {
        options: [/^[0-9X]+$/],
        errorMessage: 'Masked card number must contain only digits or Xs',
      },
      notEmpty: {
        errorMessage: 'Masked card number is required',
      },
    },
  };
  