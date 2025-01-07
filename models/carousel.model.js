import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Carousel = sequelize.define('carousels', {
    carouselId: {
        field: "carousel_id",
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    carouselImage: {
        field: "carousel_image",
        type: DataTypes.STRING,
        length: 255
    },
    title: {
        field: "title",
        type: DataTypes.STRING,
        length: 100
    }
}, {
    timestamps: false
})

export default Carousel;