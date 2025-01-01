import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TransactionDetail = sequelize.define('transaction_details', {
  transactionDetailId: {
    field: "transaction_detail_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
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
  },
  paidProductPrice: {
    field: "paid_product_price",
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  realizedPromo: {
    field: "realized_promo",
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
    length: 100
  }
},{
  timestamps: false
})

export default TransactionDetail;