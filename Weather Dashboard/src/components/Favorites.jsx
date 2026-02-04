import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity } from "../features/weather/weatherThunks";

export default function Favorites() {
  const dispatch = useDispatch();
  const { favorites, units } = useSelector((state) => state.weather);

  if (favorites.length === 0) {
    return <p className="text-slate-400">No favorite cities yet.</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">⭐ Favorites</h3>
      <div className="flex flex-wrap gap-2">
        {favorites.map((city) => (
          <button
            key={city}
            onClick={() =>
              dispatch(getWeatherByCity({ city, units }))
            }
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
