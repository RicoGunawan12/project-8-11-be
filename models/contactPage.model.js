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
  contentJSONEng: {
    field: "content_json_eng",
    type: DataTypes.TEXT,
    allowNull: false
  },
  contentJSONIndo: {
    field: "content_json_indo",
    type: DataTypes.TEXT,
    allowNull: false
  },
},{
  timestamps: false
})

export default Page;