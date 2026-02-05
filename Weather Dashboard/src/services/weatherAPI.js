import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchCurrentWeather = (city, units) =>
  axios.get(`${BASE_URL}/weather`, {
    params: { q: city, units, appid: API_KEY },
  });

export const fetchForecast = (city, units) =>
  axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, units, appid: API_KEY },
  });

export const fetchByCoords = (lat, lon, units) =>
  axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, units, appid: API_KEY },
  });

export const fetchForecastByCoords = (lat, lon, units) =>
  axios.get(`${BASE_URL}/forecast`, {
    params: { lat, lon, units, appid: API_KEY },
  });

