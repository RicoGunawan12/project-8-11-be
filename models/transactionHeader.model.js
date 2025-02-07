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
  readableId: {
    field: "readable_id",
    type: DataTypes.STRING,
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
  voucherCode: {
    field: "ref_voucher_code",
    type: DataTypes.STRING,
    defaultValue: null,
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
    allowNull: false
  },
  gatewayResponse: {
    field: "gateway_response",
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  status: {
    field: "status",
    type: DataTypes.ENUM('Unpaid', 'Waiting for shipping', 'Shipping', 'Done', 'Cancelled', 'On Review Cancel', 'On Review Return', 'Waiting for Return', 'Return', 'Failed'),
    allowNull: false,
    length: 100
  },
  expedition: {
    field: "expedition",
    type: DataTypes.STRING,
    length: 50,
    allowNull: false
  },
  shippingType: {
    field: "shipping_type",
    type: DataTypes.STRING,
    length: 50,
    allowNull: false
  },
  deliveryFee: {
    field: "delivery_fee",
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deliveryCashback: {
    field: "delivery_cashback",
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paymentDeadline: {
    field: "payment_deadline",
    type: DataTypes.DATE,
    allowNull: false, 
  },
  totalPrice: {
    field: "total_price",
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  totalWeight: {
    field: "total_weight",
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  notes: {
    field: "notes",
    type: DataTypes.STRING,
    allowNull: true, 
  },
  komshipOrderNumber: {
    field: "komship_order_number",
    type: DataTypes.STRING,
    allowNull: true
  },
  komshipOrderId: {
    field: "komship_order_id",
    type: DataTypes.INTEGER,
    allowNull: true
  },
  paymentLink: {
    field: "payment_link",
    type: DataTypes.STRING,
    allowNull: true
  },
  customerNotes: {
    field: "customer_notes",
    type: DataTypes.STRING,
    allowNull: true
  },
  freeOngkir: {
    field: "free_ongkir",
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  awb: {
    field: "awb",
    type: DataTypes.STRING,
    allowNull: true
  }
},{
  timestamps: false
})

  export default TransactionHeader;