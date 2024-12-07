import express from 'express';
import { createVoucherTypes, deleteVoucherTypeByCode, getAllVoucherTypes, getVoucherTypeByCode, updateVoucherTypes } from "../controllers/voucherType.controller.js";
import { validateSchema } from "../validator/validate.js";
import { voucherTypesValidator } from "../validator/model/voucherTypes.validator.js";
import { generalValidator } from '../validator/general/general.validator.js';
import { getByCode } from '../schema/general/getByCode.schema.js';

const VoucherTypeRoute = express.Router();

VoucherTypeRoute.get('/', getAllVoucherTypes);
VoucherTypeRoute.get('/getByCode',generalValidator(getByCode),validateSchema, getVoucherTypeByCode);
VoucherTypeRoute.post('/', voucherTypesValidator,validateSchema, createVoucherTypes);
VoucherTypeRoute.put('/', voucherTypesValidator,validateSchema, updateVoucherTypes);
VoucherTypeRoute.delete('/', generalValidator(getByCode),validateSchema, deleteVoucherTypeByCode);

export default VoucherTypeRoute;
