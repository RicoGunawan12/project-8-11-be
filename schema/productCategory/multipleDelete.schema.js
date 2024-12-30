export const productCategoryMultipleDeleteSchema = {
  productCategoryId: {
    custom: {
      options: (value) => {
        if (value === null || value === undefined) {
          return false;
        }

        return Array.isArray(value);
      },
      errorMessage: "Product category target(s) must be specified",
    },
  },
};