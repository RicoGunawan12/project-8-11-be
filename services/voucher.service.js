import { VoucherModel, VoucherTypeModel } from "../association/association.js";
import { getVoucherTypeByCodeService } from "./voucherType.service.js";


// #region GET
export const getAllVouchersService =  async ()=> {
  const voucher = await VoucherModel.findAll()
  return voucher
}

export const getVoucherByCodeService = async (code) => {
  const voucher =  await VoucherModel.findOne({
    where: {
      voucherCode: code
    }
  })

  return voucher
}

export const getVoucherByCodeListService = async (voucherCodes) => {
  const vouchers = await VoucherModel.findAll({
    where: {
      voucherCode: voucherCodes
    }
  });

  return vouchers
}

export const getVoucherByCodeWithVoucherTypeService = async (voucherCode) => {
  const vouchers = await VoucherModel.findOne({
    where: {
      voucherCode: voucherCode
    }
  })
}

// #endregion

// #region CREATE

export const createVouchersService = async (vouchers) => {
  const voucherCodes = vouchers.map((voucher) => voucher.voucherCode);
  const duplicatedData = await VoucherModel.findAll({
    where: {
      voucherCode: voucherCodes,
    },
    attributes: ['voucherCode'],
  });

  if (duplicatedData.length > 0) {
    throw new Error(`Duplicated voucher code: ${duplicatedData[0].get('voucherCode')}`);
  }

  await VoucherModel.bulkCreate(vouchers, {
    returning: true, 
  });

  return;
};

// #endregion

// #region UPDATE

export const updateVouchersService = async (req) => {
  const { vouchers } = req;
  const voucherCodes = vouchers.map((code) => code.voucherCode);

  const isExists = await getVoucherByCodeListService(voucherCodes);
  if (isExists.length !== vouchers.length) {
    const notFoundCodes = voucherCodes.filter(v => 
      !isExists.some(item => item.voucherCode === v)
    );

    if (notFoundCodes.length > 0) {
      throw new Error(`Voucher Code ${notFoundCodes[0]} doesn't exist`);
    }
  }

  for (const voucher of vouchers) {

    const voucherType = await getVoucherTypeByCodeService(voucher.voucherTypeCode);
    if (!voucherType) throw new Error(`Voucher Type Code ${voucher.voucherTypeCode} Not Found`);

    const [updatedRowCount] = await VoucherModel.update(
      {
        voucherTypeId: voucherType.voucherTypeId,
        voucherEndDate: voucher.voucherEndDate ? voucher.voucherEndDate : '',
        maxDiscount: voucher.maxDiscount,
        discount: voucher.discount
      },
      {
        where: {
          voucherCode: voucher.voucherCode,
        },
      }
    );

    if (updatedRowCount === 0) {
      throw new Error(`No records were updated for Voucher Code ${voucher.voucherCode}`);
    }
  }

  return;
};

// #endregion

// #region DELETE

export const deleteVoucherByCodeService = async (code) =>{
  
  const voucher = await getVoucherByCodeService(code)
  if (!voucher) throw new Error(`Voucher with Code ${code} not found`)

  const result = await VoucherModel.destroy({
    where: {
      voucherCode: code,
    },
  });

  return result
}

// #endregion

// #region TRANSACTIONS

export const calculateVoucherDiscount = async (voucherTypeCode, amount, discountAmount, maxDiscount) => {
  switch(voucherTypeCode) {
    case 'OFF':
        if(discountAmount > amount) throw new Error("Payment amount cannot be less than discounted amount")
        else return amount - discountAmount
    case 'PERCENTAGE':
        const discountedAmt = amount * (discountAmount/100)
        if(maxDiscount && discountedAmt > maxDiscount){
          return maxDiscount
        }
        return amount * (discountAmount/100)
    default :
        return 0
  }
}

export const applyVoucherService = async (voucherCode, totalAmount) => {
  const voucher = await getVoucherByCodeWithVoucherTypeService(voucherCode)
  
  if(!voucher) throw new Error(`Voucher with code ${voucherCode} doesn't exist`)

  if(voucher.voucherEndDate && (voucher.voucherEndDate && new Date(voucher.voucherEndDate) < new Date())){
    throw new Error("Voucher has expired")
  }
  const totalDiscount = calculateVoucherDiscount(voucher.voucherTypeCode,totalAmount,voucher.discount, voucher.maxDiscount)

  return totalDiscount
}


// #endregion