import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Metadata = sequelize.define("metadatas", {
  metadataId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'slug',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  metadataBase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alternates: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  icons: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  openGraph: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  keywords: {
    type: DataTypes.TEXT, 
    allowNull: false,
    get() {
      return this.getDataValue("keywords")?.split(",") || [];
    },
    set(value) {
      this.setDataValue("keywords", Array.isArray(value) ? value.join(",") : value);
    },
  },
});

export default Metadata;
