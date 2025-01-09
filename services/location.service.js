import { Op } from "sequelize";
import Location from "../models/location.model.js"

export const getLocationsService = async (province) => {
    const locations = await Location.findAll({ where: {
        province: {
            [Op.like]: `%${province}%`
        }
    }});
    return locations
}

export const createLocationService = async (
    province,
    openTime,
    closeTime,
    phoneNumber,
    addressDetail,
    link
) => {
    const location = await Location.create({
        province,
        openTime,
        closeTime,
        phoneNumber,
        addressDetail,
        link
    });
    return location
}

export const updateLocationService = async (
    locationId,
    province,
    openTime,
    closeTime,
    phoneNumber,
    addressDetail,
    link
) => {
    const location = await Location.update({
        province: province,
        openTime: openTime,
        closeTime: closeTime,
        phoneNumber: phoneNumber,
        addressDetail: addressDetail,
        link: link
    }, { where: { locationId }});
    return location
}

export const deleteLocationService = async (locationId) => {
    const deletedLocation = await Location.destroy({ where: { locationId }});
    if (deletedLocation === 0) {
        throw new Error("Location not found!");
    }
    return deletedLocation
}
