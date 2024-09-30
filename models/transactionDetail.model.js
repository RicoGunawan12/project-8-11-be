import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const TransactionDetail = sequelize.define('transaction_details', {
  transactionDetailId: {
    field: "transaction_detail_id",
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), 
    primaryKey: true,
    allowNull: false
  },
  transactionId: {
    field: "ref_transaction_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  productVariantId: {
    field: "ref_product_variant_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  quantity: {
    field: "quantity",
    type: DataTypes.INTEGER,
    allowNull: false,
    length: 100
  }
},{
  timestamps: false
})

export default TransactionDetail;