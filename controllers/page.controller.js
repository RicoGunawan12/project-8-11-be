import { getPageService } from "../services/page.service.js";


export const getPage = async (req, res) => {
    try {
        const pages = getPageService();
        return res.status(200).json({ message: "Fetch successful", pages })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePage = async (req, res) => {
    
    try {
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}