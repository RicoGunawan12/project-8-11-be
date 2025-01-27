import { DataTypes, UUID } from "sequelize";
import sequelize from "../config/database.js";


const Bogo = sequelize.define('bogos', {
    bogoId: {
      field: "bogo_id",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false
    },
    bogoName: {
      field: "bogo_name",
      type: DataTypes.STRING,
      primaryKey: false
    },
    variant: {
      field: "variant_id",
      type: DataTypes.TEXT("long"),
      allowNull: false
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

export default Bogo;