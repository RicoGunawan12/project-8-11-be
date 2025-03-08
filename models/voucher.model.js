import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Voucher = sequelize.define('vouchers', {
  voucherId: {
    field: "voucher_id",
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  voucherCode: {
    field: "voucher_code",
    type: DataTypes.STRING,
    length: 50,
  },
  voucherName: {
    field: "voucher_name",
    type: DataTypes.STRING,
    primaryKey: false,
    length: 50
  },
  voucherType: {
    field: "voucher_type",
    type: DataTypes.ENUM('percentage', 'fixed', 'product', 'ongkir'),
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
  },
  variantsId:{
    field: "variants_id",
    type: DataTypes.UUID,
    allowNull: true
  },
  voucherVisibility:{
    field: "voucher_visibility",
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  voucherSpecialEvent:{
    field: "voucher_special_event",
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isDeleted: {
    field: "is_deleted",
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
},{
  timestamps: false
})
export default Voucher