import { createCarouselService, deleteCarouselService, getCarouselService, updateCarouselService } from "../services/carousel.service.js";
import { convertImageToWebp } from "../utils/imageconverter.js";
import { UPLOAD_FOLDER } from "../utils/uploader.js";


export const getCarousel = async (req, res) => {
    try {
        const carousels = await getCarouselService();
        return res.status(200).json({ message: "Fetch success!", carousels });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createCarousel = async (req, res) => {
    const {
        titleEng,
        titleIndo,
        contentEng,
        contentIndo,
        buttonEng,
        buttonIndo,
        link
    } = req.body;

    const image = req.files['carouselImage'];
    const imageMobile = req.files['carouselImageMobile'];
    if (typeof titleEng !== 'string' || titleEng.trim() === '') {
        return res.status(400).json({ message: 'English title is required' });
    }
    if (typeof titleIndo !== 'string' || titleIndo.trim() === '') {
        return res.status(400).json({ message: 'Indonesian title is required' });
    }
    if (typeof contentEng !== 'string' || contentEng.trim() === '') {
        return res.status(400).json({ message: 'English content is required' });
    }
    if (typeof contentIndo !== 'string' || contentIndo.trim() === '') {
        return res.status(400).json({ message: 'Indonesian content is required' });
    }
    if (typeof buttonEng !== 'string' || buttonEng.trim() === '') {
        return res.status(400).json({ message: 'English button text is required' });
    }
    if (typeof buttonIndo !== 'string' || buttonIndo.trim() === '') {
        return res.status(400).json({ message: 'Indonesian button text is required' });
    }

    // Validate link
    if (typeof link !== 'string' || link.trim() === '') {
        return res.status(400).json({ message: 'Link is required' });
    }
    const urlPattern = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/[\w\d\-._~:\/?#[\]@!$&'()*+,;%=]*)?$/;
    if (!urlPattern.test(link)) {
        return res.status(400).json({ message: 'Invalid link format' });
    }

    // Validate image
    if (!image) {
        return res.status(400).json({ message: 'Carousel photo is required' });
    }
    if (!imageMobile) {
        return res.status(400).json({ message: 'Mobile carousel photo is required' });
    }

    try {
        // const filename = `${Date.now()}-${req.body.titleEng}.webp`;
        // const imagePath = "../" + UPLOAD_FOLDER + "carousel/" + filename
        // const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "carousel/", image, filename);
        const carousel = await createCarouselService(
            "/" + UPLOAD_FOLDER + "carousel/" + image[0].filename,
            "/" + UPLOAD_FOLDER + "carousel/mobile/" + imageMobile[0].filename,
            titleEng,
            titleIndo,
            contentEng,
            contentIndo,
            buttonEng,
            buttonIndo,
            link
        );
        return res.status(200).json({ message: "Carousel created!", carousel })
    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
}

export const updateCarousel = async (req, res) => {
    const carouselId = req.params.id
    const {
        titleEng,
        titleIndo,
        contentEng,
        contentIndo,
        buttonEng,
        buttonIndo,
        link
    } = req.body;

    const image = req.files['carouselImage'];
    const imageMobile = req.files['carouselImageMobile'];

    if (!carouselId) {
        return res.status(400).json({ message: "Carousel ID is required" });
    }

    if (typeof titleEng !== 'string' || titleEng.trim() === '') {
        return res.status(400).json({ message: 'English title is required' });
    }
    if (typeof titleIndo !== 'string' || titleIndo.trim() === '') {
        return res.status(400).json({ message: 'Indonesian title is required' });
    }
    if (typeof contentEng !== 'string' || contentEng.trim() === '') {
        return res.status(400).json({ message: 'English content is required' });
    }
    if (typeof contentIndo !== 'string' || contentIndo.trim() === '') {
        return res.status(400).json({ message: 'Indonesian content is required' });
    }
    if (typeof buttonEng !== 'string' || buttonEng.trim() === '') {
        return res.status(400).json({ message: 'English button text is required' });
    }
    if (typeof buttonIndo !== 'string' || buttonIndo.trim() === '') {
        return res.status(400).json({ message: 'Indonesian button text is required' });
    }

    // Validate link
    if (typeof link !== 'string' || link.trim() === '') {
        return res.status(400).json({ message: 'Link is required' });
    }
    const urlPattern = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/[\w\d\-._~:\/?#[\]@!$&'()*+,;%=]*)?$/;
    if (!urlPattern.test(link)) {
        return res.status(400).json({ message: 'Invalid link format' });
    }

    // Validate image
    if (!image) {
        return res.status(400).json({ message: 'Carousel photo is required' });
    }
    if (!imageMobile) {
        return res.status(400).json({ message: 'Mobile carousel photo is required' });
    }

    try {
        // const filename = `${Date.now()}-${req.body.titleEng}.webp`;
        // const imagePath = "../" + UPLOAD_FOLDER + "carousel/" + req.body.titleEng
        // const convertedImageData = await convertImageToWebp(imagePath, image, filename);
        const carousel = await updateCarouselService(
            carouselId,
            "/" + UPLOAD_FOLDER + "carousel/" + image[0].filename,
            "/" + UPLOAD_FOLDER + "carousel/mobile/" + imageMobile[0].filename,
            titleEng,
            titleIndo,
            contentEng,
            contentIndo,
            buttonEng,
            buttonIndo,
            link
        );
        return res.status(200).json({ message: "Carousel updated!", carousel })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCarousel = async (req, res) => {
    const carouselId = req.params.id

    if (!carouselId) {
        return res.status(400).json({ message: "Carousel ID is required" });
    }

    try {
        const deleted = await deleteCarouselService(carouselId);
        return res.status(200).json({ message: "Carousel deleted!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}