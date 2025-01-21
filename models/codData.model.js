import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const CODData = sequelize.define('codData', {
  codId: {
    field: "cod_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  maximumPaymentAmount: {
    field: "maximum_payment_amount",
    type: DataTypes.INTEGER
  }
},{
  timestamps: false
})

export default CODData;