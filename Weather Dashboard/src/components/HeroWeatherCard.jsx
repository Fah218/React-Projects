import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../features/weatherSlice";
import { FiHeart, FiMapPin } from "react-icons/fi";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import Loader from "./Loader";
import Error from "./Error";
import { getWeatherAnimation } from "../utils/weatherAnimations";

export default function HeroWeatherCard() {
    const dispatch = useDispatch();
    const { current, loading, error, units } = useSelector((state) => state.weather);

    if (loading) return <Loader />;
    if (error) return <Error message={error} />;
    if (!current) {
        return (
            <div className="glass-card flex justify-center items-center h-96 rounded-3xl p-8 text-slate-500 dark:text-slate-400">
                <div className="text-center">
                    <FiMapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Search for a city or enable location to see weather.</p>
                </div>
            </div>
        );
    }

    const tempUnit = units === "metric" ? "°C" : "°F";
    const weatherCondition = current.weather[0].main.toLowerCase();
    const weatherAnimation = getWeatherAnimation(weatherCondition);

    // Simplified gradients/colors based on weather condition
    const getWeatherColor = (condition) => {
        const colors = {
            clear: "bg-orange-500",
            clouds: "bg-slate-600",
            rain: "bg-blue-600",
            drizzle: "bg-blue-500",
            thunderstorm: "bg-violet-800",
            snow: "bg-blue-200 text-slate-800",
            mist: "bg-gray-500",
            fog: "bg-gray-500",
            haze: "bg-orange-400",
        };
        return colors[condition] || "bg-slate-700";
    };

    const colorClass = getWeatherColor(weatherCondition);

    return (
        <div className={`relative ${colorClass} rounded-3xl p-8 shadow-md transition-all duration-300 text-white`}>

            {/* Favorite Button */}
            <button
                onClick={() => dispatch(addFavorite(current.name))}
                className="absolute top-4 right-4 z-10 text-white/80 hover:text-red-400 hover:scale-110 transition-all duration-300 group"
                aria-label="Add to favorites"
            >
                <FiHeart className="w-6 h-6 group-hover:fill-current" />
            </button>

            <div className="relative z-10">
                {/* Location & Header - Side by Side on Desktop */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <FiMapPin className="w-5 h-5 text-white/80" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                {current.name}, {current.sys.country}
                            </h2>
                        </div>
                        <p className="text-white/90 text-sm md:text-base capitalize font-medium ml-7">
                            {current.weather[0].description}
                        </p>
                    </div>
                </div>

                {/* Main Visuals & Details - Horizontal Layout */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="text-6xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                            {Math.round(current.main.temp)}
                            <span className="text-3xl md:text-4xl text-white/80 align-top ml-1">{tempUnit}</span>
                        </div>
                        <div className="flex gap-4 text-white/90 text-base font-medium mt-2">
                            <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                H: {Math.round(current.main.temp_max)}°
                            </span>
                            <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                L: {Math.round(current.main.temp_min)}°
                            </span>
                        </div>
                    </div>

                    {/* Weather Icon/Animation - Reduced size and pulled up */}
                    <div className="w-28 h-28 md:w-36 md:h-36 relative">
                        {weatherAnimation ? (
                            <div className="w-full h-full">{weatherAnimation}</div>
                        ) : (
                            <img
                                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
                                alt={current.weather[0].description}
                                className="w-full h-full object-contain filter drop-shadow-lg"
                            />
                        )}
                    </div>
                </div>

                {/* Weather Details Grid - More compact */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4 border-t border-white/10">
                    <div className="bg-white/5 rounded-xl p-2 md:p-3 text-center backdrop-blur-sm transition-colors hover:bg-white/10">
                        <WiHumidity className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white/90 mb-1" />
                        <p className="text-white/70 text-xs mb-0.5">Humidity</p>
                        <p className="text-white text-base md:text-lg font-semibold">{current.main.humidity}%</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2 md:p-3 text-center backdrop-blur-sm transition-colors hover:bg-white/10">
                        <WiStrongWind className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white/90 mb-1" />
                        <p className="text-white/70 text-xs mb-0.5">Wind</p>
                        <p className="text-white text-base md:text-lg font-semibold">
                            {Math.round(current.wind.speed)} <span className="text-xs font-normal opacity-70">{units === "metric" ? "m/s" : "mph"}</span>
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2 md:p-3 text-center backdrop-blur-sm transition-colors hover:bg-white/10">
                        <WiBarometer className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white/90 mb-1" />
                        <p className="text-white/70 text-xs mb-0.5">Pressure</p>
                        <p className="text-white text-base md:text-lg font-semibold">{current.main.pressure} <span className="text-xs font-normal opacity-70">hPa</span></p>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
    );
}
