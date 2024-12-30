export const productMultipleDeleteSchema = {
  productId: {
    custom: {
      options: (value) => {
        if (value === null || value === undefined) {
          return false;
        }

        return Array.isArray(value);
      },
      errorMessage: "Product target(s) must be specified",
    },
  },
};