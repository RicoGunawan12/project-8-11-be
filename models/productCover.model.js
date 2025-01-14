import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductCover = sequelize.define('product_covers', {
    productCoverId: {
        field: "product_cover_id",
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
        allowNull: false
    },
    productId: {
        field: "product_id",
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false
    },
    productCover: {
        field: "product_cover",
        type: DataTypes.TEXT,
        allowNull: false
    },
})

export default ProductCover