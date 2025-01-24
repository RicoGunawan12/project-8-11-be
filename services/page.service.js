import { json } from "sequelize";
import AboutPage from "../models/aboutPage.model.js";
import Page from "../models/page.model.js"
import WhyContent from "../models/whyContent.model.js";

export const getPageService = async () => {
    const pages = await Page.findAll();
    const parsedPages = pages.map(page => {
        const contentJSONEng = page.contentJSONEng ? JSON.parse(page.contentJSONEng) : {};
        const contentJSONIndo = page.contentJSONIndo ? JSON.parse(page.contentJSONIndo) : {};
        
        // console.log("Parsed contentJSONEng:", contentJSONEng);
        // console.log("Parsed contentJSONIndo:", contentJSONIndo);
        
        return {
            ...page.toJSON(),
            contentJSONEng,
            contentJSONIndo,
        };
    });
    return parsedPages;
}

export const getAboutPageService = async () => {
    const pages = await AboutPage.findAll();
    return pages;
}

export const getWhyContentService = async () => {
    const whyContents = await WhyContent.findAll();
    const parsedPages = whyContents.map(whyContent => {
        const whyContentJSONEng = whyContent.whyContentJSONEng ? JSON.parse(whyContent.whyContentJSONEng) : {};
        const whyContentJSONIndo = whyContent.whyContentJSONIndo ? JSON.parse(whyContent.whyContentJSONIndo) : {};
        
        // console.log("Parsed contentJSONEng:", contentJSONEng);
        // console.log("Parsed contentJSONIndo:", contentJSONIndo);
        
        return {
            ...whyContent.toJSON(),
            whyContentJSONEng,
            whyContentJSONIndo,
        };
    });
    return parsedPages;
}

export const updatePageService = async (pageId, index, backgroundPhotoPath, photoPhotoPath) => {
    const page = await Page.findOne({ where: { pageId } });
    if (!page) {
        throw new Error(`Page not found!`);
    }
    
    let jsonContentIndo = JSON.parse(page.contentJSONIndo);
    let jsonContentEng = JSON.parse(page.contentJSONEng);
    if (!Array.isArray(jsonContentIndo)) {
        throw new Error('Content Indo is different as intended to saved');
    }

    if (!Array.isArray(jsonContentIndo)) {
        throw new Error('Content Indo is different as intended to saved');
    }

    const condition = element => element.pageId === (index + 1);

    let foundItem = jsonContentIndo.find(condition);
    let foundIndex = jsonContentIndo.findIndex(condition);

    if (index === 0) {
        foundItem.background = backgroundPhotoPath;
    }

    foundItem.photo = photoPhotoPath;

    jsonContentIndo[foundIndex] = foundItem;

    foundItem = jsonContentEng.find(condition);
    foundIndex = jsonContentEng.findIndex(condition);

    if (index === 0) {
        foundItem.background = backgroundPhotoPath;
    }

    foundItem.photo = photoPhotoPath;

    jsonContentEng[foundIndex] = foundItem;

    await Page.update(
        { 
            contentJSONEng: JSON.stringify(jsonContentEng),
            contentJSONIndo: JSON.stringify(jsonContentIndo)
        },
        { where: { pageId: pageId } }
    );

    return { message: 'Page updated successfully' };
}

