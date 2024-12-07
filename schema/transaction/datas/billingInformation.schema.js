export const billingInformationSchema = {
    city: {
      optional: true,
      isString: {
        errorMessage: 'City must be a valid string if provided',
      },
    },
    country: {
      isString: {
        errorMessage: 'Country must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Country is required',
      },
    },
    postal_code: {
      optional: true,
      isString: {
        errorMessage: 'Postal code must be a valid string if provided',
      },
    },
    street_line1: {
      optional: true,
      isString: {
        errorMessage: 'Street line 1 must be a valid string if provided',
      },
    },
    street_line2: {
      optional: true,
      isString: {
        errorMessage: 'Street line 2 must be a valid string if provided',
      },
    },
    province_state: {
      optional: true,
      isString: {
        errorMessage: 'Province/State must be a valid string if provided',
      },
    },
  };
  