import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const PaymentMethod = sequelize.define('payment_methods', {
  paymentMethodId: {
    field: "payment_method_id",
    type: DataTypes.UUID,
    defaultValue: uuidv4(), 
    primaryKey: true,
    allowNull: false
  },
  paymentMethodName: {
    field: "payment_method",
    type: DataTypes.STRING,
    length: 50,
    allowNull: false
  },
})


export default PaymentMethod;