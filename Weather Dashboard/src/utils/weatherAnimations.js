import Lottie from "lottie-react";

// Weather animation data (simplified inline animations)
export const getWeatherAnimation = (condition) => {
    // For now, we'll return null and use the default icons
    // In a production app, you would import actual Lottie JSON files
    // Example: import sunnyAnimation from '../assets/animations/sunny.json';

    const animations = {
        clear: null, // Would be sunny animation
        clouds: null, // Would be cloudy animation
        rain: null, // Would be rain animation
        snow: null, // Would be snow animation
        thunderstorm: null, // Would be thunderstorm animation
    };

    return animations[condition] || null;
};

// Weather condition utilities
export const getWeatherIcon = (condition, size = "4x") => {
    return `https://openweathermap.org/img/wn/${condition}@${size}.png`;
};

export const getWeatherDescription = (weatherData) => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
        return "Unknown";
    }
    return weatherData.weather[0].description;
};

export const getWeatherCondition = (weatherData) => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
        return "unknown";
    }
    return weatherData.weather[0].main.toLowerCase();
};
