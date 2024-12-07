export const updateCartSchema = {
    quantity: {
      isInt: {
        options: { min: 1 },
        errorMessage: 'Quantity must be a valid integer greater than or equal to 1',
      },
      toInt: true,
      notEmpty: {
        errorMessage: 'Quantity is required',
      },
    },
};