import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ContentHeader = sequelize.define('content_header', {
    contentHeaderId: {
      field: "content_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    contentCode: {
      field: "content_code",
      type: DataTypes.STRING,
      primaryKey: false,
      length: 50
    },
    pageId: {
      field: "ref_page_id",
      type: DataTypes.UUID,
      primaryKey: false
    }
},{
  timestamps: false
})

export default ContentHeader;