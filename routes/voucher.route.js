import express from 'express';
import { applyVoucher, createVouchers, deleteVoucherByCode, deleteVouchersByCode, getAllVouchers, getByCodeNonUser, getVoucherByCode, updateVouchers } from '../controllers/voucher.controller.js';
import { validateSchema } from '../validator/validate.js';
import { vouchersValidator } from '../validator/model/vouchers.validator.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { getByCode } from '../schema/general/getByCode.schema.js';
import { applyVoucherSchema } from './../schema/voucher/applyVoucher.schema.js';
import { voucherMultipleDeleteSchema } from '../schema/voucher/multipleDelete.schema.js';
import { adminMiddleware, userMiddleware } from '../middleware/auth.middleware.js';

const VoucherRoute = express.Router();

VoucherRoute.get('/', getAllVouchers)
VoucherRoute.get('/getByCode',userMiddleware, generalValidator(getByCode),validateSchema, getVoucherByCode)
VoucherRoute.get('/getByCodeV2', generalValidator(getByCode),validateSchema, getByCodeNonUser)
VoucherRoute.post('/', vouchersValidator,validateSchema, createVouchers)
VoucherRoute.put('/', vouchersValidator,validateSchema, updateVouchers)
VoucherRoute.delete('/', deleteVoucherByCode)

VoucherRoute.post('/applyVoucher',generalValidator(applyVoucherSchema),validateSchema, applyVoucher)
VoucherRoute.post('/delete/multiple', adminMiddleware, generalValidator(voucherMultipleDeleteSchema), validateSchema, deleteVouchersByCode)

export default VoucherRoute;
