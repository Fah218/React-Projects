export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="relative">
        {/* Outer ring */}
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>

        {/* Inner ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-purple-500" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
      </div>

      <p className="mt-6 text-slate-400 text-sm animate-pulse">Loading weather data...</p>
    </div>
  );
}
