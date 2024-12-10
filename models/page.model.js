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
  contentJSON: {
    field: "content_json",
    type: DataTypes.TEXT,
    allowNull: false
  },
  language: {
    field: "language",
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  timestamps: false
})

export default Page;