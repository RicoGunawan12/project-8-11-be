

export const searchDestinationKomship = async (keyword) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", process.env.KOMSHIP_API);

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
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", process.env.KOMSHIP_API);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    
    try {
        const komshipResponse = await fetch(`https://api.collaborator.komerce.my.id/tariff/api/v1/calculate?shipper_destination_id=${shipperDestinationId}&receiver_destination_id=${receiverDestinationId}&weight=${weight}&item_value=${itemValue}&cod=${cod}`, requestOptions);
        
        if (!komshipResponse.ok) {
            throw new Error("Failed to calculate delivery fee");
        }

        const calculation = await komshipResponse.json();
        return calculation
    } catch (error) {
        throw new Error(error.message);
    }
    
}
