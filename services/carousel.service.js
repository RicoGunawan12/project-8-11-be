import Carousel from "../models/carousel.model.js";

export const getCarouselService = async () => {
    const carousels = await Carousel.findAll();
    return carousels;
}

export const createCarouselService = async (
    carouselImage,
    carouselImageMobile,
    titleEng,
    titleIndo,
    contentEng,
    contentIndo,
    buttonEng,
    buttonIndo,
    link,
    desktopFontSize,
    mobileFontSize,
    titleFontColor,
    buttonColor,
    buttonFontColor,
) => {
    const carousel = await Carousel.create({
        carouselImage,
        carouselImageMobile,
        titleEng,
        titleIndo,
        contentEng,
        contentIndo,
        buttonEng,
        buttonIndo,
        link,
        desktopFontSize,
        mobileFontSize,
        titleFontColor,
        buttonColor,
        buttonFontColor
    });
    return carousel;
}

export const updateCarouselService = async (
    carouselId,
    carouselImage,
    carouselImageMobile,
    titleEng,
    titleIndo,
    contentEng,
    contentIndo,
    buttonEng,
    buttonIndo,
    link,
    desktopFontSize,
    mobileFontSize,
    titleFontColor,
    buttonColor,
    buttonFontColor,
) => {
    const updatedCarousel = await Carousel.update(
        {
            carouselImage: carouselImage,
            carouselImageMobile: carouselImageMobile,
            titleEng: titleEng,
            titleIndo: titleIndo,
            contentEng: contentEng,
            contentIndo: contentIndo,
            buttonEng: buttonEng,
            buttonIndo: buttonIndo,
            link: link,
            desktopFontSize: desktopFontSize,
            mobileFontSize: mobileFontSize,
            titleFontColor: titleFontColor,
            buttonColor: buttonColor,
            buttonFontColor: buttonFontColor,
        },
        { where: { carouselId } }
    )

    if (updatedCarousel[0] == 0) {
        throw new Error("There is no change or carousel");
    }

    return updatedCarousel;
}

export const deleteCarouselService = async (carouselId) => {
    const deletedCarousel = await Carousel.destroy({
        where: { carouselId }
    });
    if (deletedCarousel == 0) {
        throw new Error("Carousel not found!");
    }
    return deletedCarousel
}