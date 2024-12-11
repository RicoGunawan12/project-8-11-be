import { getPageService, updatePageService } from "../services/page.service.js";


export const getPage = async (req, res) => {
    try {
        const pages = await getPageService();
        return res.status(200).json({ message: "Fetch successful", pages })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePage = async (req, res) => {
    
    const { contentJSON, language } = req.body;
    const id = req.params.id
    
    if (!contentJSON || !Array.isArray(contentJSON)) {
        return res.status(400).json({ error: "Invalid or missing contentJSON. It should be an array." });
    }

    if (!language || typeof language !== "string") {
        return res.status(400).json({ error: "Invalid or missing language. It should be a 3-character string." });
    }
    
    if (!id || typeof id !== "string" || !/^[a-f0-9-]{36}$/i.test(id)) {
        return res.status(400).json({ error: "Invalid or missing ID. It should be a valid UUID." });
    }

    try {
        const response = await updatePageService(id, contentJSON, language);
        return res.status(200).json({ message: "Page updated!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}