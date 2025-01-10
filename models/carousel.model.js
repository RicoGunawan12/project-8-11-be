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
    carouselImageMobile: {
        field: "carousel_image_mobile",
        type: DataTypes.STRING,
        length: 255
    },
    titleEng: {
        field: "title_eng",
        type: DataTypes.STRING,
        length: 100
    },
    titleIndo: {
        field: "title_indo",
        type: DataTypes.STRING,
        length: 100
    },
    contentEng: {
        field: "content_eng",
        type: DataTypes.STRING,
        length: 255
    },
    contentIndo: {
        field: "content_indo",
        type: DataTypes.STRING,
        length: 255
    },
    buttonEng: {
        field: "button_eng",
        type: DataTypes.STRING,
        length: 255
    },
    buttonIndo: {
        field: "button_indo",
        type: DataTypes.STRING,
        length: 255
    },
    link: {
        field: "link",
        type: DataTypes.STRING,
        length: 100
    }
}, {
    timestamps: false
})

export default Carousel;