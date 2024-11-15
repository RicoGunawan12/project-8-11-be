import { body, checkSchema, validationResult } from "express-validator";
import { voucherSchema } from "../../DTO/schema/voucher.dto.js";
import { voucherTypeSchema } from "../../DTO/schema/voucherType.dto.js";

export const createVoucherTypesValidator = [
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
