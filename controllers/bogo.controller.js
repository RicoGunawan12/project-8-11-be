import { createBogoDetailService, createBogoService, deleteBogoService, getBogoByIdService, getBogoService, updateBogoService } from "../services/bogo.service.js";
import { isValidDate } from "../utils/utility.js";

export const getBogo = async (req, res) => {
    try {
        const bogos = await getBogoService();
        return res.status(200).json({ message: "Bogo promotions fetched!", bogos });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createBogo = async (req, res) => {
    const { productId, bogoName, startDate, endDate, listVariant} = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required!" });
    }
    else if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required!" });
    }
    else if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }
    else if (start < today) {
        return res.status(400).json({
            message: "Start date must be today or a future date.",
        });
    }
    else if (end < start) {
        return res.status(400).json({
            message: "End date must be greater than the start date.",
        });
    }
    try {
        const bogo = await createBogoService(productId, bogoName, startDate, endDate, listVariant);
        return res.status(200).json({ message: "Bogo promotion created!", bogo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteBogo = async (req, res) => {
    const bogoId = req.params.id;

    if (!bogoId) {
        return res.status(400).json({ message: "Bogo ID is required!" });
    }

    try {
        const deletedBogo = await deleteBogoService(bogoId);
        return res.status(200).json({ message: "Bogo promotion deleted!", deletedBogo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getBogoById = async (req, res) => {
    const bogoId = req.params.id;

    if (!bogoId) {
        return res.status(400).json({ message: "Bogo ID is required!" });
    }

    try {
        return res.status(200).json({ message: "Bogo promotion fetched!", bogo: await getBogoByIdService(bogoId) });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateBogo = async (req, res) => {
    const bogoId = req.params.id;
    const { productId, startDate, endDate, listVariant } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required!" });
    }
    else if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required!" });
    }
    else if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }
    else if (start < today) {
        return res.status(400).json({
            message: "Start date must be today or a future date.",
        });
    }
    else if (end < start) {
        return res.status(400).json({
            message: "End date must be greater than the start date.",
        });
    }

    try {
        await updateBogoService(bogoId, productId, startDate, endDate, listVariant);
        return res.status(200).json({ message: "Bogo promotion updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createBogoDetail = async(req, res) => {
    const bogoId = req.params.id;
    const { listVariantId } = req.body;

    if (!bogoId) {
        return res.status(400).json({ message: "BOGO ID is required!" });
    }
    else if (!listVariantId) {
        return res.status(400).json({ message: "Product variant ID(s) are required!" });
    }

    try {
        const bogo = await createBogoDetailService(listVariantId, bogoId);
        return res.status(200).json({ message: "Bogo promotion created!", bogo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}