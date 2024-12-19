import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Banner = sequelize.define('banners', {
  bannerId: {
    field: "banner_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  page: {
    field: "page",
    type: DataTypes.STRING,
    length: 100
  },
  image: {
      field: "image",
        type: DataTypes.STRING,
        length: 100
  }
},{
  timestamps: false
})

export default Banner;