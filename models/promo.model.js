import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


const Promo = sequelize.define('promos', {
    promoId: {
      field: "promo_id",
      type: DataTypes.UUID,
      defaultValue: uuidv4(), 
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
  })

export default Promo;