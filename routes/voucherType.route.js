import express from 'express';
import { createVoucherTypes, deleteVoucherTypeByCode, getAllVoucherTypes, getVoucherTypeByCode } from "../controllers/voucherType.controller.js";
import { validateDTO } from "../DTO/validate.js";
import { createVoucherTypesValidator } from "../validator/voucherType/createVoucherTypes.validator.js";
import { CodeValidator } from '../validator/general/getByCode.validator.js';

const VoucherTypeRoute = express.Router();

VoucherTypeRoute.get('/getAllVoucherTypes', getAllVoucherTypes);
VoucherTypeRoute.get('/getVoucherTypeByCode',CodeValidator, getVoucherTypeByCode);
VoucherTypeRoute.post('/createVoucherTypes', createVoucherTypesValidator,validateDTO, createVoucherTypes);
VoucherTypeRoute.post('/deleteVoucherTypeByCode', CodeValidator,validateDTO, deleteVoucherTypeByCode);

export default VoucherTypeRoute;
