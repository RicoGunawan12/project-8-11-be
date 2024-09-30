import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

const Wishlist = sequelize.define('wishlists', {
  wishlistId: {
    field: "wishlist_id",
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), 
    primaryKey: true,
    allowNull: false
  },
  userId: {
    field: "ref_user_id",
    type: DataTypes.UUID,
    primaryKey: false
  }
},{
  timestamps: false
})

export default Wishlist;