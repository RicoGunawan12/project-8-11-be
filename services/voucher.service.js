import { Op } from "sequelize";
import { VoucherModel } from "../association/association.js";


// #region GET
export const getAllVouchersService =  async ()=> {
  const voucher = await VoucherModel.findAll({
    order: [['voucher_start_date', 'DESC']]
  })
  return voucher
}

export const checkVoucherByCodeService = async (code, totalPrice) => {
  const voucher =  await VoucherModel.findOne({
    where: {
      voucherCode: code,
      voucherStartDate: { [Op.lte]: new Date() },
      voucherEndDate: { [Op.gte]: new Date().setHours(0, 0, 0, 0) },
    }
  })

  if (!voucher) {
    throw new Error(`There is no voucher with ${code} code`)
  }

  if (totalPrice < voucher.minimumPayment) {
    throw new Error(`The total price must be at least Rp ${voucher.minimumPayment.toLocaleString('id-ID')} to use this voucher.`)
  }
  console.log(voucher)
  return voucher
}

export const getVoucherByCodeService = async (code) => {
  const voucher =  await VoucherModel.findOne({
    where: {
      voucherId: code,
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
  return vouchers
}

// #endregion

// #region CREATE

export const createVouchersService = async (vouchers) => {

  // console.log(vouchers)
  // console.log(vouchers[0])
  const voucher = vouchers[0]
  if(voucher.voucherType == "product"){
    for(const variant of voucher.variantId){
      const newVoucher = await VoucherModel.create({
        voucherCode: voucher.voucherCode,
        voucherName: voucher.voucherName,
        voucherType: voucher.voucherType,
        voucherEndDate: voucher.voucherEndDate,
        voucherStartDate: voucher.voucherStartDate,
        maxDiscount: voucher.maxDiscount,
        discount: voucher.discount,
        minimumPayment: voucher.minimumPayment,
        quota: voucher.quota,
        variantsId: variant.variantsId
      })
    }
  }
  else{
    const newVoucher = await VoucherModel.create({
      voucherCode: voucher.voucherCode,
      voucherName: voucher.voucherName,
      voucherType: voucher.voucherType,
      voucherEndDate: voucher.voucherEndDate,
      voucherStartDate: voucher.voucherStartDate,
      maxDiscount: voucher.maxDiscount,
      discount: voucher.discount,
      minimumPayment: voucher.minimumPayment,
      quota: voucher.quota,
      variantsId: null
    })
  }

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

    try {
 
  
      const [updatedRowCount] = await VoucherModel.update(
        {
          voucherEndDate: voucher.voucherEndDate || null,
          voucherStartDate: voucher.voucherStartDate || null,
          maxDiscount: voucher.maxDiscount,
          discount: voucher.discount,
          minimumPayment: voucher.minimumPayment
        },
        {
          where: {
            voucherCode: voucher.voucherCode,
          },
        }
      );
  
 
      if (updatedRowCount === 0) {
        console.warn(`No rows updated for voucher code ${voucher.voucherCode}`);
      }
    } catch (err) {
      console.error(`Error updating voucher ${voucher.voucherCode}:`, err);
    }
  }

 

  return;
};

// #endregion

// #region DELETE

export const deleteVoucherByCodeService = async (code) =>{
  
  const voucher = await getVoucherByCodeService(code)
  if (!voucher) throw new Error(`Voucher with Id ${code} not found`)

  const result = await VoucherModel.destroy({
    where: {
      voucherId: code,
    },
  });

  return result
}

export const deleteVouchersByCodeService = async (code) =>{
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
  voucherTypeCode = voucherTypeCode.toUpperCase();
 
  
  switch(voucherTypeCode) {
    case 'FIXED':
        if(discountAmount > amount) amount
        else return discountAmount
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

  if (voucher.quota <= 0) {
    throw new Error("Voucher quota has reached the limit")
  }

  if(voucher.voucherEndDate && (voucher.voucherEndDate && new Date(voucher.voucherEndDate) < new Date().setHours(0,0,0,0))){
    throw new Error("Voucher has expired")
  }

  if (totalAmount < voucher.minimumPayment) {
    throw new Error(`The total price must be at least Rp ${voucher.minimumPayment.toLocaleString('id-ID')} to use this voucher.`)
  }
  const totalDiscount = calculateVoucherDiscount(voucher.voucherType,totalAmount,voucher.discount, voucher.maxDiscount)

  voucher.quota -= 1;
  await voucher.save();

  return totalDiscount
}


// #endregion