import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const TransactionHeader = sequelize.define('transaction_headers', {
  transactionId: {
    field: "transaction_id",
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), 
    primaryKey: true,
    allowNull: false
  },
  userId: {
    field: "ref_user_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  paymentMethodId: {
    field: "ref_payment_method_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  voucherId: {
    field: "ref_voucher_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  transactionDate: {
    field: "transaction_date",
    type: DataTypes.DATE,
    allowNull: false
  },
  gatewayResponse: {
    field: "gateway_response",
    type: DataTypes.STRING,
    allowNull: true,
    length: 255
  },
  status: {
    field: "status",
    type: DataTypes.STRING,
    allowNull: false,
    length: 100
  }
},{
  timestamps: false
})

  export default TransactionHeader;