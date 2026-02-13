import { useSelector } from "react-redux";
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny } from "react-icons/wi";
import { FiEye, FiDroplet } from "react-icons/fi";

export default function WeatherDetailsPanel() {
  const { current, units } = useSelector((state) => state.weather);

  if (!current) return null;

  const details = [
    {
      label: "Feels Like",
      value: `${Math.round(current.main.feels_like)}°`,
      icon: <WiDaySunny className="w-10 h-10" />,
      color: "text-orange-500",
      bg: "bg-orange-500",
    },
    {
      label: "Humidity",
      value: `${current.main.humidity}%`,
      icon: <WiHumidity className="w-10 h-10" />,
      color: "text-blue-500",
      bg: "bg-blue-500",
    },
    {
      label: "Wind Speed",
      value: `${Math.round(current.wind.speed)} ${units === "metric" ? "m/s" : "mph"}`,
      icon: <WiStrongWind className="w-10 h-10" />,
      color: "text-teal-500",
      bg: "bg-teal-500",
    },
    {
      label: "Pressure",
      value: `${current.main.pressure} hPa`,
      icon: <WiBarometer className="w-10 h-10" />,
      color: "text-purple-500",
      bg: "bg-purple-500",
    },
    {
      label: "Visibility",
      value: `${(current.visibility / 1000).toFixed(1)} km`,
      icon: <FiEye className="w-8 h-8" />,
      color: "text-indigo-500",
      bg: "bg-indigo-500",
    },
    {
      label: "Cloudiness",
      value: `${current.clouds?.all || 0}%`,
      icon: <FiDroplet className="w-8 h-8" />,
      color: "text-slate-500",
      bg: "bg-slate-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 h-full shadow-md border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
        Weather Details
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {details.map((item, index) => (
          <div
            key={item.label}
            className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer border border-slate-100 dark:border-slate-600"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1 text-right">
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  {item.label}
                </p>
                <p className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white group-hover:scale-105 transition-transform inline-block">
                  {item.value}
                </p>
              </div>
            </div>

            {/* Progress bar for percentage values */}
            {item.value.includes('%') && (
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full ${item.bg} transition-all duration-1000 ease-out`}
                  style={{ width: item.value }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
