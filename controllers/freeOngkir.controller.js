import { stat } from "fs";
import { getFreeOngkirService, updateFreeOngkirService, updateFreeOngkirStatusService } from "../services/freeOngkir.service.js";

export const getFreeOngkir = async (req, res) => {
    try {
        const freeOngkir = await getFreeOngkirService();
        return res.status(200).json({ message: "Free Ongkir Fetched!", freeOngkir });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateFreeOngkir = async (req, res) => {
    const freeOngkirId = req.params.id;
    const { status, maximumFreeOngkir, minimumPaymentAmount } = req.body

    if (!freeOngkirId) {
        return res.status(400).json({ message: "Free ongkir id is required" });
    }

    if (
        typeof maximumFreeOngkir !== 'number' ||
        maximumFreeOngkir < 0
    ) {
        return res.status(400).json({
          message: 'Maximum free ongkir must be more than 0',
        });
      }

    if (
        typeof minimumPaymentAmount !== 'number' ||
        minimumPaymentAmount < 0
    ) {
        return res.status(400).json({
            message: 'Minimum payment amount must be more than 0',
        });
    }

    try {
        await updateFreeOngkirService(freeOngkirId, status, maximumFreeOngkir, minimumPaymentAmount);
        return res.status(200).json({ message: "Free ongkir updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateFreeOngkirStatus = async (req, res) => {
    const freeOngkirId = req.params.id;
    const { status } = req.body;

    try {
        await updateFreeOngkirStatusService(freeOngkirId, status);
        return res.status(200).json({ message: "Free ongkir status updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}