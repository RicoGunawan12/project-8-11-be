const myHeaders = new Headers();
myHeaders.append("key", process.env.RAJAONGKIR_API);

export const getAllProvinceRajaOngkir = async () => {
    try {
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        const response = await fetch(process.env.RAJAONGKIR_URL + "/api/province", requestOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

export const getAllCityRajaOngkir = async (province) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        if (province === undefined) {
            province = "";
        }
        
        const response = await fetch(process.env.RAJAONGKIR_URL + "/api/city?province=" + province, requestOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

export const getAllSubdistrictRajaOngkir = async (city) => {
    try {
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        if (city === undefined) {
            city = "";
        }
        const response = await fetch(process.env.RAJAONGKIR_URL + "/api/subdistrict?city=" + city, requestOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}