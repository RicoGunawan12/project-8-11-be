export const userDeactivateSchema = {
  userId: {
    custom: {
      options: (value) => {
        if (value === null || value === undefined) {
          return false; 
        }

        return typeof value === 'string' || Array.isArray(value);
      },
      errorMessage: 'User target(s) must be specified',
    }
  },
};