import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";


const RajaOngkirCity = sequelize.define('raja_ongkir_city', {
    city_id: {
      field: "city_id",
      type: DataTypes.STRING, 
      primaryKey: true,
      allowNull: false
    },
    province_id: {
      field: "province_id",
      type: DataTypes.STRING,
      primaryKey: false
    },
    province: {
      field: "province",
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
        field: "type",
        type: DataTypes.STRING,
        allowNull: false
    },
    city_name: {
        field: "city_name",
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        field: "postal_code",
        type: DataTypes.STRING,
        allowNull: false
    }
  },{
    timestamps: false
  })

export default RajaOngkirCity;