import { VoucherModel, VoucherTypeModel } from "../association/association.js";
import { getVoucherTypeByCodeService } from "./voucherType.service.js";

export const getAllVouchersService =  async ()=> {
  const voucher = await VoucherModel.findAll({
    include: [
      {
        model: VoucherTypeModel
      }
    ]
  })
  return voucher
}

export const getVoucherByCodeService = async (code) => {
  const voucher =  await VoucherModel.findOne({
    where: {
      voucherCode: code
    }
  })

  if(!voucher) return {message : `Voucher Code ${code} Not Found`}

  return voucher
}

export const createVouchersService = async (req) => {

  const {vouchers} = req

  const voucherTypeExist = getVoucherTypeByCodeService(req.voucherTypeCode)

  if(!voucherTypeExist) return res.status(404).json({error: "Voucher Type doesn't exist"})
  
  const voucherCodes = vouchers.map((code) => code.voucherTypeCode);

  const duplicatedData = await VoucherModel.findAll({
    where: {
      voucherCode: voucherCodes
    },
    attributes: ['voucherTypeCode']
  });

  if(duplicatedData.length > 1) 
  return {
    message: 'Duplicated Voucher Type Code',
    duplicatedData,
  }

  const res = await VoucherModel.bulkCreate(vouchers, {
    returning: true, 
  });

}


export const deleteVoucherByCodeService = async (code) =>{
  
  const result = await VoucherModel.destroy({
    where: {
      voucherCode: code,
    },
  });

  if (result === 0) {
    throw new Error(`Voucher with Code ${code} not found`);
  }

  return result
}