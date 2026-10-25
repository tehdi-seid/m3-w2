import { getWeatherDescription, date_forecast_seter, } from "./index.js";
const wraper = document.querySelector(".forecast-wraper");
export function generateHTML(weatherInfo) {
    const weather_desc = getWeatherDescription(weatherInfo.current.weather_code);
    const currentHTML = `
        <div class="wrapper">
        <div class="country-container">
          <h2>${weatherInfo.name}, ${weatherInfo.country}</h2>
          <h4>${date_forecast_seter(weatherInfo)}</h4>
        </div>
        <div class="targets-weather">
          <div>
            <p class="weather-temp">${weatherInfo.current.temperature_2m}°C</p>
            <p>${weather_desc.condition}</p>
          </div>
          <p class="targets-icon">${weather_desc.icon}</p>
        </div>
        <div class="additional-info">
          <div>
          <p>rain:</p>
          <p>💧 ${weatherInfo.current.rain}mm</p>
          </div>
          <div>
          <p>wind speed:</p>
          <p>💨 ${weatherInfo.current.wind_speed_10m} km/h</p>
          </div>
          <div>
          <p>vissiblity:</p>
          <p>👁 ${Number(weatherInfo.current.visibility) / 1000} km</p>
          </div>
          <div>
          <p>pressure:</p>
          <p>🌡 ${weatherInfo.current.surface_pressure} hPa</p>
          </div>
        </div>
      </div>
  `;
    console.log(currentHTML);
    document.querySelector(".wrapper").innerHTML = currentHTML;
}
export function future_html(future_data) {
    wraper.classList.add("forecast-wraper-display");
    document.querySelector(".main-body").classList.add("body");
    let html = "";
    future_data.forEach((element) => {
        html += `
    <div class="individual-forecast">
      <h5>${element.day}</h5>
      <h6>${element.icon.condition}</h6>
      <p>${element.icon.icon}</p>
      <p>${element.temp}</p>
    </div>
    `;
    });
    return html;
}
//# sourceMappingURL=render.js.map