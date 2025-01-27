import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Voucher = sequelize.define('vouchers', {
  voucherCode: {
    field: "voucher_code",
    type: DataTypes.STRING,
    length: 50,
    allowNull: false, 
    primaryKey: true
  },
  voucherName: {
    field: "voucher_name",
    type: DataTypes.STRING,
    primaryKey: false,
    length: 50
  },
  voucherType: {
    field: "voucher_type",
    type: DataTypes.ENUM('percentage', 'fixed'),
    primaryKey: false,
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
  },
  quota: {
    field: "quota",
    type: DataTypes.INTEGER,
    // allowNull: true
  },
  minimumPayment: {
    field: "minimum_payment",
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  timestamps: false
})
export default Voucher