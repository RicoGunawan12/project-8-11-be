export const channelPropertiesSchema = {
    cardonfile_type: {
        optional: true,
        isString: {
          errorMessage: 'Card on file type must be a valid string',
        }
      },
      failure_return_url: {
        isURL: {
          options: { require_protocol: true },
          errorMessage: 'Failure return URL must be a valid URL with a protocol',
        },
        notEmpty: {
          errorMessage: 'Failure return URL is required',
        },
      },
      success_return_url: {
        isURL: {
          options: { require_protocol: true },
          errorMessage: 'Success return URL must be a valid URL with a protocol',
        },
        notEmpty: {
          errorMessage: 'Success return URL is required',
        },
      },
      skip_three_d_secure: {
        optional: true,
        isBoolean: {
          errorMessage: 'Skip three D secure must be a boolean value or null',
        },
        toBoolean: true,
      },
}