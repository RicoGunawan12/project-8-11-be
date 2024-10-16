import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";


const UserAddress = sequelize.define('user_addresses', {
    addressId: {
      field: "address_id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    userId: {
        field: "ref_user_id",
        type: DataTypes.UUID,
        allowNull: false
    },
    addressDistrict: {
        field: "address_district",
        type: DataTypes.STRING,
        allowNull: false
    },
    addressDetail: {
        field: "address_detail",
        type: DataTypes.STRING,
        allowNull: false
    }
  },{
    timestamps: false
  })

export default UserAddress;