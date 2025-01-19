import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PromoHistory = sequelize.define('promo_histories', {
  promoId: {
    field: "promo_id",
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    // primaryKey: true,
    allowNull: false
  },
  userId: {
    field: "user_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  productId: {
    field: "product_id",
    type: DataTypes.UUID,
    primaryKey: false
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE
  }
},{
  timestamps: true
})

export default PromoHistory;