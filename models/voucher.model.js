import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const Voucher = sequelize.define('vouchers', {
  voucherId: {
    field: "voucher_id",
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), 
    primaryKey: true,
    allowNull: false
  },
  voucherTypeId: {
    field: "ref_voucher_type_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  voucherEndDate: {
    field: "voucher_end_date",
    type: DataTypes.DATE,
    allowNull: false
  },
  maxDiscount: {
    field: "max_discount",
    type: DataTypes.INTEGER,
    allowNull: true
  },
  discount: {
    field: "discount",
    type: DataTypes.INTEGER,
    allowNull: true
  }
})
export default Voucher