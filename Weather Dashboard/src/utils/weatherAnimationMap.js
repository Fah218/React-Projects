export const weatherAnimationMap = (main) => {
  switch (main) {
    case "Clear":
      return "clear.json";
    case "Clouds":
      return "cloudy.json";
    case "Rain":
    case "Drizzle":
      return "rain.json";
    case "Snow":
      return "snow.json";
    case "Thunderstorm":
      return "storm.json";
    default:
      return "cloudy.json";
  }
};
