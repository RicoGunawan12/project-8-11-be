import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


const Cart = sequelize.define('carts', {
  cartId: {
    field: "cart_id",
    type: DataTypes.UUID,
    defaultValue: uuidv4(), 
    primaryKey: true,
    allowNull: false
  },
  userId: {
    field: "ref_user_id",
    type: DataTypes.UUID
  }
},{
  timestamps: false
})

export default Cart;