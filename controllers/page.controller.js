import { getAboutPageService, getPageService, getWhyContentService, updateEngAboutPageService, updateEngPageService, updateEngWhyContentService, updateIndoAboutPageService, updateIndoPageService, updateIndoWhyContentService, updatePageService } from "../services/page.service.js";
import { convertImageToWebp } from "../utils/imageconverter.js";
import { UPLOAD_FOLDER } from "../utils/uploader.js";
import { isValidNumber } from "../utils/utility.js";


export const getPage = async (req, res) => {
    try {
        const pages = await getPageService();
        return res.status(200).json({ message: "Fetch successful", pages })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateEngPage = async (req, res) => {
    
    const { contentJSONEng } = req.body;
    const id = req.params.id
    
    if (!contentJSONEng || !Array.isArray(contentJSONEng)) {
        return res.status(400).json({ error: "Invalid or missing content. It should be an array." });
    }
    
    if (!id || typeof id !== "string" || !/^[a-f0-9-]{36}$/i.test(id)) {
        return res.status(400).json({ error: "Invalid or missing ID. It should be a valid UUID." });
    }

    try {
        const response = await updateEngPageService(id, contentJSONEng);
        return res.status(200).json({ message: "Page updated!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateIndoPage = async (req, res) => {
    
    const { contentJSONIndo } = req.body;
    const id = req.params.id
    
    if (!contentJSONIndo || !Array.isArray(contentJSONIndo)) {
        return res.status(400).json({ error: "Invalid or missing content. It should be an array." });
    }
    
    if (!id || typeof id !== "string" || !/^[a-f0-9-]{36}$/i.test(id)) {
        return res.status(400).json({ error: "Invalid or missing ID. It should be a valid UUID." });
    }

    try {
        const response = await updateIndoPageService(id, contentJSONIndo);
        return res.status(200).json({ message: "Page updated!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateBackgroundPage = async (req, res) => {
    const pageId = req.params.id;
    
    // converts image to WebP format
    const pages = await getPageService();
    const index = parseInt(req.body.index);
    const page = pages[0].contentJSONEng[index].page;
    let image = null;
    let filename = '';
    let convertedImageData = null;
    
    let backgroundPhotoString = '';
    const backgroundPhoto = req.files['background'];
    image = backgroundPhoto[0];
    filename = `${page}${index + 1}.webp`;
    convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + 'background', image, filename);
    backgroundPhotoString = `/${UPLOAD_FOLDER}background/${filename}`;

    // converts image to WebP format
    let photoPhotoString = '';
    const photoPhoto = req.files['photo'];
    image = photoPhoto[0];
    filename = `${page}${index + 1}.webp`;
    convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + 'photo', image, filename);
    photoPhotoString = `/${UPLOAD_FOLDER}photo/${filename}`;

    await updatePageService(
        pageId,
        index,
        backgroundPhotoString,
        photoPhotoString
    );
    
    return res.status(200).json({ message: "Image updated!" });
    // var { index } = req.body;
    // const images = req.files['background'];

    // if (isValidNumber(index)) {
    //     index = parseInt(index);
    // }
    // if (!images || !Array.isArray(images) || images.length < 1) {
    //     return res.status(400).json({ message: "Variant image is required" });
    // }

    // try {
    //     const response = await updateBackgroundPageService(index, images[0])
    // } catch (error) {
    //     return res.status(500).json({ message: error.message });
    // }
}

export const updateWhyPhoto = async (req, res) => {
    // converts image to WebP format
    const index = parseInt(req.body.index);
    let image = null;
    let filename = '';
    let convertedImageData = null;
    
    let photoPhotoString = '';
    const photoPhoto = req.files['photo'];
    image = photoPhoto[0];
    filename = `About Page${index + 1}.webp`;
    convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + 'photo', image, filename);
    photoPhotoString = `/${UPLOAD_FOLDER}photo/${filename}`;

    const whyContents = await getWhyContentService();
    const whyId = whyContents[0].whyId;
    const condition = element => element.contentId === (index + 1);

    let jsonContentEng = whyContents[0].whyContentJSONEng;
    let foundItem = jsonContentEng.find(condition);
    let foundIndex = jsonContentEng.findIndex(condition);

    foundItem.photo = photoPhotoString;
    jsonContentEng[foundIndex] = foundItem;

    let jsonContentIndo = whyContents[0].whyContentJSONIndo;
    foundItem = jsonContentIndo.find(condition);
    foundIndex = jsonContentIndo.findIndex(condition);

    foundItem.photo = photoPhotoString;
    jsonContentIndo[foundIndex] = foundItem;

    await updateEngWhyContentService(jsonContentEng, whyId);
    await updateIndoWhyContentService(jsonContentIndo, whyId);

    return res.status(200).json({ message: "Photo updated!" });
}

export const getAboutPage = async (req, res) => {
    try {
        const response = await getAboutPageService();
        return res.status(200).json({ message: "About Page Fetched!", response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getWhyContent = async (req, res) => {
    try {
        const response = await getWhyContentService();
        return res.status(200).json({ message: "Why content fetched!", response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateEngAboutPage = async (req, res) => {

    const { contentEng, titleEng, whyEng, whyContentJSONEng, whyContentId } = req.body;
    const id = req.params.id
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: "Invalid or missing ID parameter." });
    }

    if (!titleEng || typeof titleEng !== 'string' || titleEng.trim().length === 0) {
        return res.status(400).json({ error: "Title must be a non-empty string." });
    }

    if (!contentEng || typeof contentEng !== 'string' || contentEng.trim().length === 0) {
        return res.status(400).json({ error: "Content must be a non-empty string." });
    }

    if (!whyEng || typeof whyEng !== 'string' || whyEng.trim().length === 0) {
        return res.status(400).json({ error: "Why Tyeso must be a non-empty string." });
    }

    if (!whyContentJSONEng || !Array.isArray(whyContentJSONEng)) {
        return res.status(400).json({ error: "Invalid or missing why content. It should be an array." });
    }
    if (!whyContentId || typeof whyContentId !== 'string') {
        return res.status(400).json({ error: "Invalid or missing why content ID parameter." });
    }

    try {
        const response = await updateEngAboutPageService(id, contentEng, titleEng, whyEng);
        const whyResponse = await updateEngWhyContentService(whyContentJSONEng, whyContentId);
        return res.status(200).json({ message: "About Page updated!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateIndoAboutPage = async (req, res) => {

    const { contentIndo, titleIndo, whyIndo, whyContentJSONIndo, whyContentId } = req.body;
    const id = req.params.id

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: "Invalid or missing ID parameter." });
    }

    if (!titleIndo || typeof titleIndo !== 'string' || titleIndo.trim().length === 0) {
        return res.status(400).json({ error: "Title must be a non-empty string." });
    }

    if (!contentIndo || typeof contentIndo !== 'string' || contentIndo.trim().length === 0) {
        return res.status(400).json({ error: "Content must be a non-empty string." });
    }

    if (!whyIndo || typeof whyIndo !== 'string' || whyIndo.trim().length === 0) {
        return res.status(400).json({ error: "Why Tyeso must be a non-empty string." });
    }

    if (!whyContentJSONIndo || !Array.isArray(whyContentJSONIndo)) {
        return res.status(400).json({ error: "Invalid or missing why content. It should be an array." });
    }
    if (!whyContentId || typeof whyContentId !== 'string') {
        return res.status(400).json({ error: "Invalid or missing why content ID parameter." });
    }


    try {
        const response = await updateIndoAboutPageService(id, contentIndo, titleIndo, whyIndo);
        const whyResponse = await updateIndoWhyContentService(whyContentJSONIndo, whyContentId);
        return res.status(200).json({ message: "About Page updated!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
