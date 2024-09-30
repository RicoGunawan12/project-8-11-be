import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";


const Promo = sequelize.define('promos', {
    promoId: {
      field: "promo_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    productVariantId: {
      field: "ref_product_variant_id",
      type: DataTypes.UUID,
      primaryKey: false
    },
    promoPrice: {
      field: "promo_price",
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },{
    timestamps: false
  })

export default Promo;