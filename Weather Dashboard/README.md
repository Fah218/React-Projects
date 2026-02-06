# Weather Dashboard ⛅

A modern, professional weather dashboard built with React, Redux Toolkit, and Tailwind CSS. Features real-time weather data, 7-day forecasts, and a beautiful, responsive UI.

![Weather Dashboard](https://img.shields.io/badge/React-19.2.0-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-cyan)

## ✨ Features

### 🎨 Professional UI/UX
- **Hero Weather Card** - Large, dynamic card with gradient backgrounds that change based on weather conditions
- **Animated Weather Visuals** - Smooth transitions and hover effects throughout the interface
- **Glass Morphism Design** - Modern backdrop blur effects and translucent components
- **Responsive Layout** - Fully optimized for desktop, tablet, and mobile devices

### 🌡️ Weather Information
- **Real-time Weather Data** - Current temperature, conditions, humidity, wind speed, and more
- **7-Day Forecast Bars** - Animated vertical bar chart showing temperature trends
- **Detailed Weather Metrics** - Feels like temperature, pressure, visibility, and cloudiness
- **City + Country Display** - Clear location information with country codes
- **Weather Condition Icons** - Large, professional weather icons from OpenWeatherMap

### 🔧 Functionality
- **Auto-location Detection** - Automatically fetches weather for your current location on load
- **City Search** - Search for any city worldwide with an elegant search bar
- **Dark/Light Mode Toggle** - Smooth theme switching with animated transitions
- **°C/°F Support** - Toggle between Celsius and Fahrenheit with visual feedback
- **Favorites System** - Save your favorite cities for quick access

### 🎯 Technical Highlights
- **Clean, Modular Code** - Well-organized component structure
- **Redux State Management** - Centralized state with Redux Toolkit
- **Async Data Fetching** - Efficient API calls with error handling
- **Local Storage** - Persists theme preferences and favorite cities
- **Custom Animations** - CSS animations and transitions for smooth UX
- **Optimized Performance** - Fast load times and smooth interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fah218/React-Projects.git
   cd "Weather Dashboard"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **Redux Toolkit 2.11.2** - State management
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **Lottie React** - Animation library (ready for future enhancements)

## 📁 Project Structure

```
Weather Dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── HeroWeatherCard.jsx
│   │   ├── ForecastBars.jsx
│   │   ├── WeatherDetailsPanel.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── UnitToggle.jsx
│   │   ├── Loader.jsx
│   │   └── Error.jsx
│   ├── features/            # Redux slices and thunks
│   │   ├── weatherSlice.js
│   │   └── weather/
│   │       └── weatherThunks.js
│   ├── pages/               # Page components
│   │   └── Dashboard.jsx
│   ├── services/            # API services
│   │   └── weatherAPI.js
│   ├── utils/               # Utility functions
│   │   └── weatherAnimations.js
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── index.css            # Tailwind imports
│   └── main.jsx             # App entry point
├── .env                     # Environment variables
├── package.json
└── README.md
```

## 🎨 Component Overview

### HeroWeatherCard
The main weather display featuring:
- Dynamic gradient backgrounds based on weather conditions
- Large temperature display with °C/°F support
- City and country information
- Weather condition description
- High/Low temperatures
- Quick weather metrics (humidity, wind, pressure)
- Favorite button

### ForecastBars
7-day forecast visualization with:
- Animated vertical bars
- Temperature-based color gradients
- Weather icons for each day
- Hover effects showing detailed info
- Responsive design

### WeatherDetailsPanel
Detailed weather metrics including:
- Feels like temperature
- Humidity with progress bar
- Wind speed
- Atmospheric pressure
- Visibility
- Cloudiness percentage

### SearchBar
Modern search interface with:
- Icon-enhanced input field
- Gradient button
- Auto-clear after search
- Disabled state handling

### ThemeToggle
Animated theme switcher with:
- Sun/Moon icons
- Smooth transitions
- Local storage persistence

### UnitToggle
Temperature unit switcher with:
- °C/°F toggle
- Sliding indicator
- Visual feedback

## 🌈 Color Scheme

The dashboard uses a carefully crafted color palette:

- **Dark Theme**: Slate grays with blue/purple accents
- **Light Theme**: Sky blues with clean whites
- **Accent Colors**: 
  - Blue (#3b82f6) - Primary actions
  - Purple (#8b5cf6) - Secondary accents
  - Gradients - Weather condition backgrounds

## 🔑 API Integration

The app uses the OpenWeatherMap API for:
- Current weather data
- 5-day/3-hour forecast
- Geolocation-based weather

API endpoints used:
- `/weather` - Current weather by city or coordinates
- `/forecast` - 5-day forecast data

## 🎯 Future Enhancements

- [ ] Add Lottie weather animations
- [ ] Hourly forecast view
- [ ] Weather alerts and warnings
- [ ] Multiple location comparison
- [ ] Historical weather data
- [ ] Weather maps integration
- [ ] PWA support for offline access
- [ ] Social sharing features

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Fahad Furquan**
- GitHub: [@Fah218](https://github.com/Fah218)
- Project: [React Projects](https://github.com/Fah218/React-Projects)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI inspiration from modern weather apps

---

**Enjoy the weather! ☀️🌧️❄️**
