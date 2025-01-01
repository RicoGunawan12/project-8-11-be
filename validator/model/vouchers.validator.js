import { body, checkSchema, validationResult } from "express-validator";
import { voucherSchema } from "../../schema/model/voucher.schema.js";

export const vouchersValidator = [
  body('vouchers')
    .isArray({ min: 1 })
    .withMessage('vouchers should be a non-empty array'),

  body('vouchers.*').custom(async (voucher, { req }) => {
    const schemaValidator = checkSchema(voucherSchema);
    
    const voucherRequest = { body: voucher };
    for (const validator of schemaValidator) {
      await validator.run(voucherRequest);
    }
    // console.log("testing")
    const result = validationResult(voucherRequest);
    if (!result.isEmpty()) {
      throw new Error(result.array()[0].msg);
    }
    // console.log("voucher good")
    return true;
  }),
];
