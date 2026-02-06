import { FiAlertCircle } from "react-icons/fi";

export default function Error({ message }) {
  return (
    <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <FiAlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-red-400 text-lg mb-1">Something went wrong</p>
          <p className="text-red-300/80 text-sm">{message || "Unable to fetch weather data. Please try again."}</p>
        </div>
      </div>
    </div>
  );
}
