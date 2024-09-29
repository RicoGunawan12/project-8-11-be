import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


const Promo = sequelize.define('Promo', {
    promoId: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false
    },
    productVariantId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    promoPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'promos',
    timestamps: false
})

export default Promo;