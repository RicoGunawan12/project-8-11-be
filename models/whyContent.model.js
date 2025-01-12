import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WhyContent = sequelize.define('why_content', {
    whyId: {
      field: "why_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    whyContentJSONEng: {
      field: "why_content_json_eng",
      type: DataTypes.TEXT,
      primaryKey: false,
    },
    whyContentJSONIndo: {
      field: "why_content_json_indo",
      type: DataTypes.TEXT,
      primaryKey: false,
    },
},{
  timestamps: false
})

export default WhyContent;