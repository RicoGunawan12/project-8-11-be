import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";


const RajaOngkirProvince = sequelize.define('raja_ongkir_province', {
    province_id: {
      field: "province_id",
      type: DataTypes.STRING, 
      primaryKey: true,
      allowNull: false
    },
    province: {
      field: "province",
      type: DataTypes.STRING,
      primaryKey: false
    }
  },{
    timestamps: false
  })

export default RajaOngkirProvince;