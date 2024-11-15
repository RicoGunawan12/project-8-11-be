
// #region GET

import { createVoucherTypesService, getAllVoucherTypesService, getVoucherTypeByCodeService } from "../services/voucherType.service.js";

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
  
  const response = await createVoucherTypesService(req.body);
  return res.status(200).json(response);
}

// #endregion

// #region DELETE

export const deleteVoucherTypeByCode = async (req,res) => {
  
  console.log(req)
  const response = await deleteVoucherTypeByCode(req.body);
  return res.status(200).json(response);
}

// #endregion
