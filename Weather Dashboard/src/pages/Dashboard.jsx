import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import UnitToggle from "../components/UnitToggle";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <SearchBar />
        <UnitToggle />
      </div>
      <WeatherCard />
      <Forecast />
    </div>
  );
}
