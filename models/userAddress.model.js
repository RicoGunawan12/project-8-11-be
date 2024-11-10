import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/database.js";


const UserAddress = sequelize.define('user_addresses', {
    addressId: {
      field: "address_id",
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    komshipAddressId: {
      field: "komship_address_id",
      type: DataTypes.INTEGER,
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