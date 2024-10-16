import { createAddresService, getAddresByUserIdService } from "../services/address.service.js";


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
    const { addressId, addressDistrict, addressDetail } = req.body;
    const userId = req.user.userId;
    
    try {
        const insertedAddress = await createAddresService(addressId, userId, addressDistrict, addressDetail);
        return res.status(200).json(insertedAddress);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}