import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


const CartItem = sequelize.define('CartItem', {
    cartItemId: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    productVariantId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: 'cart_items',
    timestamps: false
})

export default CartItem;