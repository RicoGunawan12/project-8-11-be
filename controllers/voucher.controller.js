import { createProductService, getProductByIdService, getProductsService } from "../services/product.service.js";
import { createProductVariantService } from "../services/productVariantService.js";
import { createVouchersService, getAllVouchersService, getVoucherByCodeService } from "../services/voucher.service.js";
import { BASE_URL, UPLOAD_FOLDER } from "../utils/uploader.js";

// #region GET

export const getAllVouchers = async (req,res) => {
    const vouchers = await getAllVouchersService();
    return res.status(200).json(vouchers)
}

export const getVoucherByCode = async (req,res) => {
    const {code} = req.body
    const vouchers = await getVoucherByCodeService(code);
    return res.status(200).json(vouchers)
}
// #endregion

// #region CREATE

export const createVouchers = async (req,res) => {
  
    await createVouchersService(req.body)

    return res.status(200)
}
  
// #endregion

// #region DELETE

export const deleteVoucherByCode = async (req,res) => {

    const response = await deleteVoucherTypeByCode(req.body);
    return res.status(200).json(response);
}

// #endregion
