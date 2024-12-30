export const updateInactiveBestSellersSchema = {
  productId: {
    custom: {
      options: (value) => {
        if (value === null || value === undefined) {
          return false;
        }

        return typeof value === "string" || Array.isArray(value);
      },
      errorMessage: "Product target(s) must be specified",
    },
  },
};
