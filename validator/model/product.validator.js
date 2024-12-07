import { body, checkSchema, validationResult } from "express-validator";
import { productVariantSchema } from "../../schema/model/productVariant.schema.js";
import { productSchema } from './../../schema/model/product.schema.js';

export const productsValidator = [

  checkSchema(productSchema),
  body('productVariants')
    .isArray({ min: 1 })
    .withMessage('Product Variants should be a non-empty array'),

  body('productVariants.*').custom(async (productVariant, { req }) => {
    const schemaValidator = checkSchema(productVariantSchema);
    
    const productVariantRequest = { body: productVariant };
    for (const validator of schemaValidator) {
      await validator.run(productVariantRequest);
    }
    
    const result = validationResult(productVariantRequest);
    if (!result.isEmpty()) {
      throw new Error(result.array()[0].msg);
    }

    return true;
  }),
  
];
