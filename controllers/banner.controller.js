import { getBannerService, updateBannerService } from "../services/banner.service.js";
import { convertImageToWebp } from "../utils/imageconverter.js";
import { UPLOAD_FOLDER } from "../utils/uploader.js";

export const getBanner = async (req, res) => {
    try {
        const banners = await getBannerService();
        return res.status(200).json({ message: "Banner fetched!", banners });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateBanner = async (req, res) => {
    const { page } = req.body;
    const image = req.files['image'];

    if (
        page != "Contact Page" &&
        page != "About Page" &&
        page != "Product Page" &&
        page != "Blog Page" &&
        page != "FAQ Page" &&
        page != "Profile Page" &&
        page != "Transaction Page" &&
        page != "Location Page" &&
        page != "Contact Page Mobile" &&
        page != "About Page Mobile" &&
        page != "Product Page Mobile" &&
        page != "Blog Page Mobile" &&
        page != "FAQ Page Mobile" &&
        page != "Profile Page Mobile" &&
        page != "Transaction Page Mobile" &&
        page != "Location Page Mobile"
    ) {
        return res.status(400).json({ message: "There is no such page" })
    }
    if (!image) {
        return res.status(400).json({ message: "Banner image is required!" })
    }

    try {
        // converts image to WebP format
        let bannerImageString = '';
        for (let i = 0; i < image.length; i++) {
            const selectedImage = image[i];
            const filename = `${Date.now()}.webp`;
            const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "banner/", selectedImage, filename);

            if (i === 0) bannerImageString = `/${UPLOAD_FOLDER}banner/${filename}`;
        }

        const banners = await updateBannerService(page, bannerImageString);
        return res.status(200).json({ message: "Banner fetched!", banners });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}