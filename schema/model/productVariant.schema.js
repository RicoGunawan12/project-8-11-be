export const productVariantSchema = {
  productColor: { 
    optional: true, 
    isString: {
      errorMessage: 'Product Color must be a valid string',
    },
    notEmpty: {
        errorMessage: 'Product Color is required',
    }
  },
  productSize: {
    optional: true,
    isString: {
      errorMessage: 'Product Size must be a valid string',
    },
    notEmpty: {
        errorMessage: 'Product Size is required',
    }
  },
  sku: {
    notEmpty: {
      errorMessage: 'SKU is required',
    },
    isString: {
      errorMessage: 'SKU must be a valid string',
    },
    isLength: {
      options: { max: 100 },
      errorMessage: 'SKU must be at most 100 characters long',
    },
  },
  productPrice: {
    notEmpty: {
      errorMessage: 'Product Price is required',
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Product Price must be a valid float and greater than or equal to 0',
    },
  },
  productWeight: {
    notEmpty: {
      errorMessage: 'Product Weight is required',
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Product Weight must be a valid float and greater than or equal to 0',
    },
  },
  productStock: {
    notEmpty: {
      errorMessage: 'Product Stock is required',
    },
    isInt: {
      options: { min: 0 },
      errorMessage: 'Product Stock must be a valid integer and greater than or equal to 0',
    },
  },
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
};
