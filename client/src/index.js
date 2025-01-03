// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing the new React DOM API for React 18+
import reportWebVitals from './reportWebVitals'; // Performance monitoring tool
import AppRouter from './Router/AppRouter'; // Main router for application navigation
import { AuthProvider } from './Context/AuthContext'; // Authentication context provider for managing auth state
import './styles/main.css'; // Main stylesheet for global styles

// Get the root element from the HTML file where the app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Render the application
 * 
 * Wrapping the app in React.StrictMode for development warnings and the AuthProvider
 * to manage authentication state across the application.
 */
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Provide authentication context to the entire app */}
      <AppRouter /> {/* Main application routing */}
    </AuthProvider>
  </React.StrictMode>
);

// Performance monitoring (optional)
reportWebVitals();
