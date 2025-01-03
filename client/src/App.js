// src/App.js

import AppRouter from './Router/AppRouter'; // Importing the main router for application navigation

/**
 * Component: App
 * 
 * This is the root component of the application, serving as the entry point.
 * It wraps the `AppRouter` to render the entire app's navigation and content.
 */
function App() {
  return (
    <div className="app" role="application"> {/* Wrapper for the entire application */}
      <AppRouter /> {/* Main application routing system */}
    </div>
  );
}

export default App;
