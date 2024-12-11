import Page from "../models/page.model.js"

export const getPageService = async () => {
    const pages = await Page.findAll();
    const parsedPages = pages.map(page => {
        return {
            ...page.toJSON(),
            contentJSON: JSON.parse(page.contentJSON),
        };
    });
    return parsedPages;
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
                    content: "Upgrade your hydration with our stylish, eco-friendly cups and bottles! Designed to keep drinks hot or cold for hours, they’re perfect for any adventure. Available in a variety of colors and sizes, there’s a match for everyone. Sip in style—get yours today!"
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
                    content: "Meet the TYESO Cup, our best-seller that’s been making waves! Known for its sleek design and superior insulation, this cup keeps your drinks at the perfect temperature for hours, whether hot or cold. Made from eco-friendly, durable materials and available in multiple colors, the TYESO Cup has become a favorite for its blend of style, sustainability, and function. Perfect for on-the-go lifestyles, it's the go-to choice for those who value both quality and the environment."
                },
                {
                    pageId: 4,
                    page: "Main Page",
                    title: "Seller Product",
                    content: "Our best seller product is renowned for its exceptional quality and customer satisfaction. Carefully crafted using the finest materials, it offers a perfect balance of durability, functionality, and style. Customers love it for its reliability and outstanding performance, making it the top choice in its category. Whether you're looking for something to enhance your everyday life or a dependable solution to meet your needs, our best seller delivers unmatched value. With countless positive reviews and high ratings, it's clear why this product stands out as a customer favorite. Experience the excellence that sets it apart today!"
                },
                {
                    pageId: 5,
                    page: "About Us Page",
                    title: "Hello! We make water bottles",
                    boldContent: "Why? Because we’re a passionate team of dreamers and designers with one simple motto: “Do more of what you love.” And for us, that means crafting products that make life easier and a whole lot more enjoyable.",
                    content: "With so many water bottles on the market, we had to ask: why are 3 out of 4 people still struggling with chronic dehydration? We all know that being dehydrated makes us feel and look awful—more like sluggish zombies than vibrant humans. And let’s face it, zombies aren’t exactly known for living their best lives. When we dug deeper, we realized the problem: most water bottles are either way too complex or just plain underwhelming. Do you really need a bottle built for scaling Mount Everest to sit on your office desk? Or for running errands? Or hitting the gym to the tunes of Post Malone? What you need is a bottle that’s your trusty companion, not a high-maintenance guide. So, we got to work. After more than three years of dedication, we’ve crafted what we believe are the best water bottles out there—designed to help you do more of what you love. What are you waiting for? Grab one, stay hydrated, and seize the day like a boss."
                },
            ];
            const contentJSON = JSON.stringify(body)
            Page.create({ contentJSON, language: "eng" });
            console.log("Migrate page success!");
        } catch (error) {
            console.error(error.message);
        }
    }
}

export const updatePageService = async (id, contentJSON, language) => {
    const updatedPage = await Page.update(
        { contentJSON: JSON.stringify(contentJSON) },
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