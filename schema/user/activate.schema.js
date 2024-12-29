export const userActivateSchema = {
  userId: {
    isString: true,
    notEmpty: {
      errorMessage: 'User target is required',
    },
  },
};