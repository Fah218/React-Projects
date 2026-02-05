import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../features/weatherSlice";
import Loader from "./Loader";
import Error from "./Error";

export default function MainWeatherCard() {
  const dispatch = useDispatch();
  const { current, loading, error, units } = useSelector((state) => state.weather);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!current) {
    return (
      <div className="flex justify-center items-center h-48 bg-slate-800 rounded-xl p-6 text-slate-400">
        <p>Search for a city or enable location to see weather.</p>
      </div>
    );
  }

  const tempUnit = units === "metric" ? "°C" : "°F";
  const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-md flex flex-col items-center relative h-full justify-center">
      <button
        onClick={() => dispatch(addFavorite(current.name))}
        className="absolute top-4 right-4 text-yellow-400 hover:scale-110 transition text-xl"
      >
        ⭐
      </button>
      <h2 className="text-3xl font-bold mb-2">
        {current.name}, {current.sys.country}
      </h2>
      <p className="text-slate-400 capitalize mb-4">{current.weather[0].description}</p>

      <div className="w-48 h-48 flex items-center justify-center">
        <img
          src={iconUrl}
          alt={current.weather[0].description}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="text-6xl font-bold mt-4 text-white">
        {Math.round(current.main.temp)}{tempUnit}
      </div>
      <div className="flex gap-4 mt-2 text-slate-400">
        <span>H: {Math.round(current.main.temp_max)}°</span>
        <span>L: {Math.round(current.main.temp_min)}°</span>
      </div>
    </div>
  );
}
