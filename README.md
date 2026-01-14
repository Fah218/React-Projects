# Modern Paste Application - Build Guide

This project is a modern, responsive Pastebin clone built with React, Redux Toolkit, and Tailwind CSS. It features a professional Dark/Light mode, clean UI, and persistent storage.


## 🚀 fast & Easy Build Steps

Follow these points to understand how this app was built from scratch:



### 1. Project Setup

- **Initialize**: Created a new React project using Vite for speed.
  ```bash
  npm create vite@latest paste-app -- --template react
  ```
- **Dependencies**: Installed essential libraries:
  - `react-router-dom`: For navigation (Home, Pastes, View).
  - `@reduxjs/toolkit` & `react-redux`: For managing state (saving pastes).
  - `react-hot-toast`: For nice pop-up notifications.
  - `lucide-react`: For beautiful icons (Copy, Edit, Delete).
  - `tailwindcss` & `@tailwindcss/vite`: For styling.



### 2. Styling (Tailwind CSS)
- Configured **Tailwind CSS v4** in `vite.config.js` and `src/index.css`.
- This allows us to use classes like `flex`, `p-4`, `bg-blue-500` directly in our HTML for rapid design.



### 3. State Management (Redux Store)
- **Slice (`pasteSlice.js`)**: Created a "slice" of state to handle our data.
  - **`addToPastes`**: Adds a new paste to the list.
  - **`updatePastes`**: Edits an existing paste.
  - **`removeFromPastes`**: Deletes a paste.
- **Local Storage**: Added logic to save data to the browser's Local Storage so pastes don't disappear on refresh.
- **Store (`store.js`)**: configured the global store to share this data across the app.



### 4. Routing (Navigation)
- Setup `react-router-dom` in `App.jsx`.
- Defined three main routes:
  1. **`/` (Home)**: The editor where you create or update pastes.
  2. **`/pastes` (Paste List)**: A search-enabled list of all your created pastes.
  3. **`/pastes/:id` (View Paste)**: A read-only view for a specific paste.



### 5. Components & Logic
- **Navbar**: Created a responsive navigation bar with a **Dark/Light Mode** toggle.
- **Home Component**:
  - Uses `useState` to track the title and content inputs.
  - Dispatches actions to Redux when you click "Create Paste".
- **Paste Component (List)**:
  - Fetches data from Redux using `useSelector`.
  - Maps through the data to display cards.
  - Includes a Search Bar to filter results instantly.
- **ViewPaste Component**:
  - Uses `useParams` to get the ID from the URL.
  - Finds and displays the specific paste content.



### 6. Professional Polish (The "Wow" Factor)
- **Theme Context**: Built a custom `ThemeContext` to handle Dark Mode switching globally.
- **Glassmorphism**: Added subtle transparencies and blurs for a premium feel.
- **Responsiveness**: Ensured the app looks great on mobile and desktop using Tailwind's responsive prefixes (e.g., `lg:px-0`).



## 🛠️ How to Run
1. Install dependencies: `npm install`
2. Start the server: `npm run dev`
3. Open `http://localhost:5173`



## 📝 Features
- ✨ **Create, Read, Update, Delete (CRUD)**
- 🌓 **Dark/Light Mode**
- 💾 **Local Storage Persistence**
- 🔍 **Search Functionality**
- 📋 **Copy to Clipboard**
- 📱 **Fully Responsive**
