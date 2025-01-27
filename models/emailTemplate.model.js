import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EmailTemplate = sequelize.define("email_templates", {
  emailTemplateId: {
    field: "page_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  key: {
    field: "key",
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'key',
  },
  titleEng: {
    field: "title_eng",
    type: DataTypes.STRING,
    allowNull: false
  },
  titleIndo: {
    field: "title_indo",
    type: DataTypes.STRING,
    allowNull: false
  },
  contentEng: {
    field: "content_eng",
    type: DataTypes.TEXT("long"),
    allowNull: false
  },
  contentIndo: {
    field: "content_indo",
    type: DataTypes.TEXT("long"),
    allowNull: false
  },
});

export default EmailTemplate;
