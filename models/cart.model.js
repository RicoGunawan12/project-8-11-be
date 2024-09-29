import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Cart = sequelize.define('Cart', {
    cartId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'carts',
    timestamps: false
});

export default Cart;