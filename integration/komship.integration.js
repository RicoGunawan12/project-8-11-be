import { response } from "express";

const myHeaders = new Headers();
myHeaders.append("x-api-key", process.env.KOMSHIP_API);

export const searchDestinationKomship = async (keyword) => {

    if (keyword === undefined) {
        keyword = ""
    }

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://api.collaborator.komerce.my.id/tariff/api/v1/destination/search?keyword=" + keyword, requestOptions);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const searchResult = await response.json();
        return searchResult;
    } catch (error) {
        throw new Error(error.message);
    }

}

export const calculateDeliveryFeeKomship = async (shipperDestinationId, receiverDestinationId, weight, itemValue, cod) => {
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    
    try {
        const komshipResponse = await fetch(`https://api.collaborator.komerce.my.id/tariff/api/v1/calculate?shipper_destination_id=${shipperDestinationId}&receiver_destination_id=${receiverDestinationId}&weight=${weight}&item_value=${itemValue}&cod=${cod}`, requestOptions);
        if (!komshipResponse.ok) {
            throw new Error("Failed to calculate delivery fee: " + komshipResponse.statusText);
        }
    
        const calculation = await komshipResponse.json();
        return calculation
    } catch (error) {
        throw new Error(error.message);
    }
    
}

// "order_date": "2024-05-29 23:59:59",
// "brand_name": "Komship",
// "shipper_name": "Toko Official Komship",
// "shipper_phone": "6281234567689",
// "shipper_destination_id": 17588,
// "shipper_address": "order address detail",
// "shipper_email":"test@gmail.com",
// "receiver_name": "Buyer A",
// "receiver_phone": "6281209876543",
// "receiver_destination_id": 17589, 
// "receiver_address": "order destination address detail",
// "shipping": "JNT",
// "shipping_type": "EZ",
// "payment_method": "COD",
// "shipping_cost":22000,
// "shipping_cashback":10000,
// "service_fee":2500,
// "additional_cost":1000,
// "grand_total":317000,
// "cod_value":317000,
// "insurance_value": 1000,
// "order_details": [
//     {
//         "product_name": "Komship package",
//         "product_variant_name": "Komship variant product",
//         "product_price": 500000,
//         "product_width": 5,
//         "product_height": 2,
//         "product_weight": 5100,
//         "product_length": 20,
//         "qty": 1,
//         "subtotal": 500000
//     }
// ]
export const createOrderKomship = async () => {

}