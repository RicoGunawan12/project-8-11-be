import {
  createProductService,
  getProductByIdService,
  getProductsService,
} from "../services/product.service.js";
import { createProductVariantService } from "../services/productVariantService.js";
import { checkTransactionWithVoucher } from "../services/transaction.service.js";
import {
  applyVoucherService,
  checkVoucherByCodeService,
  createVouchersService,
  deleteVoucherByCodeService,
  deleteVouchersByCodeService,
  getAllVouchersService,
  getVoucherByCodeService,
  updateVouchersService,
} from "../services/voucher.service.js";
import { BASE_URL, UPLOAD_FOLDER } from "../utils/uploader.js";

// #region GET

export const getAllVouchers = async (req, res) => {
  const vouchers = await getAllVouchersService();
  return res.status(200).json(vouchers);
};

export const getVoucherByCode = async (req, res) => {
 
  res.set("Cache-Control", "no-store");
  const { code, totalPrice } = req.query;
  const userId = req.user.userId;

  const voucherHasUsed = await checkTransactionWithVoucher(code, userId);
  if (!voucherHasUsed) {
      try {
        const vouchers = await checkVoucherByCodeService(code, totalPrice);
        if(vouchers){
          return res.status(200).json(vouchers);
        }
        return res.status(400).json({ message: "Invalid Voucher!" });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
    return res.status(400).json({ message: "Voucher has used!" });
};

export const getByCodeNonUser = async (req, res) => {
 
  res.set("Cache-Control", "no-store");
  const { code } = req.query;
  const vouchers = await getVoucherByCodeService(code);
  if(vouchers){
    return res.status(200).json(vouchers);
  }
  return res.status(400).json({ message: "Voucher not found!" });
}
// #endregion

// #region CREATE

export const createVouchers = async (req, res) => {
  const { vouchers } = req.body;
  try {
    await createVouchersService(vouchers);
    return res.status(200).json({ message: "Vouchers created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// #endregion

// #region UPDATE

export const updateVouchers = async (req, res) => {
  try {
 
    await updateVouchersService(req.body);
    return res.status(200).json({ message: "Voucher updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// #endregion

// #region DELETE

export const deleteVoucherByCode = async (req, res) => {
  const { code } = req.body;
  console.log(code)
  try {
    const response = await deleteVoucherByCodeService(code);
    return res.status(200).json("Voucher has been deleted successfully");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const deleteVouchersByCode = async (req, res) => {
  const { voucherCode } = req.body;
  try {
    const response = await deleteVouchersByCodeService(voucherCode);
    return res.status(200).json("Voucher(s) has been deleted successfully");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// #endregion

// #region TRANSACTIONS

export const applyVoucher = async (req, res) => {
  const { voucherCode, totalAmount } = req.body;
  try {
    const totalDiscount = await applyVoucherService(voucherCode, totalAmount);
    return totalDiscount;
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// #endregion
