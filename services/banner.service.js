import Banner from "../models/banner.model.js"

export const migrateBanner = async () => {
    const banners = await Banner.findAll();
    if (banners.length === 0) {
        const body = [
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
            {
                page: "FAQ Page",
                image: "/assets/banner/FAQPage.png"
            },
            {
                page: "Blog Page",
                image: "/assets/banner/BlogPage.png"
            },
            {
                page: "Profile Page",
                image: "/assets/banner/ProfilePage.png"
            },
            {
                page: "About Page Mobile",
                image: "/assets/banner/AboutPageMobile.png"
            },
            {
                page: "Contact Page Mobile",
                image: "/assets/banner/ContactPageMobile.png"
            },
            {
                page: "Product Page Mobile",
                image: "/assets/banner/ProductPageMobile.png"
            },
            {
                page: "FAQ Page Mobile",
                image: "/assets/banner/FAQPageMobile.png"
            },
            {
                page: "Blog Page Mobile",
                image: "/assets/banner/BlogPageMobile.png"
            },
            {
                page: "Profile Page Mobile",
                image: "/assets/banner/ProfilePageMobile.png"
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