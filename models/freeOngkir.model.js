import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FreeOngkir = sequelize.define('free_ongkir', {
    freeOngkirId: {
      field: "free_ongkir_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    status: {
      field: "status",
      type: DataTypes.ENUM("Active", "Inactive"),
      primaryKey: false
    },
    maximumFreeOngkir: {
      field: "maximum_free_ongkir",
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    minimumPaymentAmount: {
      field: "minimum_payment_amount",
      type: DataTypes.INTEGER,
      primaryKey: false
    }
},{
  timestamps: false
})

export default FreeOngkir;