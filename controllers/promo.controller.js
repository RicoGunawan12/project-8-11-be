import { json } from "sequelize";
import { createPromoDetailService, createPromoService, getPromoService } from "../services/promo.service.js";
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

    const { promoName, promoAmount, startDate, endDate, products } = req.body;
    console.log(req.body);

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
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    else if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    else if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: "Invalid or missing products. It should be an array." });
    }

    try {
        const promo = await createPromoService(promoName, promoAmount, startDate, endDate);
        const promoDetail = await createPromoDetailService(promo.promoId, products);
        return res.status(200).json({ message: "Promo created!", promo});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}