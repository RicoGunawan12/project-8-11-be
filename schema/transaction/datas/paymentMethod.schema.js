export const paymentMethodSchema = {
    id: {
      isUUID: {
        errorMessage: 'ID must be a valid UUID',
      },
      notEmpty: {
        errorMessage: 'ID is required',
      },
    },
    type: {
      isString: {
        errorMessage: 'Type must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Type is required',
      }
    },
    status: {
      isString: {
        errorMessage: 'Status must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Status is required',
      }
    },
    created: {
      isISO8601: {
        errorMessage: 'Created date must be a valid ISO 8601 date',
      },
      notEmpty: {
        errorMessage: 'Created date is required',
      },
    },
    ewallet: {
      optional: true,
      isString: {
        errorMessage: 'Ewallet must be a valid string if provided',
      },
    },
    qr_code: {
      optional: true,
      isString: {
        errorMessage: 'QR code must be a valid string if provided',
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
    metadata: {
      optional: true,
      isString: {
        errorMessage: 'Metadata must be a valid string if provided',
      },
    },
    description: {
      optional: true,
      isString: {
        errorMessage: 'Description must be a valid string if provided',
      },
    },
    reusability: {
      isString: {
        errorMessage: 'Reusability must be a valid string',
      },
      notEmpty: {
        errorMessage: 'Reusability is required',
      },
    },
    direct_debit: {
      optional: true,
      isString: {
        errorMessage: 'Direct debit must be a valid string if provided',
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
    virtual_account: {
      optional: true,
      isString: {
        errorMessage: 'Virtual account must be a valid string if provided',
      },
    },
    over_the_counter: {
      optional: true,
      isString: {
        errorMessage: 'Over the counter must be a valid string if provided',
      },
    },
    direct_bank_transfer: {
      optional: true,
      isString: {
        errorMessage: 'Direct bank transfer must be a valid string if provided',
      },
    },
  };
  