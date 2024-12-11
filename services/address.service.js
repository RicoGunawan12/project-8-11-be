import { Op, where } from "sequelize";
import { UserAddressModel } from "../association/association.js"
import { calculateDeliveryFeeKomship, searchDestinationKomship } from "../integration/komship.integration.js";
import { getAllCityRajaOngkir, getAllProvinceRajaOngkir, getAllSubdistrictRajaOngkir } from "../integration/rajaongkir.integeration.js";
import RajaOngkirCity from "../models/rajaOngkirCity.model.js";
import RajaOngkirProvince from "../models/rajaOngkirProvince.model.js";
import AdminAddress from "../models/adminAddress.model.js";


export const getAddresByUserIdService = async (ref_user_id) => {
    const userAddresses = await UserAddressModel.findAll(
        { 
            where: { ref_user_id },
        }
    );
    return userAddresses;
}

export const createAddresService = async (receiverName, receiverPhoneNumber, addressProvince, addressCity, addressSubdistrict, postalCode, userId, addressDetail) => {
    addressProvince = addressProvince.toUpperCase();
    addressCity = addressCity.toUpperCase();
    addressSubdistrict = addressSubdistrict.toUpperCase();
    
    const destination = await searchDestinationKomship(postalCode);
    
    var komshipAddressId = destination.data[0].id;
    var komshipLabel = destination.data[0].label;

    const insertedAddress = await UserAddressModel.create({ userId, receiverName, receiverPhoneNumber, komshipAddressId, komshipLabel, addressProvince, addressCity, addressSubdistrict, postalCode, addressDetail });
    return insertedAddress;
}

export const deleteAddressService = async (addressId) => {
    const deletedAddress = await UserAddressModel.destroy({
        where: { addressId }
    })
    
    if (deletedAddress == 0) {
        throw new Error("Address not found!");
    }
    return deletedAddress;
}

export const updateAddresService = async (addressId, receiverName, receiverPhoneNumber, addressProvince, addressCity, addressSubdistrict, postalCode, addressDetail) => {
    addressProvince = addressProvince.toUpperCase();
    addressCity = addressCity.toUpperCase();
    addressSubdistrict = addressSubdistrict.toUpperCase();
    
    const destination = await searchDestinationKomship(postalCode);
    
    var komshipAddressId = destination.data[0].id;
    var komshipLabel = destination.data[0].label;

    const updatedAddress = await UserAddressModel.update(
        {
            receiverName: receiverName,
            receiverPhoneNumber: receiverPhoneNumber,
            addressProvince: addressProvince,
            addressCity: addressCity,
            addressSubdistrict: addressSubdistrict,
            postalCode: postalCode,
            addressDetail: addressDetail,
            komshipAddressId: komshipAddressId,
            komshipLabel: komshipLabel
        },
        { where: { addressId } }
    );
    if (updatedAddress[0] === 0) {
        throw new Error("Address not found!");
    }
    return updatedAddress;
}

export const getAllProvinceService = async () => {
    const provinces = await RajaOngkirProvince.findAll();
    return provinces
}

export const getAllCityService = async (province) => {
    const cities = await RajaOngkirCity.findAll( province != "" ? {
        where: {
            province_id: province
        }
        
    } : {});
    return cities;
}

export const getAllSubdistrictService = async (city) => {
    const subdistricts = await getAllSubdistrictRajaOngkir(city);
    return subdistricts;
}

export const storeAllProvinceService = async () => {
    
    const storedProvince = await RajaOngkirProvince.findAndCountAll();
    if (storedProvince.count != 0) {
        return;
    }
    
    const provinces = await getAllProvinceRajaOngkir();
    await RajaOngkirProvince.bulkCreate(provinces.rajaongkir.results);

}

export const storeAllCityService = async () => {
    const storedCity = await RajaOngkirCity.findAndCountAll();
    if (storedCity.count != 0) {
        return;
    }
    const cities = await getAllCityRajaOngkir();
    await RajaOngkirCity.bulkCreate(cities.rajaongkir.results);

}

export const storeAllSubdistrictService = async () => {

    const subdistricts = await getAllSubdistrictRajaOngkir();

}

export const searchDestinationService = async (keyword) => {
    const searchResult = await searchDestinationKomship(keyword);
    return searchResult;
}

export const calculateDeliveryFeeService = async (shipperDestinationId, receiverDestinationId, weight, itemValue, cod) => {
    const calculationResult = await calculateDeliveryFeeKomship(shipperDestinationId, receiverDestinationId, weight, itemValue, cod);
    return calculationResult;
}

export const updatePickUpPointService = async (senderName, senderPhoneNumber, province, city, subdistrict, postalCode, addressDetail) => {
    const insertedAddress = await AdminAddress.findAll();
    province = province.toUpperCase();
    city = city.toUpperCase();
    subdistrict = subdistrict.toUpperCase();

    const destination = await searchDestinationKomship(postalCode);
    console.log(destination);
    var komshipAddressId = destination.data[0].id;
    var komshipLabel = destination.data[0].label;

    if (insertedAddress.length === 0) {
        const response = await AdminAddress.create({
            senderName: senderName,
            senderPhoneNumber: senderPhoneNumber,
            addressProvince: province,
            addressCity: city,
            addressSubdistrict: subdistrict,
            postalCode: postalCode,
            addressDetail: addressDetail,
            komshipAddressId: komshipAddressId, 
            komshipLabel: komshipLabel,
        })
        return response;
    }
    else {
        const response = await AdminAddress.update(
            {
                senderName: senderName,
                senderPhoneNumber: senderPhoneNumber,
                addressProvince: province,
                addressCity: city,
                addressSubdistrict: subdistrict,
                postalCode: postalCode,
                addressDetail: addressDetail,
                komshipAddressId: komshipAddressId, 
                komshipLabel: komshipLabel,
            },
            {
                where: {
                    addressId: insertedAddress[0].addressId
                }
            }
        )
        return response
    }
}

export const getPickUpPointService = async () => {
    const pickupPoint = await AdminAddress.findAll();
    return pickupPoint;
}