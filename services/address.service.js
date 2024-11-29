import { Op } from "sequelize";
import { UserAddressModel } from "../association/association.js"
import { calculateDeliveryFeeKomship, searchDestinationKomship } from "../integration/komship.integration.js";
import { getAllCityRajaOngkir, getAllProvinceRajaOngkir, getAllSubdistrictRajaOngkir } from "../integration/rajaongkir.integeration.js";
import RajaOngkirCity from "../models/rajaOngkirCity.model.js";
import RajaOngkirProvince from "../models/rajaOngkirProvince.model.js";


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

export const getAllProvinceService = async () => {
    const provinces = await RajaOngkirProvince.findAll();
    return provinces
}

export const getAllCityService = async (province) => {
    const cities = await RajaOngkirCity.findAll({
        where: {
            province_id: {
                [Op.like]: `%${province}%`
            }
        }
    });
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