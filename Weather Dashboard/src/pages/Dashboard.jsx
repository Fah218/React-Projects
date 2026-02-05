import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCoords } from "../features/weather/weatherThunks";
import SearchBar from "../components/SearchBar";
import MainWeatherCard from "../components/MainWeatherCard";
import WeatherDetailsPanel from "../components/WeatherDetailsPanel";
import Forecast from "../components/Forecast";
import UnitToggle from "../components/UnitToggle";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { units } = useSelector((state) => state.weather);

  useEffect(() => {
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
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <SearchBar />
        <UnitToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MainWeatherCard />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <WeatherDetailsPanel />
          <Forecast />
        </div>
      </div>
    </div>
  );
}
