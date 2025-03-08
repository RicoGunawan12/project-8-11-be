import { Op, where } from "sequelize";
import { ProductModel, ProductVariantModel, TransactionHeaderModel, VoucherModel } from "../association/association.js";
import sequelize from "../config/database.js";


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
  
  return voucher
}

export const getVoucherByCodeService = async (code) => {
  const voucher =  await VoucherModel.findOne({
    where: {
      voucherCode: code,
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
    },
    include:{
      model: ProductVariantModel
    }
  })
  return vouchers
}

<<<<<<< Updated upstream
// #endregion

// #region CREATE
=======
export const getVoucherByIdService = async (voucherId) => {
  const voucher = await VoucherModel.findOne({
    where: {
      isDeleted: false,
      voucherId
    }
  })

  // console.log(voucher)

  if(voucher){
    const variant = await ProductVariantModel.findOne({
      where:{
        productVariantId : voucher.variantsId || ""
      },
      include:{
        model: ProductModel,
      }
    })
    voucher.dataValues.productVariant = variant
    if(variant){
      console.log("variant: ", variant)
      console.log("price: ", variant.dataValues.productPrice)
      voucher.dataValues.discount = variant.dataValues.productPrice
    }
  }

  return voucher
}

export const getVisibleVoucherService = async (userId) => {
  const vouchers = await VoucherModel.findAll({ 
    where: { 
      voucherVisibility: true, 
      isDeleted: false,
      voucherStartDate: { [Op.lte]: new Date() },
      voucherEndDate: { [Op.gte]: new Date().setHours(0, 0, 0, 0) },
    }
  });
  
  const transactionHeaders = await TransactionHeaderModel.findAll({
    attributes: ['ref_voucher_code'],
    where: {
      ref_voucher_code: { [Op.ne]: null },
      ref_user_id: userId
    }
  });

  const refVoucherCodes = transactionHeaders.map(transaction => transaction.dataValues.ref_voucher_code);

  const filteredVouchers = vouchers.filter(voucher => {
    return !refVoucherCodes.some(refCode => refCode.includes(voucher.voucherId.toString()));
  });

  return filteredVouchers;
}
>>>>>>> Stashed changes

export const createVouchersService = async (vouchers) => {
  const voucherCodes = vouchers.map((voucher) => voucher.voucherCode);
  const duplicatedData = await VoucherModel.findAll({
    where: {
      voucherCode: voucherCodes,
    },
    attributes: ['voucherCode'],
  });

<<<<<<< Updated upstream
  if (duplicatedData.length > 0) {
    throw new Error(`Duplicated voucher code: ${duplicatedData[0].get('voucherCode')}`);
=======
  
  
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
>>>>>>> Stashed changes
  }
  await VoucherModel.bulkCreate(vouchers, {
    returning: true, 
  });

  return;
};

export const updateVouchersService = async (vouchers) => {
 
  const voucher = vouchers[0]
  const existVoucher = await getVoucherByIdService(vouchers[0].voucherId)

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
        variantsId: variant.productVariantId
      })
    }
    const del = await VoucherModel.update({
      isDeleted : true
    },{
      where: {
        voucherId : existVoucher.voucherId
      }
    }
    )
  }
  else{



    const newVoucher = await VoucherModel.update({
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
    },{
      where:{
        voucherId: existVoucher.voucherId
      }
    })



  }


  return;
};

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

export const deleteVouchersByCodeService = async (code) =>{
  const result = await VoucherModel.destroy({
    where: {
      voucherCode: code,
    },
  });

  return result
}

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
    case 'PRODUCT':
          return discountAmount
    default :
        return 0
  }
}

export const applyVoucherService = async (voucherCode, totalAmount) => {
  const voucher = await getVoucherByCodeWithVoucherTypeService(voucherCode)
  
<<<<<<< Updated upstream
  if(!voucher) throw new Error(`Voucher with code ${voucherCode} doesn't exist`)
=======
  if(!voucher) throw new Error(`Voucher with id ${voucherId} doesn't exist`)
>>>>>>> Stashed changes

  if (voucher.quota <= 0) {
    throw new Error("Voucher quota has reached the limit")
  }

  if(voucher.voucherEndDate && (voucher.voucherEndDate && new Date(voucher.voucherEndDate) < new Date().setHours(0,0,0,0))){
    throw new Error("Voucher has expired")
  }
<<<<<<< Updated upstream
=======

  if(voucher.voucherType == "product"){
    console.log("product")
    console.log(voucher)
    

  }
  
>>>>>>> Stashed changes

  if (totalAmount < voucher.minimumPayment) {
    throw new Error(`The total price must be at least Rp ${voucher.minimumPayment.toLocaleString('id-ID')} to use this voucher.`)
  }
  const totalDiscount = calculateVoucherDiscount(voucher.voucherType,totalAmount,voucher.discount, voucher.maxDiscount)

  voucher.quota -= 1;
  await voucher.save();

  return totalDiscount
}


// #endregion