import { UserAddressModel } from "../association/association.js"
import { calculateDeliveryFeeKomship, searchDestinationKomship } from "../integration/komship.integration.js";


export const getAddresByUserIdService = async (ref_user_id) => {
    const userAddresses = await UserAddressModel.findOne(
        { 
            where: { ref_user_id }, 
            attributes: ['addressId', 'komshipAddressId', 'userId', 'addressDistrict', 'addressDetail']
        }
    );
    return userAddresses;
}

export const createAddresService = async (komshipAddressId, userId, addressDistrict, addressDetail) => {
    const insertedAddress = await UserAddressModel.create({ userId, addressDistrict, addressDetail, komshipAddressId });
    return insertedAddress;
}

export const searchDestinationService = async (keyword) => {
    const searchResult = await searchDestinationKomship(keyword);
    return searchResult;
}

export const calculateDeliveryFeeService = async (shipperDestinationId, receiverDestinationId, weight, itemValue, cod) => {
    const calculationResult = await calculateDeliveryFeeKomship(shipperDestinationId, receiverDestinationId, weight, itemValue, cod);
    return calculationResult;
}