import { calculateDeliveryFeeService, createAddresService, getAddresByUserIdService, searchDestinationService } from "../services/address.service.js";


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
    const { komshipAddressId, addressLabel, addressDetail } = req.body;
    const userId = req.user.userId;
    
    try {
        const insertedAddress = await createAddresService(komshipAddressId, userId, addressLabel, addressDetail);
        return res.status(200).json(insertedAddress);
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