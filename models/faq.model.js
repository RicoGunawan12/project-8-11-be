import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FAQ = sequelize.define('faq', {
    faqId: {
      field: "faq_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    faqQuestion: {
      field: "faq_question",
      type: DataTypes.STRING,
      primaryKey: false,
      length: 100
    },
    faqAnswer: {
      field: "faq_answer",
      type: DataTypes.STRING,
      length: 255,
      primaryKey: false
    }
},{
  timestamps: false
})

export default FAQ;