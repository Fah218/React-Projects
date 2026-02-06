import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");

    // Apply theme to body
    if (dark) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${dark
          ? "bg-slate-700 text-white hover:bg-slate-600"
          : "bg-white text-slate-900 hover:bg-slate-100"
        }`}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <FiSun
          className={`absolute inset-0 transition-all duration-300 ${dark ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
            }`}
        />
        <FiMoon
          className={`absolute inset-0 transition-all duration-300 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
            }`}
        />
      </div>
      <span className="text-sm font-semibold">
        {dark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
