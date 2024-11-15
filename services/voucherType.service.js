import { VoucherTypeModel } from "../association/association.js"


export const getAllVoucherTypesService =  async ()=> {
  const voucherType = await VoucherTypeModel.findAll()
  return voucherType
}

export const getVoucherTypeByCodeService = async (code) => {
  const voucherType =  await VoucherTypeModel.findOne({
    where: {
      voucherTypeCode : code
    }
  })

  if(!voucherType) return {message : `Voucher Type Code ${code} Not Found`}

  return voucherType
}

export const createVoucherTypesService = async (req) => {

  const {voucherTypes} = req
  const voucherTypeCodes = voucherTypes.map((code) => code.voucherTypeCode);

  const duplicatedData = await VoucherTypeModel.findAll({
    where: {
      voucherTypeCode: voucherTypeCodes
    },
    attributes: ['voucherTypeCode']
  });

  if(duplicatedData.length > 1) throw new Error({
    message: 'Duplicated Voucher Type Code',
    duplicatedData,
  }) 

  const res = await VoucherTypeModel.bulkCreate(voucherTypes, {
    returning: true, 
  });
  
  return res;
}

export const deleteVoucherTypeByCodeService = async (code) =>{
  
  const result = await VoucherTypeModel.destroy({
    where: {
      voucherTypeCode: code,
    },
  });

  if (result === 0) {
    throw new Error(`Voucher Type with Code ${code} not found`);
  }

  return result
}

export const updateVoucherTypeByCodeService = async () =>{
  
}