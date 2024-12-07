export const cartSchema = {
  productVariantId: {
    isUUID: {
      errorMessage: 'Product Variant ID must be a valid UUID',
    },
    notEmpty: {
      errorMessage: 'Product Variant ID is required',
    },
  },
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
  