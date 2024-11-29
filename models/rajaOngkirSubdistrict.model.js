import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";


const Subdistrict = sequelize.define('subdistricts', {

  },{
    timestamps: false
  })

export default Subdistrict;