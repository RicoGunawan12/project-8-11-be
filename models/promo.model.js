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
    promoName: {
      field: "promo_name",
      type: DataTypes.STRING,
      primaryKey: false
    },
    promoAmount: {
      field: "promo_amount",
      type: DataTypes.INTEGER,
      primaryKey: false
    },
    startDate: {
      field: "start_date",
      type: DataTypes.DATE,
      primaryKey: false
    },
    endDate: {
      field: "end_date",
      type: DataTypes.DATE,
      primaryKey: false
    },
    createdAt: { 
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: { 
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },{
    timestamps: true
  })

export default Promo;