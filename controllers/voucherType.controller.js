
// #region GET

import { createVoucherTypesService, deleteVoucherTypeByCodeService, getAllVoucherTypesService, getVoucherTypeByCodeService, updateVoucherTypesService } from "../services/voucherType.service.js";

export const getAllVoucherTypes = async (req,res) => {
    const voucherTypes = await getAllVoucherTypesService();
    return res.status(200).json(voucherTypes)
}

export const getVoucherTypeByCode = async (req,res) => {
  const {code} = req.body
  const voucherTypes = await getVoucherTypeByCodeService(code);
  return res.status(200).json(voucherTypes)
}

// #endregion

// #region CREATE

export const createVoucherTypes = async (req,res) => {
  
  try {
    await createVoucherTypesService(req.body);
    return res.status(200).json({ message: "Voucher Type created successfully "});
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// #endregion

// #region UPDATE

  export const updateVoucherTypes = async (req,res) => {
    try {
      await updateVoucherTypesService(req.body);
      return res.status(200).json({ message: "Voucher Type updated successfully "});
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

// #endregion

// #region DELETE

export const deleteVoucherTypeByCode = async (req,res) => {
  
  const {code} = req.body
  try {
    await deleteVoucherTypeByCodeService(code);
    return res.status(200).json({ message: "Voucher Type removed successfully"});
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// #endregion
