export const updateStatusSchema = {
    created: {
      isISO8601: {
        errorMessage: 'Created date must be a valid ISO 8601 date',
      },
      notEmpty: {
        errorMessage: 'Created date is required',
      },
    },
    business_id: {
      isUUID: {
        errorMessage: 'Business ID must be a valid UUID',
      },
      notEmpty: {
        errorMessage: 'Business ID is required',
      },
    },
    event: {
      isString: {
        errorMessage: 'Event must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Event is required',
      },
    },
    api_version: {
      optional: true,
      isString: {
        errorMessage: 'API version must be a valid string if provided',
      },
    },
  };
  