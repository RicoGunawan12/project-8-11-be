import { getCODDataService, updateCODDataService } from "../services/codData.service.js"

export const getCODData = async (req, res) => {
    try {
        const codData = await getCODDataService();
        return res.status(200).json({ message: "COD data fetched", codData });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCODData = async (req, res) => {
    const { maximumPaymentAmount } = req.body;
    const codId = req.params.id;

    if (!codId) {
        return res.status(400).json({ message: "COD Id is required" })
    }

    if (typeof maximumPaymentAmount !== 'number' || maximumPaymentAmount <= 0) {
        return res.status(400).json({
            message: 'Maximum payment amount must be more than 0',
        });
    }

    try {
        await updateCODDataService(codId, maximumPaymentAmount);
        return res.status(200).json({ message: "COD data updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}