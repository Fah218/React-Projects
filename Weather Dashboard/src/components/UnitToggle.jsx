import { useDispatch, useSelector } from "react-redux";
import { toggleUnits } from "../features/weatherSlice";

export default function UnitToggle() {
  const dispatch = useDispatch();
  const units = useSelector((s) => s.weather.units);
  const isMetric = units === "metric";

  return (
    <button
      onClick={() => dispatch(toggleUnits())}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 cursor-pointer shadow-sm border bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white"
      aria-label={`Switch to ${isMetric ? "Fahrenheit" : "Celsius"}`}
    >
      <div className="flex items-center gap-1">
        <span className={`transition-all duration-300 ${isMetric ? "text-blue-600 dark:text-white scale-110 font-bold" : "text-slate-400 scale-90"}`}>
          °C
        </span>
        <span className="text-slate-300 dark:text-slate-500">/</span>
        <span className={`transition-all duration-300 ${!isMetric ? "text-blue-600 dark:text-white scale-110 font-bold" : "text-slate-400 scale-90"}`}>
          °F
        </span>
      </div>

      {/* Sliding indicator */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 bottom-0 w-1/2 bg-blue-500/20 transition-transform duration-300 ${isMetric ? "translate-x-0" : "translate-x-full"
            }`}
        />
      </div>
    </button>
  );
}
