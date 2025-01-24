import { response } from "express";
import { body } from "express-validator";
import { formatDateToString } from "../utils/utility.js";

const myHeaders = new Headers();
myHeaders.append("x-api-key", process.env.KOMSHIP_API);
myHeaders.append("Content-Type", "application/json");

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
        const response = await fetch(process.env.KOMSHIP_URL + "/tariff/api/v1/destination/search?keyword=" + keyword, requestOptions);
        // console.log(response);

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
        
        const komshipResponse = await fetch(`${process.env.KOMSHIP_URL}/tariff/api/v1/calculate?shipper_destination_id=${shipperDestinationId}&receiver_destination_id=${receiverDestinationId}&weight=${Math.ceil(weight / 1000)}&item_value=${itemValue}&cod=${cod}`, requestOptions);
        if (!komshipResponse.ok) {
            throw new Error("Failed to calculate delivery fee: " + komshipResponse.statusText);
        }

        const calculation = await komshipResponse.json();
        
        
        return calculation
    } catch (error) {
        console.log(error);
        
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
// {
//     "product_name": "Komship package",
//     "product_variant_name": "Komship variant product",
//     "product_price": 500000,
//     "product_width": 5,
//     "product_height": 2,
//     "product_weight": 5100,
//     "product_length": 20,
//     "qty": 1,
//     "subtotal": 500000
// }
// ]
export const createOrderKomship = async (transaction, adminAddress, contact) => {
    console.log(transaction);
    console.log(adminAddress);
    console.log(contact);
    
    const transactionDetails = transaction.transaction_details.map((det) => {
        return {
            product_name: det.product_variant.product.productName,
            product_variant_name:
                (det.product_variant.productSize ?? "") +
                " - " +
                (det.product_variant.productColor ?? ""),
            product_price: det.product_variant.productPrice,
            product_width: Math.ceil(det.product_variant.product.productWidth / 100),
            product_height: Math.ceil(det.product_variant.product.productHeight / 100),
            product_weight: Math.ceil(det.product_variant.product.productWeight / 1000),
            product_length: Math.ceil(det.product_variant.product.productLength / 100),
            qty: det.quantity,
            subtotal: det.quantity * det.product_variant.productPrice
        };
    });
    // console.log(transactionDetails);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify({
            order_date: formatDateToString(new Date()),
            brand_name: "Tyeso Indonesia Official Store",
            shipper_name: adminAddress.senderName,
            shipper_phone: adminAddress.senderPhoneNumber,
            shipper_destination_id: parseInt(adminAddress.komshipAddressId),
            shipper_address: adminAddress.addressDetail,
            shipper_email: contact.email,
            receiver_name: transaction.user_address.receiverName, //ambil dari transaction
            receiver_phone: transaction.user_address.receiverPhoneNumber.replace('+', ''), //ambil dari transaction
            receiver_destination_id: parseInt(transaction.user_address.komshipAddressId), //ambil dari transaction,
            receiver_address: transaction.user_address.addressDetail, // ambil dari transaction
            shipping: transaction.expedition, // ambil dari transaction,
            shipping_type: transaction.shippingType, // ambil dari transaction
            payment_method: transaction.paymentMethod === "COD" ? "COD" : "BANK TRANSFER",
            shipping_cost: transaction.deliveryFee, // ambil dari transaction
            shipping_cashback: transaction.deliveryCashback,
            service_fee: transaction.paymentMethod === "COD" ? transaction.totalPrice * 2.8 / 100 : 0,
            additional_cost: 0,
            grand_total: transaction.totalPrice,
            cod_value: transaction.paymentMethod === "COD" ? transaction.totalPrice : 0,
            insurance_value: 0,
            order_details: transactionDetails
        })
        // body: JSON.stringify({
        //     order_date: "2024-11-19 17:59:59",
        //     brand_name: "Komship",
        //     shipper_name: "Toko Official Komship",
        //     shipper_phone: "6281234567689",
        //     shipper_destination_id: 17588,
        //     shipper_address: "order address detail",
        //     shipper_email:"test@gmail.com",
        //     receiver_name: "Buyer A",
        //     receiver_phone: "6281209876543",
        //     receiver_destination_id: 17589,
        //     receiver_address: "order destination address detail",
        //     shipping: "JNT",
        //     shipping_type: "EZ",
        //     payment_method: "BANK TRANSFER",
        //     shipping_cost:22000,
        //     shipping_cashback:10000,
        //     service_fee:0,
        //     additional_cost:1000,
        //     grand_total:317000,
        //     cod_value:317000,
        //     insurance_value: 1000,
        //     order_details: [
        //         {
        //             product_name: "Komship package",
        //             product_variant_name: "Komship variant product",
        //             product_price: 500000,
        //             product_width: 5,
        //             product_height: 2,
        //             product_weight: 5100,
        //             product_length: 20,
        //             qty: 1,
        //             subtotal: 500000
        //         }
        //     ]
        // })
    };
    console.log({
        order_date: formatDateToString(new Date()),
        brand_name: "Tyeso Indonesia Official Store",
        shipper_name: adminAddress.senderName,
        shipper_phone: adminAddress.senderPhoneNumber,
        shipper_destination_id: parseInt(adminAddress.komshipAddressId),
        shipper_address: adminAddress.addressDetail,
        shipper_email: contact.email,
        receiver_name: transaction.user_address.receiverName, //ambil dari transaction
        receiver_phone: transaction.user_address.receiverPhoneNumber.replace('+', ''), //ambil dari transaction
        receiver_destination_id: parseInt(transaction.user_address.komshipAddressId), //ambil dari transaction,
        receiver_address: transaction.user_address.addressDetail, // ambil dari transaction
        shipping: transaction.expedition, // ambil dari transaction,
        shipping_type: transaction.shippingType, // ambil dari transaction
        payment_method: transaction.paymentMethod === "COD" ? "COD" : "BANK TRANSFER",
        shipping_cost: transaction.deliveryFee, // ambil dari transaction
        shipping_cashback: transaction.deliveryCashback,
        service_fee: transaction.paymentMethod === "COD" ? transaction.totalPrice * 2.8 / 100 : 0,
        additional_cost: 0,
        grand_total: transaction.totalPrice,
        cod_value: transaction.paymentMethod === "COD" ? transaction.totalPrice : 0,
        insurance_value: 0,
        order_details: transactionDetails
    });
    
    // console.log(requestOptions);
    try {
        const komshipResponse = await fetch(`${process.env.KOMSHIP_URL}/order/api/v1/orders/store`, requestOptions);
        // console.log(komshipResponse);

        if (!komshipResponse.ok) {
            throw new Error("Failed to store order: " + komshipResponse.statusText);
        }

        const result = await komshipResponse.json();
        return { response: "Order created successfully", komshipResponse: result };
    } catch (error) {
        throw new Error(error.message);
    }

}


