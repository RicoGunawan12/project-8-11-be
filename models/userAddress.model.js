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
    userId: {
        field: "ref_user_id",
        type: DataTypes.UUID,
        allowNull: false
    },
    receiverName: {
        field: "receiver_name",
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    receiverPhoneNumber: {
        field: "receiver_phone_number",
        type: DataTypes.STRING,
        length: 20,
        allowNull: false
    },
    komshipAddressId: {
      field: "komship_address_id",
      type: DataTypes.STRING,
      allowNull: false
    },
    komshipLabel: {
      field: "komship_label",
      type: DataTypes.STRING,
      allowNull: false
    },
    addressProvince: {
      field: "address_province",
      type: DataTypes.STRING,
      allowNull: false
    },
    addressCity: {
      field: "address_city",
      type: DataTypes.STRING,
      allowNull: false
    },
    addressSubdistrict: {
        field: "address_subdistrict",
        type: DataTypes.STRING,
        allowNull: false
    },
    postalCode: {
        field: "postal_code",
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