export const migratePage = async () => {
    const pages = await getPageService();
    if (pages.length === 0) {
        try {
            const body = [
                {
                    pageId: 1,
                    page: "Main Page",
                    title: "Find The Best Cup For Your",
                    content: "Upgrade your hydration with our stylish, eco-friendly cups and bottles! Designed to keep drinks hot or cold for hours, they’re perfect for any adventure. Available in a variety of colors and sizes, there’s a match for everyone. Sip in style—get yours today!",
                    background: "/assets/background/Main Page1.png",
                    photo: "/assets/photo/Main Page1.png"
                },
                {
                    pageId: 2,
                    page: "Main Page",
                    title: "New Collection",
                    content: "Discover our newest collection—where style meets functionality in every piece. Fresh designs, vibrant colors, and premium quality await to elevate your everyday essentials!"
                },
                {
                    pageId: 3,
                    page: "Main Page",
                    title: "Best Cup Since 2014",
                    content: "Meet the TYESO Cup, our best-seller that’s been making waves! Known for its sleek design and superior insulation, this cup keeps your drinks at the perfect temperature for hours, whether hot or cold. Made from eco-friendly, durable materials and available in multiple colors, the TYESO Cup has become a favorite for its blend of style, sustainability, and function. Perfect for on-the-go lifestyles, it's the go-to choice for those who value both quality and the environment.",
                    bestNumber1: "8900+",
                    bestTitle1: "Interact",
                    bestNumber2: "3105+",
                    bestTitle2: "Purchase",
                    bestNumber3: "2014+",
                    bestTitle3: "Reviews",
                    photo: "/assets/photo/Main Page3.png"
                },
                {
                    pageId: 4,
                    page: "Main Page",
                    title: "Seller Product",
                    content: "Our best seller product is renowned for its exceptional quality and customer satisfaction. Carefully crafted using the finest materials, it offers a perfect balance of durability, functionality, and style. Customers love it for its reliability and outstanding performance, making it the top choice in its category. Whether you're looking for something to enhance your everyday life or a dependable solution to meet your needs, our best seller delivers unmatched value. With countless positive reviews and high ratings, it's clear why this product stands out as a customer favorite. Experience the excellence that sets it apart today!"
                },
            ];
            const body2 = [
                {
                    pageId: 1,
                    page: "Main Page",
                    title: "Cari Botol Terbaik Untukmu!",
                    content: "Upgrade your hydration with our stylish, eco-friendly cups and bottles! Designed to keep drinks hot or cold for hours, they’re perfect for any adventure. Available in a variety of colors and sizes, there’s a match for everyone. Sip in style—get yours today!",
                    background: "/assets/background/Main Page1.png",
                    photo: "/assets/photo/Main Page1.png"
                },
                {
                    pageId: 2,
                    page: "Main Page",
                    title: "Koleksi Terbaru",
                    content: "Discover our newest collection—where style meets functionality in every piece. Fresh designs, vibrant colors, and premium quality await to elevate your everyday essentials!"
                },
                {
                    pageId: 3,
                    page: "Main Page",
                    title: "Gelas Terbaik Sejak 2014",
                    content: "Meet the TYESO Cup, our best-seller that’s been making waves! Known for its sleek design and superior insulation, this cup keeps your drinks at the perfect temperature for hours, whether hot or cold. Made from eco-friendly, durable materials and available in multiple colors, the TYESO Cup has become a favorite for its blend of style, sustainability, and function. Perfect for on-the-go lifestyles, it's the go-to choice for those who value both quality and the environment.",
                    bestNumber1: "8900+",
                    bestTitle1: "Interact",
                    bestNumber2: "3105+",
                    bestTitle2: "Purchase",
                    bestNumber3: "2014+",
                    bestTitle3: "Reviews",
                    photo: "/assets/photo/Main Page3.png"
                },
                {
                    pageId: 4,
                    page: "Main Page",
                    title: "Produk Terbaik",
                    content: "Our best seller product is renowned for its exceptional quality and customer satisfaction. Carefully crafted using the finest materials, it offers a perfect balance of durability, functionality, and style. Customers love it for its reliability and outstanding performance, making it the top choice in its category. Whether you're looking for something to enhance your everyday life or a dependable solution to meet your needs, our best seller delivers unmatched value. With countless positive reviews and high ratings, it's clear why this product stands out as a customer favorite. Experience the excellence that sets it apart today!"
                },
            ];
            const contentJSONEng = JSON.stringify(body)
            const contentJSONIndo = JSON.stringify(body2)
            Page.create({ contentJSONEng, contentJSONIndo });
            // console.log("Migrate page success!");
        } catch (error) {
            console.error(error.message);
        }
    }
}

