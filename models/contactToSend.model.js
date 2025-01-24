import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const ContactToSend = sequelize.define('contact_to_sends', {
    contactId: {
        field: "contact_id",
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        field: "email",
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    phone: {
        field: "phone",
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    business: {
        field: "business",
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    }
}, {
    timestamps: false
})

export default ContactToSend;