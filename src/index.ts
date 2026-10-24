import fetchWeather, { type Forecast } from "./api.js";
import { future_html, generateHTML } from "./render.js";


console.log(await fetchWeather("addis abeba"))


const input_acceptor = document.getElementById("input-country") as HTMLInputElement;
const get_weather_btn = document.getElementById("get-weather-btn") as HTMLButtonElement;
const main_weather_wraper = document.querySelector(".wrapper") as HTMLDivElement;
const future_forcast_wraper = document.querySelector<HTMLDivElement>(".future-forecast");



get_weather_btn?.addEventListener("click", async (e) => {
  e.preventDefault();
  reloading();

  try {
    const weather_info = await fetchWeather(input_acceptor.value);
    input_acceptor.value = "";

    console.log(weather_info);
    generateHTML(weather_info);
    date_forecast_seter(weather_info);
    futureForecast(weather_info);
  } catch (error) {
    error_mesage(error);
  }
});

function error_mesage(message: unknown) {
  main_weather_wraper.innerHTML = `
  <p class="error-display">something wents wrong. ${message}</p>

  `;
}


function reloading() {
  main_weather_wraper.innerHTML = `
  
  <p class="loading-page">loading please wait...</p>

  `;

}

export function getWeatherDescription(code: number) {
  if (code === 0)
    return {
      condition: "Sunny",
      icon: "☀️",
    };
  if (code === 1)
    return {
      condition: "Mainly sunny",
      icon: "🌤️",
    };
  if (code === 2)
    return {
      condition: "Partly cloudy",
      icon: "⛅",
    };
  if (code === 3)
    return {
      condition: "Cloudy",
      icon: "☁️",
    };

  if (code &&  ([45, 48].includes(code)))
    return {
      condition: "Foggy",
      icon: "🌫️",
    };

  if (code && ([51, 53, 55].includes(code)))
    return {
      condition: "Drizzle",
      icon: "💦",
    };

  if (code && ([61, 63, 65].includes(code)))
    return {
      condition: "Rainy",
      icon: "🌧️",
    };

  if (code && ([71, 73, 75].includes(code)))
    return {
      condition: "Snowy",
      icon: "❄️",
    };

  if (code && ([80, 81, 82].includes(code)))
    return {
      condition: "Rain showers",
      icon: "🌦️",
    };

  if (code && ([95, 96, 99].includes(code)))
    return {
      condition: "Thunderstorm",
      icon: "⛈️",
    };

  return {
    condition: "Unknown",
    icon: "?",
  };
}

export function date_forecast_seter(weatherInfo: Forecast) {
  const date = weatherInfo.current.time;
  const local_time = new Date(date);
  console.log(local_time)
  return day_changer(local_time);
}

// future_forecast_seter();

export interface futureForecast {
  day:string,
  icon: {
    condition: string,
    icon: string
  },
  temp: string
}

function futureForecast(weatherInfo: Forecast) {
  const max_weather = weatherInfo.daily.temperature_2m_max;
  const min_weather = weatherInfo.daily.temperature_2m_min;
  const weather_time = weatherInfo.daily.time;
  const weather_code = weatherInfo.daily.weather_code;
  let future_condition: futureForecast[] = [];
  weather_code.forEach((_, index) => {
    const min_temp = min_weather[index];
    const max_temp = max_weather[index];
    
    const day = day_changer(new Date(weather_time[index]));
    const icon = getWeatherDescription(weather_code[index]);

    future_condition.push({
      day: day,
      icon: icon,
      temp: `${min_temp}°c - ${max_temp}°c`,
    });
  });

  future_forcast_wraper!.innerHTML = future_html(future_condition);

  console.log(future_condition);
}

function day_changer(day: Date) {
  return day.toLocaleDateString("en-Us", {
    month: "short",
    weekday: "short",
    day: "numeric",
  });
}
