import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Contact = sequelize.define('contact', {
    contactId: {
      field: "contact_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    contact: {
      field: "contact",
      type: DataTypes.STRING,
      primaryKey: false,
      length: 100
    },
    contactAccount: {
      field: "contact_account",
      type: DataTypes.STRING,
      length: 100,
      primaryKey: false
    }
},{
  timestamps: false
})

export default Contact;