export const updateProductSchema = {
    productPromo: {
        optional: true,
        isInt: {
          options: { min: 0 },
          errorMessage: 'Product Promo must be a valid integer and greater than or equal to 0',
        },
        toInt: true,
        notEmpty: {
            errorMessage: 'Product Promo is required',
        }
      },
    productPromoExpiry: {
        optional: true,
        isDate: {
            errorMessage: 'Product Promo Expiry must be a valid date',
        },
    },
}