import { createFAQService, deleteFAQService, getAllFAQService, updateFAQService } from "../services/faq.service.js";

export const getAllFAQ = async (req, res) => {
    try {
        const allFAQ = await getAllFAQService();
        return res.status(200).json({ message: "FAQ fetched!", allFAQ });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createFAQ = async (req, res) => {
    const { faqQuestion, faqAnswer } = req.body;
    try {
        const createdFAQ = await createFAQService(faqQuestion, faqAnswer);
        return res.status(200).json({ message: "FAQ created!", createdFAQ });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteFAQ = async (req, res) => {
    const faqId = req.params.id;
    if (!faqId) {
        return res.status(400).json({ message: "FAQ id must not null" })
    }
    try {
        const deletedFAQ = await deleteFAQService(faqId);
        return res.status(200).json({ message: "FAQ deleted!", deletedFAQ });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateFAQ = async (req, res) => {
    const { faqQuestion, faqAnswer } = req.body;
    const faqId = req.params.id;
    if (!faqId) {
        return res.status(400).json({ message: "FAQ id must not null" })
    }
    if (!faqQuestion || typeof faqQuestion !== "string" || faqQuestion.trim() === "") {
        return res.status(400).json({ message: "FAQ question must not be null or empty." });
    }
    
    if (!faqAnswer || typeof faqAnswer !== "string" || faqAnswer.trim() === "") {
        return res.status(400).json({ message: "FAQ answer must not be null or empty." });
    }

    try {
        const updatedFAQ = await updateFAQService(faqId, faqQuestion, faqAnswer);
        return res.status(200).json({ message: "FAQ updated!", updatedFAQ });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}