import { createSlice } from "@reduxjs/toolkit";
import { getWeatherByCity } from "./weather/weatherThunks";

const initialState = {
  current: null,
  forecast: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  units: "metric",
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    toggleUnits(state) {
      state.units = state.units === "metric" ? "imperial" : "metric";
    },
    addFavorite(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast.list;
      })
      .addCase(getWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleUnits, addFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
