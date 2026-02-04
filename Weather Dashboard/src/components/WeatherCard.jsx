import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../features/weatherSlice";
import Loader from "./Loader";
import Error from "./Error";

export default function WeatherCard() {
  const dispatch = useDispatch();
  const { current, loading, error, units } = useSelector(
    (state) => state.weather
  );

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!current) {
    return (
      <p className="text-slate-400 text-center">
        Search for a city to see weather data.
      </p>
    );
  }

  const tempUnit = units === "metric" ? "°C" : "°F";
  const icon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {current.name}, {current.sys.country}
        </h2>
        <button
          onClick={() => dispatch(addFavorite(current.name))}
          className="text-yellow-400 hover:scale-110 transition"
        >
          ⭐
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <img src={icon} alt="weather icon" />
        <p className="text-4xl font-semibold">
          {Math.round(current.main.temp)}
          {tempUnit}
        </p>
      </div>

      <div className="text-center mt-2 capitalize text-slate-300">
        {current.weather[0].description}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-slate-400">
        <p>Humidity: {current.main.humidity}%</p>
        <p>Wind: {current.wind.speed} m/s</p>
        <p>Feels like: {Math.round(current.main.feels_like)}{tempUnit}</p>
        <p>Pressure: {current.main.pressure} hPa</p>
      </div>
    </div>
  );
}
