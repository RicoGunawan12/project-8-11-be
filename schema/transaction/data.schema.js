export const dataSchema = {
    id: {
      isString: {
        errorMessage: 'ID must be a valid string',
      },
      notEmpty: {
        errorMessage: 'ID is required',
      },
    },
    items: {
      optional: true,
      isArray: {
        errorMessage: 'Items must be a valid array if provided',
      },
    },
    amount: {
      isInt: {
        options: { min: 0 },
        errorMessage: 'Amount must be a valid integer and greater than or equal to 0',
      },
      notEmpty: {
        errorMessage: 'Amount is required',
      },
    },
    status: {
      isString: {
        errorMessage: 'Status must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Status is required',
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
    created: {
      isISO8601: {
        errorMessage: 'Created date must be a valid ISO 8601 date',
      },
      notEmpty: {
        errorMessage: 'Created date is required',
      },
    },
    updated: {
      isISO8601: {
        errorMessage: 'Updated date must be a valid ISO 8601 date',
      },
      notEmpty: {
        errorMessage: 'Updated date is required',
      },
    },
    currency: {
      isString: {
        errorMessage: 'Currency must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Currency is required',
      },
    },
    metadata: {
      optional: true,
      isString: {
        errorMessage: 'Metadata must be a valid string if provided',
      },
    },
    customer_id: {
      optional: true,
      isString: {
        errorMessage: 'Customer ID must be a valid string if provided',
      },
    },
    description: {
      optional: true,
      isString: {
        errorMessage: 'Description must be a valid string if provided',
      },
    },
    failure_code: {
      optional: true,
      isString: {
        errorMessage: 'Failure code must be a valid string if provided',
      },
    },
    reference_id: {
      isUUID: {
        errorMessage: 'Reference ID must be a valid UUID',
      },
      notEmpty: {
        errorMessage: 'Reference ID is required',
      },
    },
    payment_detail: {
      optional: true,
      isString: {
        errorMessage: 'Payment detail must be a valid string if provided',
      },
    },
    channel_properties: {
      optional: true,
      isString: {
        errorMessage: 'Channel properties must be a valid string if provided',
      },
    },
    payment_request_id: {
      isUUID: {
        errorMessage: 'Payment request ID must be a valid UUID',
      },
      notEmpty: {
        errorMessage: 'Payment request ID is required',
      },
    },
  };
  