import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TransactionHeader = sequelize.define('transaction_headers', {
  transactionId: {
    field: "transaction_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  userId: {
    field: "ref_user_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  addressId: {
    field: "ref_address_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  voucherId: {
    field: "ref_voucher_id",
    type: DataTypes.UUID,
    primaryKey: false,
    allowNull: true
  },
  transactionDate: {
    field: "transaction_date",
    type: DataTypes.DATE,
    allowNull: false
  },
  paymentMethod: {
    field: "payment_method",
    type: DataTypes.STRING,
    primaryKey: false
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
  },
  deliveryFee: {
    field: "delivery_fee",
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paymentDeadline: {
    field: "payment_deadline",
    type: DataTypes.DATE,
    allowNull: true, 
  }
},{
  timestamps: false
})

  export default TransactionHeader;