export const login = {
    email: {
      isString: true,
      notEmpty: {
        errorMessage: 'Email is required',
      },
      isEmail: {
        errorMessage: 'Email must be valid',
      },
    },
    password: {
      isString: true,
      notEmpty: {
        errorMessage: 'Password is required',
      },
    },
  };
  