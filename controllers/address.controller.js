import { calculateDeliveryFeeService, createAddresService, deleteAddressService, getAddresByUserIdService, getAddressByAddressIdService, getAllCityService, getAllProvinceService, getAllSubdistrictService, getPickUpPointService, searchDestinationService, updateAddresService, updatePickUpPointService } from "../services/address.service.js";


export const getAddressByUserId = async (req, res) => {

    const user = req.user;

    try {
        const userAddress = await getAddresByUserIdService(user.userId);
        return res.status(200).json(userAddress);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAddressById = async (req, res) => {
    const addressId = req.params.id;

    try {
        const userAddress = await getAddressByAddressIdService(addressId)
        return res.status(200).json(userAddress)
    } catch (error) {
        return res.status(500).json({message : error.messag})
    }

}

export const createAddress = async (req, res) => {
    const { receiverName, receiverPhoneNumber, city, subdistrict, district, postalCode, addressDetail, komshipAddressId, label } = req.body;
    const userId = req.user.userId;

    try {
        const insertedAddress = await createAddresService(receiverName, receiverPhoneNumber, city, subdistrict, district, postalCode, userId, addressDetail, komshipAddressId, label);
        return res.status(200).json(insertedAddress);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteAddress = async (req, res) => {
    const addressId = req.params.id;
    if (!addressId) {
        return res.status(400).json({ message: "Address id must not null" })
    }
    try {
        const deletedAddress = await deleteAddressService(addressId);
        return res.status(200).json({ message: "Address deleted!", deletedAddress });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateAddress = async (req, res) => {
    const { receiverName, receiverPhoneNumber, province, city, subdistrict, postalCode, addressDetail } = req.body;
    const addressId = req.params.id;
    if (!addressId) {
        return res.status(400).json({ message: "Address id must not null" })
    }
    try {
        const updatedAddress = await updateAddresService(addressId, receiverName, receiverPhoneNumber, province, city, subdistrict, postalCode, addressDetail);
        return res.status(200).json({ message: "Address updated!", updatedAddress });
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

    if (city === undefined) {
        return res.status(400).json({ message: "City ID cannot be null" })
    }

    try {
        const subdistrict = await getAllSubdistrictService(city);
        return res.status(200).json({ subdistrict });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const searchDestination = async (req, res) => {
    var { keyword } = req.query;

    if (!keyword) {
        keyword = "";
    }

    try {
        const searchResult = await searchDestinationService(keyword);
        return res.status(200).json({ message: "Fetch success!", searchResult });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const calculateDeliveryFee = async (req, res) => {
    const { receiverDestinationId, weight, itemValue, cod } = req.query;

    try {
        const adminAddress = await getPickUpPointService();
        console.log(adminAddress)
        const calculationResult = await calculateDeliveryFeeService(adminAddress[0].komshipAddressId, receiverDestinationId, weight, itemValue, cod);
        return res.status(200).json({ message: "Fetch success!", calculationResult });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePickUpPoint = async (req, res) => {
    const { senderName, senderPhoneNumber, city, subdistrict, district, postalCode, addressDetail, komshipAddressId, label } = req.body;

    if (senderName.length === 0) {
        return res.status(400).json({ message: "Sender name must be filled" });
    }
    if (!senderPhoneNumber || typeof senderPhoneNumber !== "string") {
        return res.status(400).json({ message: "Sender phone number is required and must be a string" });
    }
    if (!/^62\d{8,11}$/.test(senderPhoneNumber)) {
        return res.status(400).json({ 
            message: "Sender phone number must start with '62' and be valid phone" 
        });
    }
    if (!city || city.length === 0) {
        return res.status(400).json({ message: "City number must be filled" });
    }
    if (!subdistrict || subdistrict.length === 0) {
        return res.status(400).json({ message: "Subdistrict number must be filled" });
    }
    if (!district || district.trim().length === 0) {
        return res.status(400).json({ message: "District must be filled" });
    }
    if (!postalCode || postalCode.length === 0) {
        return res.status(400).json({ message: "Postal code number must be filled" });
    }
    if (!addressDetail || addressDetail.length === 0) {
        return res.status(400).json({ message: "Address detail must be filled" });
    }
    if (!komshipAddressId || typeof komshipAddressId !== "number") {
        return res.status(400).json({ message: "Komship address ID must be a valid number" });
    }
    if (!label || label.trim().length === 0) {
        return res.status(400).json({ message: "Label must be filled" });
    }

    try {
        const response = await updatePickUpPointService(
            senderName, 
            senderPhoneNumber, 
            city, 
            subdistrict, 
            district, 
            postalCode, 
            addressDetail, 
            komshipAddressId, 
            label
        );
        return res.status(200).json({ message: "Address updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPickUpPoint = async (req, res) => {
    try {
        const response = await getPickUpPointService();
        return res.status(200).json({ message: "Fetch successful", response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}