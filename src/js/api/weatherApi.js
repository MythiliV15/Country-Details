const API_KEY = "Replace_With_Your_AccuWeather_API_Key"; 

export async function fetchWeather(capital) {
    if (!capital) return null;

    try {
        // Step 1: Get Location Key
        const locRes = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${encodeURIComponent(capital)}`);
        const locData = await locRes.json();

        if (locData && locData.length > 0) {
            const locationKey = locData[0].Key;

            // Step 2: Get Current Conditions
            const weatherRes = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`);
            const weatherData = await weatherRes.json();

            if (weatherData && weatherData.length > 0) {
                const data = weatherData[0];
                return {
                    condition: data.WeatherText,
                    temp: data.Temperature.Metric.Value,
                    humidity: data.RelativeHumidity,     
                    wind: data.Wind.Speed.Metric.Value,   
                    realFeel: data.RealFeelTemperature.Metric.Value, 
                    isDay: data.IsDayTime
                };
            }
        }
        return null;
    } catch (error) {
        console.error("AccuWeather Fetch Error:", error);
        return null;
    }
}