import Page from "../models/page.model"

export const getPageService = async () => {
    const pages = await Page.findAll();
    return pages;
}