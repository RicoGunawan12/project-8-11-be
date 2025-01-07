import Carousel from "../models/carousel.model";

export const getCarouselService = async () => {
    const carousels = await Carousel.findAll();
    return carousels;
}

export const createCarouselService = async (carouselImage, title) => {
    const carousel = await Carousel.create({ carouselImage, title });
    return carousel;
}

export const updateCarouselService = async (carouselId, carouselImage, title) => {
    const updatedCarousel = await Carousel.update(
        {
            carouselImage: carouselImage,
            title: title
        },
        { where: carouselId }
    )

    if (updatedCarousel[0] == 0) {
        throw new Error("There is no change or carousel");
    }

    return updatedCarousel;
}

export const deleteCarouselService = async (carouselId) => {
    const deletedCarousel = await Carousel.destroy({ carouselId });
    if (deletedCarousel == 0) {
        throw new Error("Carousel not found!");
    }
    return deletedCarousel
}