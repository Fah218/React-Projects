import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";

export default function ForecastBars() {
    const { forecast, units } = useSelector((state) => state.weather);
    const [animatedHeights, setAnimatedHeights] = useState([]);

    // Get 7-day forecast (one entry per day at noon)
    const getDailyForecast = useMemo(() => {
        if (!forecast || forecast.length === 0) return [];

        const dailyData = [];
        const processedDates = new Set();

        for (const item of forecast) {
            const date = new Date(item.dt * 1000);
            const dateStr = date.toDateString();

            // Get one forecast per day, preferably around noon
            if (!processedDates.has(dateStr) && dailyData.length < 7) {
                const hour = date.getHours();
                // Prefer forecasts between 11 AM and 3 PM
                if (hour >= 11 && hour <= 15) {
                    dailyData.push(item);
                    processedDates.add(dateStr);
                } else if (!processedDates.has(dateStr) && dailyData.length < 7) {
                    // If we don't have a noon forecast, take the first one for that day
                    dailyData.push(item);
                    processedDates.add(dateStr);
                }
            }

            if (dailyData.length >= 7) break;
        }

        return dailyData;
    }, [forecast]);

    const dailyForecast = getDailyForecast;
    const tempUnit = units === "metric" ? "°C" : "°F";

    // Calculate min and max temps for scaling
    const temps = dailyForecast.map((item) => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = maxTemp - minTemp || 1; // Avoid division by zero

    // Animate bars on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedHeights(dailyForecast.map(() => true));
        }, 100);
        return () => clearTimeout(timer);
    }, [dailyForecast.length]);

    // Early return AFTER all hooks
    if (!forecast || forecast.length === 0) return null;

    // Calculate bar height percentage (minimum 20% for visibility)
    const getBarHeight = (temp) => {
        const normalized = ((temp - minTemp) / tempRange) * 60 + 20;
        return Math.max(normalized, 20);
    };

    // Get color based on temperature
    const getTempColor = (temp) => {
        if (temp >= 30) return "from-red-500 to-orange-500";
        if (temp >= 20) return "from-orange-400 to-yellow-400";
        if (temp >= 10) return "from-yellow-400 to-green-400";
        if (temp >= 0) return "from-green-400 to-blue-400";
        return "from-blue-400 to-indigo-500";
    };

    return (
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                7-Day Forecast
            </h3>

            <div className="flex items-end justify-between gap-3 md:gap-4 h-64 md:h-80">
                {dailyForecast.map((item, index) => {
                    const temp = Math.round(item.main.temp);
                    const height = getBarHeight(item.main.temp);
                    const date = new Date(item.dt * 1000);
                    const isToday = index === 0;

                    return (
                        <div
                            key={item.dt}
                            className="flex-1 flex flex-col items-center justify-end group"
                        >
                            {/* Temperature Label */}
                            <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-bold text-sm md:text-base bg-slate-700/80 px-2 py-1 rounded-lg">
                                    {temp}{tempUnit}
                                </span>
                            </div>

                            {/* Weather Icon */}
                            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt={item.weather[0].description}
                                    className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg"
                                />
                            </div>

                            {/* Animated Bar */}
                            <div
                                className={`w-full bg-gradient-to-t ${getTempColor(
                                    item.main.temp
                                )} rounded-t-xl relative overflow-hidden transition-all duration-700 ease-out shadow-lg hover:shadow-2xl`}
                                style={{
                                    height: animatedHeights[index] ? `${height}%` : "0%",
                                }}
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent transform -skew-y-12 group-hover:translate-y-full transition-transform duration-1000"></div>

                                {/* Temperature Display on Bar */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        {temp}°
                                    </span>
                                </div>
                            </div>

                            {/* Day Label */}
                            <div className="mt-3 text-center">
                                <p className={`text-xs md:text-sm font-semibold ${isToday ? "text-blue-400" : "text-slate-300"
                                    }`}>
                                    {isToday ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" })}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-orange-500"></div>
                    <span>Hot</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-yellow-400 to-green-400"></div>
                    <span>Mild</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                    <span>Cold</span>
                </div>
            </div>
        </div>
    );
}
