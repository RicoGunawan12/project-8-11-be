import { getBannerService, updateBannerService } from "../services/banner.service.js";
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
        page != "Profile Page" 
    ) {
        return res.status(400).json({ message: "There is no such page" })
    }
    if (!image) {
        return res.status(400).json({ message: "Banner image is required!" })
    }

    try {
        const bannerImage = `/${UPLOAD_FOLDER}banner/${image[0].filename}`
        const banners = await updateBannerService(page, bannerImage);
        return res.status(200).json({ message: "Banner fetched!", banners });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}