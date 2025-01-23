import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const AboutPage = sequelize.define('about_pages', {
  pageId: {
    field: "page_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
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
  whyEng: {
    field: "why_eng",
    type: DataTypes.TEXT,
    allowNull: false
  },
  whyIndo: {
    field: "why_indo",
    type: DataTypes.TEXT,
    allowNull: false
  },
  introduceIndo: {
    field: "introduce_indo",
    type: DataTypes.TEXT,
    allowNull: false
  },
  introduceEng: {
    field: "intorduce_eng",
    type: DataTypes.TEXT,
    allowNull: false
  },
  
},{
  timestamps: false
})

export default AboutPage;