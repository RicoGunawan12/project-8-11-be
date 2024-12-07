import { body, checkSchema, validationResult } from "express-validator";
import { voucherSchema } from "../../schema/model/voucher.schema.js";
import { voucherTypeSchema } from "../../schema/model/voucherType.schema.js";

export const voucherTypesValidator = [
  body('voucherTypes')
    .isArray({ min: 1 })
    .withMessage('voucherTypes should be a non-empty array'),

  body('voucherTypes.*').custom(async (voucherType, { req }) => {
    const schemaValidator = checkSchema(voucherTypeSchema);
    
    const voucherTypeRequest = { body: voucherType };
    for (const validator of schemaValidator) {
      await validator.run(voucherTypeRequest);
    }
    
    const result = validationResult(voucherTypeRequest);
    if (!result.isEmpty()) {
      throw new Error(result.array()[0].msg);
    }

    return true;
  }),
];
