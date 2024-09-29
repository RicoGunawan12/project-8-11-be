import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const TransactionHeader = sequelize.define('TransactionHeader', {
    transactionId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    paymentMethodId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    voucherId: {
      type: DataTypes.UUID
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gatewayResponse: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'transaction_headers',
    timestamps: false
  });

  export default TransactionHeader;