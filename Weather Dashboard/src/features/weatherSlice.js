import { createSlice } from "@reduxjs/toolkit";
import { getWeatherByCity, getWeatherByCoords } from "./weather/weatherThunks";

const loadFavorites = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (e) {
    console.error("Failed to parse favorites from local storage", e);
    return [];
  }
};

const initialState = {
  current: null,
  forecast: [],
  favorites: loadFavorites(),
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
      })
      .addCase(getWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.current;
        state.forecast = action.payload.forecast.list;
      })
      .addCase(getWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleUnits, addFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
