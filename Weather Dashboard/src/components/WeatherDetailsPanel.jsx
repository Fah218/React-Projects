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
      color: "from-orange-400 to-red-400",
    },
    {
      label: "Humidity",
      value: `${current.main.humidity}%`,
      icon: <WiHumidity className="w-10 h-10" />,
      color: "from-blue-400 to-cyan-400",
    },
    {
      label: "Wind Speed",
      value: `${Math.round(current.wind.speed)} ${units === "metric" ? "m/s" : "mph"}`,
      icon: <WiStrongWind className="w-10 h-10" />,
      color: "from-teal-400 to-green-400",
    },
    {
      label: "Pressure",
      value: `${current.main.pressure} hPa`,
      icon: <WiBarometer className="w-10 h-10" />,
      color: "from-purple-400 to-pink-400",
    },
    {
      label: "Visibility",
      value: `${(current.visibility / 1000).toFixed(1)} km`,
      icon: <FiEye className="w-8 h-8" />,
      color: "from-indigo-400 to-blue-400",
    },
    {
      label: "Cloudiness",
      value: `${current.clouds?.all || 0}%`,
      icon: <FiDroplet className="w-8 h-8" />,
      color: "from-gray-400 to-slate-400",
    },
  ];

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl h-full">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
        Weather Details
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {details.map((item, index) => (
          <div
            key={item.label}
            className="bg-slate-700/50 rounded-2xl p-4 hover:bg-slate-700 transition-all duration-300 group cursor-pointer card-hover"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`text-transparent bg-gradient-to-br ${item.color} bg-clip-text`}>
                {item.icon}
              </div>
              <div className="flex-1 text-right">
                <p className="text-slate-400 text-xs mb-1 group-hover:text-slate-300 transition-colors">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-white group-hover:scale-110 transition-transform inline-block">
                  {item.value}
                </p>
              </div>
            </div>

            {/* Progress bar for percentage values */}
            {item.value.includes('%') && (
              <div className="w-full bg-slate-600/50 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
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
