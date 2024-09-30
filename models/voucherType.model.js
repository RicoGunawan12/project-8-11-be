import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const VoucherType = sequelize.define('voucher_types', {
  voucherTypeId: {
    field: "voucher_type_id",
    type: DataTypes.UUID,
    defaultValue: uuidv4(), 
    primaryKey: true,
    allowNull: false
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