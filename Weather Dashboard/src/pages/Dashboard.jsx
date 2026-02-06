import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCoords } from "../features/weather/weatherThunks";
import SearchBar from "../components/SearchBar";
import HeroWeatherCard from "../components/HeroWeatherCard";
import WeatherDetailsPanel from "../components/WeatherDetailsPanel";
import ForecastBars from "../components/ForecastBars";
import UnitToggle from "../components/UnitToggle";
import ThemeToggle from "../components/ThemeToggle";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { units } = useSelector((state) => state.weather);

  useEffect(() => {
    // Auto-location detection on mount
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          getWeatherByCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            units,
          })
        );
      },
      (err) => {
        console.warn("Geolocation denied or failed", err);
      }
    );
  }, [dispatch, units]);

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Weather Dashboard
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Real-time weather updates and 7-day forecast
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          <UnitToggle />
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full">
        <SearchBar />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Hero Weather Card */}
        <div className="lg:col-span-2">
          <HeroWeatherCard />
        </div>

        {/* Weather Details Panel */}
        <div className="lg:col-span-1">
          <WeatherDetailsPanel />
        </div>
      </div>

      {/* 7-Day Forecast Bars */}
      <div className="w-full">
        <ForecastBars />
      </div>
    </div>
  );
}

