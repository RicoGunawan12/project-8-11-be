import Carousel from "../models/carousel.model.js";

export const getCarouselService = async () => {
    const carousels = await Carousel.findAll();
    return carousels;
}

export const createCarouselService = async (
    carouselImage,
    titleEng,
    titleIndo,
    contentEng,
    contentIndo,
    buttonEng,
    buttonIndo,
    link
) => {
    const carousel = await Carousel.create({
        carouselImage,
        titleEng,
        titleIndo,
        contentEng,
        contentIndo,
        buttonEng,
        buttonIndo,
        link
    });
    return carousel;
}

export const updateCarouselService = async (
    carouselId,
    carouselImage,
    titleEng,
    titleIndo,
    contentEng,
    contentIndo,
    buttonEng,
    buttonIndo,
    link
) => {
    const updatedCarousel = await Carousel.update(
        {
            carouselImage: carouselImage,
            titleEng: titleEng,
            titleIndo: titleIndo,
            contentEng: contentEng,
            contentIndo: contentIndo,
            buttonEng: buttonEng,
            buttonIndo: buttonIndo,
            link: link
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