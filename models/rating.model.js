import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Rating = sequelize.define('rating', {
    ratingId: {
      field: "rating_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    userId: {
        field: "user_id",
        type: DataTypes.UUID,
        allowNull: false
    },
    productId: {
      field: "product_id",
      type: DataTypes.UUID,
      allowNull: false
    },
    rating: {
      field: "rating",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
        field: 'comment',
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
  timestamps: false
})

export default Rating;