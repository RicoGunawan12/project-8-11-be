import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Cart = sequelize.define('Cart', {
    cart_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'cart',
    timestamps: false
});

Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'user_id' });
};

export default Cart;