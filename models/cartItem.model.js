import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CartItem = sequelize.define('cart_items', {
    cartItemId: {
      field: "cart_item_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
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