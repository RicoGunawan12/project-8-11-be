import Banner from "../models/banner.model.js"

export const migrateBanner = async () => {
    const banners = await Banner.findAll();
    if (banners.length === 0) {
        const body = [
            {
                page: "Main Page",
                image: "/assets/banner/MainPage.png"
            },
            {
                page: "About Page",
                image: "/assets/banner/AboutPage.png"
            },
            {
                page: "Contact Page",
                image: "/assets/banner/ContactPage.png"
            },
            {
                page: "Product Page",
                image: "/assets/banner/ProductPage.png"
            },
        ]
        await Banner.bulkCreate(body);
    }
}

export const getBannerService = async () => {
    const banners = await Banner.findAll();
    return banners;
}

export const updateBannerService = async (page, image) => {
    const updatedBanner = await Banner.update(
        { image: image },
        {
            where: { page: page }
        }
    )
    if (updatedBanner[0] === 0) {
        throw new Error("There is no such change or page")
    }
}