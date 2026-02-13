import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity } from "../features/weather/weatherThunks";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { units } = useSelector((state) => state.weather);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(getWeatherByCity({ city: city.trim(), units }));
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto lg:mx-0">
      <div className="relative group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="w-full pl-12 pr-28 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-base shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          disabled={!city.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
}

