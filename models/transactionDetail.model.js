import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TransactionDetail = sequelize.define('TransactionDetail', {
    transactionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    productVariantId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'transaction_details',
    timestamps: false
});

export default TransactionDetail;