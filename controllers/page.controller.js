import { getAboutPageService, getPageService, updateEngAboutPageService, updateEngPageService, updateIndoAboutPageService, updateIndoPageService } from "../services/page.service.js";
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

export const getAboutPage = async (req, res) => {
    try {
        const response = await getAboutPageService();
        return res.status(200).json({ message: "About Page Fetched!", response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateEngAboutPage = async (req, res) => {

    const { contentEng, titleEng, whyEng } = req.body;
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


    try {
        const response = await updateEngAboutPageService(id, contentEng, titleEng, whyEng);
        return res.status(200).json({ message: "About Page updated!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateIndoAboutPage = async (req, res) => {

    const { contentIndo, titleIndo, whyIndo } = req.body;
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


    try {
        const response = await updateIndoAboutPageService(id, contentIndo, titleIndo, whyIndo);
        return res.status(200).json({ message: "About Page updated!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
