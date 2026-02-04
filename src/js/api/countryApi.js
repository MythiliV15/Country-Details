const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,latlng,borders,altSpellings";

export async function fetchCountries() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}