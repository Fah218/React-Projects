import { useSelector } from "react-redux";

export default function WeatherDetailsPanel() {
  const { current } = useSelector((state) => state.weather);

  if (!current) return null;

  const details = [
    {
      label: "Humidity",
      value: `${current.main.humidity}%`,
    },
    {
      label: "Wind Speed",
      value: `${current.wind.speed} m/s`,
    },
    {
      label: "Pressure",
      value: `${current.main.pressure} hPa`,
    },
    {
      label: "Visibility",
      value: `${(current.visibility / 1000).toFixed(1)} km`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {details.map((item) => (
        <div
          key={item.label}
          className="bg-slate-800 rounded-xl p-4 text-center shadow"
        >
          <p className="text-slate-400 text-sm">
            {item.label}
          </p>
          <p className="text-xl font-semibold mt-1">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
