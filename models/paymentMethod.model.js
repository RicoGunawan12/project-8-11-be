import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PaymentMethod = sequelize.define('payment_methods', {
  paymentMethodId: {
    field: "payment_method_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  paymentMethodName: {
    field: "payment_method",
    type: DataTypes.STRING,
    length: 50,
    allowNull: false
  },
},{
  timestamps: false
})


export default PaymentMethod;