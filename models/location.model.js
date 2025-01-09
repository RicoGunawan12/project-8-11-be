import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Location = sequelize.define('locations', {
  locationId: {
    field: "location_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  province: {
    field: "province",
    type: DataTypes.STRING,
    allowNull: false,
    length: 100
  },
  openTime: {
    field: "open_time",
    type: DataTypes.STRING,
    allowNull: false,
    length: 20
  },
  closeTime: {
    field: "close_time",
    type: DataTypes.STRING,
    allowNull: false,
    length: 20
  },
  phoneNumber: {
    field: "phone_number",
    type: DataTypes.STRING,
    allowNull: false,
    length: 50
  },
  addressDetail: {
    field: "address_detail",
    type: DataTypes.TEXT,
    allowNull: false
  },
  link: {
    field: 'link',
    type: DataTypes.TEXT,
    allowNull: false
  }

},{
  timestamps: false
})

export default Location;