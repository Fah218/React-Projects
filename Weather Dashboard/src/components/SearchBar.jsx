import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCity } from "../features/weather/weatherThunks";

export default function SearchBar() {
  const dispatch = useDispatch();
  const units = useSelector((s) => s.weather.units);

  const handleSearch = (e) => {
    e.preventDefault();
    const city = e.target.city.value.trim();
    if (!city) return;
    dispatch(getWeatherByCity({ city, units }));
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input name="city" className="input" placeholder="Enter city" />
      <button className="btn">Search</button>
    </form>
  );
}
