import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const PaymentMethod = sequelize.define('PaymentMethod', {
    paymentMethodId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'payment_methods',
    timestamps: false
});

export default PaymentMethod;