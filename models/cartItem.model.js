import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


const CartItem = sequelize.define('cart_items', {
    cartItemId: {
      field: "cart_item_id",
      type: DataTypes.UUID,
      defaultValue: uuidv4, 
      primaryKey: true,
      allowNull: false
    },
    cartId: {
      field: "ref_cart_id",
      type: DataTypes.UUID,
      primaryKey: false
    },
    productVariantId: {
      field: "ref_product_variant_id",
      type: DataTypes.UUID,
      primaryKey: false
    },
    quantity: {
      field: "quantity",
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },{
    timestamps: false
  })

export default CartItem;