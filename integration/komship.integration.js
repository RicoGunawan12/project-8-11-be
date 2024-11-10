

export const calculateDeliveryFeeKomship = async (shipperDestinationId, receiverDestinationId, weight, itemValue, cod) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", process.env.KOMSHIP_API);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const komshipResponse = await fetch(`https://api.collaborator.komerce.my.id/tariff/api/v1/calculate?shipper_destination_id=${shipperDestinationId}&receiver_destination_id=${receiverDestinationId}&weight=${weight}&item_value=${itemValue}&cod=${cod}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    
    if (!komshipResponse.ok) {
        throw new Error("Failed to calculate delivery fee");
    }

    const calculation = await response.json();
    return calculation
}