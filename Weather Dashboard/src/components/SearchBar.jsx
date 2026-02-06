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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-32 py-4 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-xl"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!city.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
}
