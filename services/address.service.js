import { UserAddressModel } from "../association/association.js"


export const getAddresByUserIdService = async (ref_user_id) => {
    const userAddresses = await UserAddressModel.findOne({ where: { ref_user_id }});
    return userAddresses;
}

export const createAddresService = async (addressId, userId, addressDistrict, addressDetail) => {
    const insertedAddress = await UserAddressModel.create({ addressId, userId, addressDistrict, addressDetail });
    return insertedAddress;
}