export const sendEmailSchema = {
  email: {
    isEmail: {
      errorMessage: 'Please provide a valid email address',
    },
    notEmpty: {
      errorMessage: 'Email is required',
    },
  },
  name: {
    isString: {
      errorMessage: 'Name should be a valid string',
    },
    notEmpty: {
      errorMessage: 'Name is required',
    },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Name should be between 3 to 50 characters',
    },
  },
  topic: {
    isString: {
      errorMessage: 'Topic should be a valid string',
    },
    notEmpty: {
      errorMessage: 'Topic is required',
    },
  },
  orderNumber: {
    optional: {
      options: { nullable: true },
    },
    isNumeric: {
      errorMessage: 'Order number should be numeric',
    },
    isLength: {
      options: { min: 10, max: 16 },
      errorMessage: 'Order number should be between 10 to 16 digits',
    },
  },
  message: {
    isString: {
      errorMessage: 'Message should be a valid string',
    },
    notEmpty: {
      errorMessage: 'Message is required',
    },
    isLength: {
      options: { min: 10, max: 500 },
      errorMessage: 'Message should be between 10 to 500 characters',
    },
  },
};
