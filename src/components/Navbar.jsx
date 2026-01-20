import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";


const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full h-[60px] flex justify-between items-center px-6 lg:px-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm sticky top-0 z-50">
      <div className="flex gap-x-8 items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
          PasteApp
        </h1>
        <div className="flex gap-x-6">
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold text-lg relative after:content-[''] after:absolute after:left-0 after:-bottom-[19px] after:w-full after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400"
                  : "text-gray-600 dark:text-gray-400 font-medium text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default Navbar;