export const migrateAboutPage = async () => {
    const pages = await getAboutPageService();
    if (pages.length === 0) {
        try {
            const contentEng = "With so many water bottles on the market, we had to ask: why are 3 out of 4 people still struggling with chronic dehydration? We all know that being dehydrated makes us feel and look awful—more like sluggish zombies than vibrant humans. And let’s face it, zombies aren’t exactly known for living their best lives. When we dug deeper, we realized the problem: most water bottles are either way too complex or just plain underwhelming. Do you really need a bottle built for scaling Mount Everest to sit on your office desk? Or for running errands? Or hitting the gym to the tunes of Post Malone? What you need is a bottle that’s your trusty companion, not a high-maintenance guide. So, we got to work. After more than three years of dedication, we’ve crafted what we believe are the best water bottles out there—designed to help you do more of what you love. What are you waiting for? Grab one, stay hydrated, and seize the day like a boss."
            const contentIndo = "Dengan banyaknya botol di pasar ...."
            const titleEng = "test english"
            const titleIndo = "test indo"
            const whyEng = "why tyeso???"
            const whyIndo = "kenapa tyeso???"
            const introduceEng = "Introduce Eng"
            const introduceIndo = "Introduce Indo"
            AboutPage.create({ contentEng, contentIndo, titleEng, titleIndo, whyEng, whyIndo, introduceEng, introduceIndo });
            // console.log("Migrate page success!");
        } catch (error) {
            console.error(error.message);
        }
    }
}

export const migrateWhyContent = async () => {
    const whyContents = await getWhyContentService();
    if (whyContents.length === 0) {
        try {
            const body = [
                {
                    contentId: 1,
                    photo: "/assets/photo/About Page1.png",
                    content: "test 123"
                },
                {
                    contentId: 2,
                    photo: "/assets/photo/About Page2.png",
                    content: "test 123456"
                },
                {
                    contentId: 3,
                    photo: "/assets/photo/About Page3.png",
                    content: "test 123456789"
                },
                {
                    contentId: 4,
                    photo: "/assets/photo/About Page4.png",
                    content: "test 123456789101112"
                },
            ];
            const body2 = [
                {
                    contentId: 1,
                    photo: "/assets/photo/About Page1.png",
                    content: "test 123"
                },
                {
                    contentId: 2,
                    photo: "/assets/photo/About Page2.png",
                    content: "test 123456"
                },
                {
                    contentId: 3,
                    photo: "/assets/photo/About Page3.png",
                    content: "test 123456789"
                },
                {
                    contentId: 4,
                    photo: "/assets/photo/About Page4.png",
                    content: "test 123456789101112"
                },
            ];
            const whyContentJSONEng = JSON.stringify(body)
            const whyContentJSONIndo = JSON.stringify(body2)
    
            await WhyContent.create({ whyContentJSONEng, whyContentJSONIndo });    
        } catch (error) {
            throw new Error("Failed to migrate why content");
        }
    }
}

export const updateEngPageService = async (id, contentJSONEng) => {
    const updatedPage = await Page.update(
        { contentJSONEng: JSON.stringify(contentJSONEng) },
        { 
            where: {
                pageId: id
            }
        }
    )
    if (updatedPage[0] === 0) {
        throw new Error("There is no change or page")
    }
    return updatedPage;
}

export const updateIndoPageService = async (id, contentJSONIndo) => {
    const updatedPage = await Page.update(
        { contentJSONIndo: JSON.stringify(contentJSONIndo) },
        { 
            where: {
                pageId: id
            }
        }
    )
    if (updatedPage[0] === 0) {
        throw new Error("There is no change or page")
    }
    return updatedPage;
}

export const updateEngAboutPageService = async (id, contentEng, titleEng, whyEng) => {
    const updatedPage = await AboutPage.update(
        { 
            contentEng: contentEng, 
            titleEng: titleEng,
            whyEng: whyEng
        },
        { 
            where: {
                pageId: id
            }
        }
    )
    
    return updatedPage;
}

export const updateIndoAboutPageService = async (id, contentIndo, titleIndo, whyIndo) => {
    const updatedPage = await AboutPage.update(
        { 
            contentIndo: contentIndo, 
            titleIndo: titleIndo,
            whyIndo: whyIndo
        },
        { 
            where: {
                pageId: id
            }
        }
    )
    
    return updatedPage;
}

export const updateEngWhyContentService = async (whyContentJSONEng, whyContentId) => {
    const updatedPage = await WhyContent.update(
        { whyContentJSONEng: JSON.stringify(whyContentJSONEng) },
        { 
            where: {
                whyId: whyContentId
            }
        }
    )
    
    return updatedPage;
}

export const updateIndoWhyContentService = async (whyContentJSONIndo, whyContentId) => {
    const updatedPage = await WhyContent.update(
        { whyContentJSONIndo: JSON.stringify(whyContentJSONIndo) },
        { 
            where: {
                whyId: whyContentId
            }
        }
    )
    
    return updatedPage;
}

