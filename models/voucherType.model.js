import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const VoucherType = sequelize.define('VoucherType', {
    voucherTypeId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false
    },
    voucherType: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'voucher_types',
    timestamps: false
});

export default VoucherType;