export const userDeactivateSchema = {
  userId: {
    isString: true,
    notEmpty: {
      errorMessage: 'User target is required',
    },
  },
};