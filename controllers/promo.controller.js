import { json } from "sequelize";
import { createPromoDetailService, createPromoService, deletePromoService, getPromoByIdService, getPromoService, updatePromoService } from "../services/promo.service.js";
import { isValidDate } from "../utils/utility.js";


export const getPromo = async (req, res) => {
    try {
        const promos = await getPromoService();
        return res.status(200).json({ message: "Promo fetched!", promos })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createPromo = async (req, res) => {

    const { promoName, promoAmount, startDate, endDate, products, isMultipleUse } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!promoName) {
        return res.status(400).json({ message: "Promo name must be filled!" });
    }
    else if (!promoAmount) {
        return res.status(400).json({ message: "Product promo must be filled!" });
    }
    else if (promoAmount <= 0) {
        return res.status(400).json({ message: "Product promo cannot be minus" });
    }
    else if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate and endDate are required' });
    }
    else if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
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
    else if (!products || !Array.isArray(products)) {
        return res.status(400).json({ message: "Invalid or missing products. It should be an array." });
    }

    try {
        const promo = await createPromoService(promoName, promoAmount, startDate, endDate, isMultipleUse);
        const promoDetail = await createPromoDetailService(promo.promoId, products);
        return res.status(200).json({ message: "Promo created!", promo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deletePromo = async (req, res) => {
    const promoId = req.params.id;
    if (!promoId) {
        return res.status(400).json({ message: "Promo id is required!" });
    }
    try {
        const deletedPromo = await deletePromoService(promoId);
        return res.status(200).json({ message: "Promo deleted!", deletedPromo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPromoById = async (req, res) => {
    const promoId = req.params.id;
    if (!promoId) {
        return res.status(400).json({ message: "Promo id is required!" });
    }
    try {
        const promo = await getPromoByIdService(promoId);
        return res.status(200).json({ message: "Promo deleted!", promo });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePromo = async (req, res) => {
    const promoId = req.params.id;
    const { promoName, promoAmount, startDate, endDate, products } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!promoName) {
        return res.status(400).json({ message: "Promo name must be filled!" });
    }
    else if (!promoAmount) {
        return res.status(400).json({ message: "Product promo must be filled!" });
    }
    else if (promoAmount <= 0) {
        return res.status(400).json({ message: "Product promo cannot be minus" });
    }
    else if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate and endDate are required' });
    }
    else if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
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
    else if (!products || !Array.isArray(products)) {
        return res.status(400).json({ message: "Invalid or missing products. It should be an array." });
    }

    try {
        await updatePromoService(promoId, promoName, promoAmount, startDate, endDate, products);
        return res.status(200).json({ message: "Promo updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}