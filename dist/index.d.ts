import { type Forecast } from "./api.js";
export declare function getWeatherDescription(code: number): {
    condition: string;
    icon: string;
};
export declare function date_forecast_seter(weatherInfo: Forecast): string;
export interface futureForecast {
    day: string;
    icon: {
        condition: string;
        icon: string;
    };
    temp: string;
}
//# sourceMappingURL=index.d.ts.map