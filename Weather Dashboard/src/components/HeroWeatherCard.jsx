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
            <div className="flex justify-center items-center h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-slate-400 shadow-2xl">
                <div className="text-center">
                    <FiMapPin className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                    <p className="text-lg">Search for a city or enable location to see weather.</p>
                </div>
            </div>
        );
    }

    const tempUnit = units === "metric" ? "°C" : "°F";
    const weatherCondition = current.weather[0].main.toLowerCase();
    const weatherAnimation = getWeatherAnimation(weatherCondition);

    // Dynamic gradient based on weather condition
    const getWeatherGradient = (condition) => {
        const gradients = {
            clear: "from-amber-400 via-orange-500 to-pink-500",
            clouds: "from-slate-600 via-slate-700 to-slate-800",
            rain: "from-blue-600 via-blue-700 to-indigo-900",
            drizzle: "from-blue-400 via-blue-500 to-blue-600",
            thunderstorm: "from-purple-900 via-indigo-900 to-slate-900",
            snow: "from-blue-100 via-blue-200 to-slate-300",
            mist: "from-gray-400 via-gray-500 to-gray-600",
            fog: "from-gray-400 via-gray-500 to-gray-600",
            haze: "from-yellow-300 via-amber-400 to-orange-500",
        };
        return gradients[condition] || "from-slate-700 via-slate-800 to-slate-900";
    };

    const gradient = getWeatherGradient(weatherCondition);

    return (
        <div className={`relative bg-gradient-to-br ${gradient} rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            {/* Favorite Button */}
            <button
                onClick={() => dispatch(addFavorite(current.name))}
                className="absolute top-6 right-6 z-10 text-white/80 hover:text-red-400 hover:scale-125 transition-all duration-300 group"
                aria-label="Add to favorites"
            >
                <FiHeart className="w-7 h-7 group-hover:fill-current" />
            </button>

            <div className="relative z-10">
                {/* Location */}
                <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="w-5 h-5 text-white/80" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {current.name}
                        <span className="text-xl md:text-2xl text-white/70 ml-2">
                            {current.sys.country}
                        </span>
                    </h2>
                </div>

                {/* Weather Description */}
                <p className="text-white/90 text-lg capitalize mb-6 font-medium">
                    {current.weather[0].description}
                </p>

                {/* Main Temperature Display */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex-1">
                        <div className="text-7xl md:text-8xl font-bold text-white mb-2 tracking-tight">
                            {Math.round(current.main.temp)}
                            <span className="text-4xl md:text-5xl text-white/80 ml-2">{tempUnit}</span>
                        </div>
                        <div className="flex gap-6 text-white/80 text-lg">
                            <span className="flex items-center gap-1">
                                <span className="text-sm">H:</span> {Math.round(current.main.temp_max)}°
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="text-sm">L:</span> {Math.round(current.main.temp_min)}°
                            </span>
                        </div>
                    </div>

                    {/* Weather Icon/Animation */}
                    <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
                        {weatherAnimation ? (
                            <div className="w-full h-full">{weatherAnimation}</div>
                        ) : (
                            <img
                                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
                                alt={current.weather[0].description}
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        )}
                    </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                    <div className="text-center">
                        <WiHumidity className="w-10 h-10 mx-auto text-white/80 mb-1" />
                        <p className="text-white/60 text-sm mb-1">Humidity</p>
                        <p className="text-white text-xl font-semibold">{current.main.humidity}%</p>
                    </div>
                    <div className="text-center">
                        <WiStrongWind className="w-10 h-10 mx-auto text-white/80 mb-1" />
                        <p className="text-white/60 text-sm mb-1">Wind</p>
                        <p className="text-white text-xl font-semibold">
                            {Math.round(current.wind.speed)} {units === "metric" ? "m/s" : "mph"}
                        </p>
                    </div>
                    <div className="text-center">
                        <WiBarometer className="w-10 h-10 mx-auto text-white/80 mb-1" />
                        <p className="text-white/60 text-sm mb-1">Pressure</p>
                        <p className="text-white text-xl font-semibold">{current.main.pressure} hPa</p>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>
    );
}
