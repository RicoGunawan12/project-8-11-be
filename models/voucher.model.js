import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const Voucher = sequelize.define('Voucher', {
    voucherId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false
    },
    voucherTypeId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    voucherEndDate: {
      type: DataTypes.DATE
    },
    maxDiscount: {
      type: DataTypes.INTEGER
    },
    discount: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'vouchers',
    timestamps: false
});

export default Voucher