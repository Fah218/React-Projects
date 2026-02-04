import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/weatherAPI";

export const getWeatherByCity = createAsyncThunk(
  "weather/getByCity",
  async ({ city, units }, thunkAPI) => {
    try {
      const [current, forecast] = await Promise.all([
        api.fetchCurrentWeather(city, units),
        api.fetchForecast(city, units),
      ]);
      return { current: current.data, forecast: forecast.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);
