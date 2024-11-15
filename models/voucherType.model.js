import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VoucherType = sequelize.define('voucher_types', {
  voucherTypeId: {
    field: "voucher_type_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  voucherTypeCode: {
    field: "voucher_type_code",
    type: DataTypes.STRING,
    allowNull: false,
    length: 50,
    unique: true
  },
  voucherTypeName: {
    field: "voucher_type_name",
    type: DataTypes.STRING,
    length: 50,
    allowNull: false
  },
},{
  timestamps: false
})

export default VoucherType;