import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";


const PromoDetail = sequelize.define('promo_details', {
    promoDetailId: {
      field: "promo_detail_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    promoId: {
      field: "promo_id",
      type: DataTypes.UUID,
      allowNull: false
    },
    productId: {
        field: "product_id",
        type: DataTypes.UUID,
        allowNull: false
    }
  },{
    timestamps: false
  })

export default PromoDetail;