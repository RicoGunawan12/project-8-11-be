export const userStoreSchema = {
  role: {
    isString: true,
    custom: {
      options: (value) => {
        if (value === null || value === undefined) {
          return true; 
        }

        const allowedInputs = ['user', 'admin'];
        
        return allowedInputs.indexOf(value) !== -1;
      },
      errorMessage: 'Role must be between user and admin only',
    }
  },
  fullName: {
    isString: true,
    notEmpty: {
      errorMessage: 'Full name is required',
    },
    isLength: {
      options: { min: 3 },
      errorMessage: 'Full name must be at least 3 characters long',
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
    custom: {
      options: (value, {req}) => {
        if (value === null || value === undefined) {
          return true; 
        }

        return value === req.body.password;
      },
      errorMessage: 'Confirm password must be the same as entered password earlier',
    }
  },
  phone: {
    isString: true,
    notEmpty: {
      errorMessage: 'Phone Number is required',
    },
  },
}