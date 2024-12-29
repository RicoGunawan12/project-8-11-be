import express from 'express';
import { applyVoucher, createVouchers, deleteVoucherByCode, getAllVouchers, getVoucherByCode, updateVouchers } from '../controllers/voucher.controller.js';
import { validateSchema } from '../validator/validate.js';
import { vouchersValidator } from '../validator/model/vouchers.validator.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { getByCode } from '../schema/general/getByCode.schema.js';
import { applyVoucherSchema } from './../schema/voucher/applyVoucher.schema.js';
import { userMiddleware } from '../middleware/auth.middleware.js';

const VoucherRoute = express.Router();

VoucherRoute.get('/', getAllVouchers)
VoucherRoute.get('/getByCode',userMiddleware, generalValidator(getByCode),validateSchema, getVoucherByCode)
VoucherRoute.post('/', vouchersValidator,validateSchema, createVouchers)
VoucherRoute.put('/', vouchersValidator,validateSchema, updateVouchers)
VoucherRoute.delete('/',generalValidator(getByCode),validateSchema,deleteVoucherByCode)

VoucherRoute.post('/applyVoucher',generalValidator(applyVoucherSchema),validateSchema, applyVoucher)

export default VoucherRoute;
