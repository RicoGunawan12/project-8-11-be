import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WishlistItem = sequelize.define('wishlist_items', {
  wishlistItemId: {
    field: "wishlist_item_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  wishlistId: {
    field: "ref_wishlist_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  productVariantId: {
    field: "ref_product_variant_id",
    type: DataTypes.UUID,
    primaryKey: false
  }
},{
  timestamps: false
});

export default WishlistItem;