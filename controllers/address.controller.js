import { calculateDeliveryFeeService, createAddresService, getAddresByUserIdService, getAllCityService, getAllProvinceService, getAllSubdistrictService, searchDestinationService } from "../services/address.service.js";


export const getAddressByUserId = async (req, res) => {
    
    const user = req.user;

    try {
        const userAddress = await getAddresByUserIdService(user.userId);
        return res.status(200).json(userAddress);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createAddress = async (req, res) => {
    const { province, city, subdistrict, postalCode, addressDetail } = req.body;
    const userId = req.user.userId;
    
    try {
        const insertedAddress = await createAddresService(province, city, subdistrict, postalCode, userId, addressDetail);
        return res.status(200).json(insertedAddress);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllProvince = async (req, res) => {
    try {
        const provinces = await getAllProvinceService();
        return res.status(200).json({ provinces });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
} 

export const getAllCity = async (req, res) => {
    const { province } = req.query;
    try {
        const cities = await getAllCityService(province);
        return res.status(200).json({ cities });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
} 

export const getAllSubdistrict = async (req, res) => {
    const { city } = req.query;
    try {
        const subdistrict = await getAllSubdistrictService(city);
        return res.status(200).json({ subdistrict });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
} 

export const searchDestination = async (req, res) => {
    const { keyword } = req.query;
    
    try {
        const searchResult = await searchDestinationService(keyword);
        return res.status(200).json({ message: "Fetch success!", searchResult });
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}

export const calculateDeliveryFee = async (req, res) => {
    const { shipperDestinationId, receiverDestinationId, weight, itemValue, cod } = req.query;
    
    try {
        const calculationResult = await calculateDeliveryFeeService(shipperDestinationId, receiverDestinationId, weight, itemValue, cod);
        return res.status(200).json({ message: "Fetch success!", calculationResult });
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}