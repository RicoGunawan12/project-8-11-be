import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Voucher = sequelize.define('vouchers', {
  voucherId: {
    field: "voucher_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  voucherName: {
    field: "voucher_name",
    type: DataTypes.STRING,
    primaryKey: false,
    length: 50
  },
  voucherType: {
    field: "voucher_type",
    type: DataTypes.ENUM('Cashback', 'Discount'),
    primaryKey: false,
  },
  voucherCode: {
    field: "voucher_code",
    type: DataTypes.STRING,
    length: 50,
    allowNull: false
  },
  voucherEndDate: {
    field: "voucher_end_date",
    type: DataTypes.DATE,
    allowNull: false
  },
  voucherStartDate: {
    field: "voucher_start_date",
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
},{
  timestamps: false
})
export default Voucher