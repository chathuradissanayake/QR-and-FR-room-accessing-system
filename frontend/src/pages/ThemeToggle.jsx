import React from "react";
import { GoChevronLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  // Handle theme selection
  const handleSelectTheme = (selectedTheme) => {
    if (theme !== selectedTheme) {
      toggleTheme(); // Switch the theme if it's different
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600 ">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800">

        <div className="title flex items-center space-x-2 mb-8 dark:text-slate-100">
                  <Link to="/settings">
                    <GoChevronLeft className="cursor-pointer" />
                  </Link>
                  <span className="font-semibold">Theme</span>
                </div>
      <div className="flex flex-col space-y-3">
        {/* Light Theme */}
        <button
          className={`flex items-center p-3 rounded-md cursor-pointer transition ${
            theme === "light"
              ? "bg-blue-300 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() => handleSelectTheme("light")}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              theme === "light" ? "bg-white border-blue-500" : "border-gray-500"
            }`}
          >
            {theme === "light" && (
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            )}
          </div>
          Light
        </button>

        {/* Dark Theme */}
        <button
          className={`flex items-center p-3 rounded-md cursor-pointer transition ${
            theme === "dark"
              ? "bg-blue-300 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() => handleSelectTheme("dark")}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              theme === "dark" ? "bg-white border-blue-500" : "border-gray-500"
            }`}
          >
            {theme === "dark" && (
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            )}
          </div>
          Dark
        </button>
      </div>
    </div>
    </div>
  );
};

export default ThemeToggle;
