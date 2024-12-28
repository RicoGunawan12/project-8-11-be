export const userSchema = {
    username: {
      isString: true,
      notEmpty: {
        errorMessage: 'Username is required',
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'Username must be at least 3 characters long',
      }
    },
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
    confirmPassword: {
      isString: true,
      notEmpty: {
        errorMessage: 'Confirm password is required',
      },
    },
    phoneNumber: {
      isString: true,
      notEmpty: {
        errorMessage: 'Phone Number is required',
      },
    },
  };
  