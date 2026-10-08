async function fetchWeather(city) {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", city);
    url.searchParams.set("count", "1");
    const geoRes = await fetch(url);
    if (!geoRes.ok)
        throw new Error(`Geocoding failed: ${geoRes.status}`);
    const geo = await geoRes.json();
    if (!geo.results?.[0]) {
        throw new Error(`No city named "${city}"`);
    }
    const { latitude, longitude, name, country } = geo.results[0];
    const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
    forecastUrl.searchParams.set("latitude", latitude);
    forecastUrl.searchParams.set("longitude", longitude);
    forecastUrl.searchParams.set("current", "temperature_2m,weather_code,rain,wind_speed_10m,surface_pressure,visibility");
    forecastUrl.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weather_code");
    forecastUrl.searchParams.set("froecast_days", "7");
    const res = await fetch(forecastUrl);
    const data = await res.json();
    console.log(data);
    return { name, country, current: {
            temperature_2m: data.current.temperature_2m,
            weather_code: data.current.weather_code,
            rain: data.current.rain,
            wind_speed_10m: data.current.wind_speed_10m,
            surface_pressure: data.current.surface_pressure,
            visibility: data.current.visibility,
            time: data.current.time,
        },
        daily: {
            temperature_2m_max: data.daily.temperature_2m_max,
            temperature_2m_min: data.daily.temperature_2m_min,
            weather_code: data.daily.weather_code,
            time: data.daily.time
        }
    };
}
// console.log(await fetchWeather("addis abeba"))
export default fetchWeather;
//# sourceMappingURL=api.js.map