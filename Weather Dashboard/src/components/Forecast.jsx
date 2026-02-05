import { useSelector } from "react-redux";

export default function Forecast() {
    const { forecast, units } = useSelector((state) => state.weather);

    if (!forecast || forecast.length === 0) return null;

    // Filter to get roughly one forecast per day (API returns 3-hour steps, 24/3 = 8)
    const dailyForecast = forecast.filter((_, index) => index % 8 === 0).slice(0, 5);
    const tempUnit = units === "metric" ? "°C" : "°F";

    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-slate-100">5-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {dailyForecast.map((item) => (
                    <div key={item.dt} className="bg-slate-700/50 p-4 rounded-lg text-center flex flex-col items-center justify-center">
                        <p className="text-slate-300 font-medium">
                            {new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt="weather icon"
                            className="w-16 h-16"
                        />
                        <p className="font-bold text-xl text-white">
                            {Math.round(item.main.temp)}{tempUnit}
                        </p>
                        <p className="text-xs text-slate-400 capitalize mt-1">
                            {item.weather[0].description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
