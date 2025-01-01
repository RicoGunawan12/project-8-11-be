import { VoucherModel } from "../association/association.js";


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
  console.log(voucher)
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
  // console.log("asdd")
  const { vouchers } = req;
  const voucherCodes = vouchers.map((code) => code.voucherCode);

  // console.log(voucherCodes)

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
      // console.log('Voucher to update:', voucher);
  
      const [updatedRowCount] = await VoucherModel.update(
        {
          voucherEndDate: voucher.voucherEndDate || null,
          voucherStartDate: voucher.voucherStartDate || null,
          maxDiscount: voucher.maxDiscount,
          discount: voucher.discount,
        },
        {
          where: {
            voucherCode: voucher.voucherCode,
          },
        }
      );
  
      // console.log(`Updated ${updatedRowCount} rows for voucher code ${voucher.voucherCode}`);
      if (updatedRowCount === 0) {
        console.warn(`No rows updated for voucher code ${voucher.voucherCode}`);
      }
    } catch (err) {
      console.error(`Error updating voucher ${voucher.voucherCode}:`, err);
    }
  }

  // console.log("test")

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

  if (voucher.quota <= 0) {
    throw new Error("Voucher quota has reached the limit")
  }

  if(voucher.voucherEndDate && (voucher.voucherEndDate && new Date(voucher.voucherEndDate) < new Date())){
    throw new Error("Voucher has expired")
  }
  const totalDiscount = calculateVoucherDiscount(voucher.voucherTypeCode,totalAmount,voucher.discount, voucher.maxDiscount)

  return totalDiscount
}


// #endregion