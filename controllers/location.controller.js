import { createLocationService, deleteLocationService, getLocationsService, updateLocationService } from "../services/location.service.js";

export const getLocations = async (req, res) => {
    var { province } = req.query;
    if (!province) province = "" 
    try {
        const locations = await getLocationsService(province);
        return res.status(200).json({ message: "Location fetched!", locations })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createLocation = async (req, res) => {
    const {
        province,
        openTime,
        closeTime,
        phoneNumber,
        addressDetail,
        link
    } = req.body;

    if (!province || typeof province !== "string" || province.trim().length === 0) {
        return res.status(400).json({ message: "Province is required" });
    }
    if (!openTime || typeof openTime !== "string" || !/^\d{2}:\d{2}$/.test(openTime)) {
        return res.status(400).json({ message: "Open time is required and must be in HH:mm format." });
    }
    if (!closeTime || typeof closeTime !== "string" || !/^\d{2}:\d{2}$/.test(closeTime)) {
        return res.status(400).json({ message: "Close time is required and must be in HH:mm format." });
    }
    if (!phoneNumber || typeof phoneNumber !== "string" || !/^(\+62|62|0)[2-9][0-9]{7,11}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Phone number is required and must be a valid indonesian number." });
    }
    if (!addressDetail || typeof addressDetail !== "string" || addressDetail.trim().length === 0) {
        return res.status(400).json({ message: "Address detail is required" });
    }
    if (link && typeof link !== "string") {
        return res.status(400).json({ message: "Link must be a string if provided." });
    }


    try {
        const location = await createLocationService(
            province,
            openTime,
            closeTime,
            phoneNumber,
            addressDetail,
            link
        );
        return res.status(200).json({ message: "Location created!", location });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateLocation = async (req, res) => {
    const {
        province,
        openTime,
        closeTime,
        phoneNumber,
        addressDetail,
        link
    } = req.body;
    const locationId = req.params.id;

    if (!locationId || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(locationId)) {
        return res.status(400).json({ message: "Invalid location ID. It must be a valid UUID." });
    }

    if (!province || typeof province !== "string" || province.trim().length === 0) {
        return res.status(400).json({ message: "Province is required" });
    }
    if (!openTime || typeof openTime !== "string" || !/^\d{2}:\d{2}$/.test(openTime)) {
        return res.status(400).json({ message: "Open time is required and must be in HH:mm format." });
    }
    if (!closeTime || typeof closeTime !== "string" || !/^\d{2}:\d{2}$/.test(closeTime)) {
        return res.status(400).json({ message: "Close time is required and must be in HH:mm format." });
    }
    if (!phoneNumber || typeof phoneNumber !== "string" || !/^(\+62|62|0)[2-9][0-9]{7,11}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Phone number is required and must be a valid indonesian number." });
    }
    if (!addressDetail || typeof addressDetail !== "string" || addressDetail.trim().length === 0) {
        return res.status(400).json({ message: "Address detail is required" });
    }
    if (link && typeof link !== "string") {
        return res.status(400).json({ message: "Link must be a string if provided." });
    }

    try {
        const location = await updateLocationService(
            locationId,
            province,
            openTime,
            closeTime,
            phoneNumber,
            addressDetail,
            link
        );
        return res.status(200).json({ message: "Location updated!", location });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteLocation = async (req, res) => {
    const locationId = req.params.id;

    if (!locationId || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(locationId)) {
        return res.status(400).json({ message: "Invalid location ID. It must be a valid UUID." });
    }

    try {
        const deletedLocation = await deleteLocationService(locationId);
        return res.status(200).json({ message: "Location deleted!" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}