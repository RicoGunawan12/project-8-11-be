import { Sequelize } from "sequelize"
import { VoucherTypeModel } from "../association/association.js"


export const getAllVoucherTypesService =  async ()=> {
  const voucherType = await VoucherTypeModel.findAll()
  return voucherType
}

export const getVoucherTypeByCodeService = async (code) => {

  // console.log(code)
  const voucherType =  await VoucherTypeModel.findOne({
    where: {
      voucherTypeCode : code
    }
  })
  return voucherType
}

export const getVoucherTypeByCodeListService = async (voucherTypeCodes) => {
  const voucherTypes = await VoucherTypeModel.findAll({
    where: {
      voucherTypeCode: voucherTypeCodes
    }
  });

  return voucherTypes
}

export const createVoucherTypesService = async (req) => {

  const {voucherTypes} = req
  const voucherTypeCodes = voucherTypes.map((code) => code.voucherTypeCode);

  const duplicatedData = await getVoucherTypeByCodeListService(voucherTypeCodes)

  if(duplicatedData.length > 1) throw new Error(`Duplicated Voucher Type Code ${duplicatedData.at(0).voucherTypeCode}`) 

  const res = await VoucherTypeModel.bulkCreate(voucherTypes);
  
  return res;
}

export const updateVoucherTypesService = async (req) => {
  const { voucherTypes } = req;
  const voucherTypeCodes = voucherTypes.map((code) => code.voucherTypeCode);

  const isExists = await getVoucherTypeByCodeListService(voucherTypeCodes);
  if (isExists.length !== voucherTypes.length) {
    const notFoundCodes = voucherTypeCodes.filter(v => 
      !isExists.some(item => item.voucherTypeCode === v)
    );

    if (notFoundCodes.length > 0) {
      throw new Error(`Voucher Type Code ${notFoundCodes[0]} doesn't exist`);
    }
  }

  for (const voucherType of voucherTypes) {
    const [updatedRowCount] = await VoucherTypeModel.update(
      {
        voucherTypeName: voucherType.voucherTypeName,
      },
      {
        where: {
          voucherTypeCode: voucherType.voucherTypeCode,
        },
      }
    );

    if (updatedRowCount === 0) {
      throw new Error(`No records were updated for Voucher Type Code ${voucherType.voucherTypeCode}`);
    }
  }

  return;
};



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