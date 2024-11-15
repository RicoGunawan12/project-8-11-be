import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Page = sequelize.define('pages', {
  pageId: {
    field: "page_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  pageName: {
    field: "page_name",
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    field: "path",
    type: DataTypes.STRING,
    allowNull: false
  },
  hasParams: {
    field: "has_params",
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  requiredParams: {
    field: "required_params",
    type: DataTypes.STRING,
    allowNull: true
  }
},{
  timestamps: false
})

export default Page;