export const requestPickUpKomship = async (orderNumber) => {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    const currentHour = localDate.getHours();
    const currentMinute = localDate.getMinutes();
    if (currentHour > 12 || (currentHour === 12 && currentMinute > 0)) {
        localDate.setDate(localDate.getDate() + 1);
    }

    console.log(
        localDate.toISOString().slice(0, 10)
    );
    
    
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(
            {
                pickup_date: localDate.toISOString().slice(0, 10),
                pickup_time: "20:00",
                pickup_vehicle: "Motor",
                orders: [
                    {
                        order_no: orderNumber
                    }
                ]
            }
        )
    }
    

    try {
        const komshipResponse = await fetch(`${process.env.KOMSHIP_URL}/order/api/v1/pickup/request`, requestOptions);
        console.log(komshipResponse);
        if (!komshipResponse.ok) {
            throw new Error(`Error: ${komshipResponse.statusText}`);
        }
        const result = await komshipResponse.json();
        return result;
    } catch (error) {
        console.log(error);
        
        throw new Error(error.message);
    }
}

export const deliveryDetailKomship = async (orderNumber) => {
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    try {
        const komshipResponse = await fetch(`${process.env.KOMSHIP_URL}/order/api/v1/orders/detail?order_no=${orderNumber}`, requestOptions);
        // console.log(komshipResponse);

        if (!komshipResponse.ok) {
            throw new Error(`Error: ${komshipResponse.statusText}`);
        }

        const result = await komshipResponse.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const printLabelKomship = async (orderNumber) => {
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    }

    try {
        const komshipResponse = await fetch(`${process.env.KOMSHIP_URL}/order/api/v1/orders/print-label?order_no=${orderNumber}&page=page_4`, requestOptions);

        if (!komshipResponse.ok) {
            throw new Error(`Error: ${komshipResponse.statusText}`);
        }

        const result = await komshipResponse.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const cancelOrderKomship = async (orderNumber) => {
    const body = {
        order_no: orderNumber
    }
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(body)
    }

    try {
        const komshipResponse = await fetch(`${process.env.KOMSHIP_URL}/order/api/v1/orders/cancel`, requestOptions);

        if (!komshipResponse.ok) {
            throw new Error(`Error: ${komshipResponse.statusText}`);
        }

        const result = await komshipResponse.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}