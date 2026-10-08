export interface Forecast {
    name: string;
    country: string;
    current: {
        temperature_2m: number;
        weather_code: number;
        rain: number;
        wind_speed_10m: number;
        surface_pressure: number;
        visibility: number;
        time: Date;
    };
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weather_code: number[];
        time: Date[];
    };
}
declare function fetchWeather(city: string): Promise<Forecast>;
export default fetchWeather;
//# sourceMappingURL=api.d.ts.map