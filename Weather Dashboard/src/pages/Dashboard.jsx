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
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm mb-6 border border-slate-200 dark:border-slate-700 transition-colors duration-300 top-0 z-50">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Weather<span className="font-light text-slate-500">Dash</span>
          </h1>
        </div>

        {/* Center Search Bar */}
        <div className="w-full max-w-lg mx-auto">
          <SearchBar />
        </div>

        <div className="flex gap-3 items-center flex-shrink-0">
          <ThemeToggle />
          <UnitToggle />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Hero Card (7 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <HeroWeatherCard />
          {/* Move Forecast Bars here for compact view? No, let's keep it below but styled better */}
          <div className="hidden lg:block">
            <ForecastBars />
          </div>
        </div>

        {/* Right Column: Details + Mobile Forecast (5 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <WeatherDetailsPanel />
          <div className="lg:hidden">
            <ForecastBars />
          </div>
        </div>
      </div>
    </div>
  );
}


