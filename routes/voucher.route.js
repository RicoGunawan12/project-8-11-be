import express from 'express';
import { createVouchers, deleteVoucherByCode, getAllVouchers, getVoucherByCode } from '../controllers/voucher.controller.js';
import { validateDTO } from '../DTO/validate.js';
import { createVouchersValidator } from '../validator/voucher/createVouchers.validator.js';
import { CodeValidator } from '../validator/general/getByCode.validator.js';

const VoucherRoute = express.Router();

VoucherRoute.get('/getAllVouchers', getAllVouchers);
VoucherRoute.post('/createVouchers', createVouchersValidator,validateDTO, createVouchers);
VoucherRoute.get('/getVoucherByCode',CodeValidator, getVoucherByCode);
VoucherRoute.post('/deleteVoucherByCode',CodeValidator,deleteVoucherByCode)

export default VoucherRoute;
