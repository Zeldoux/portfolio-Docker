// src/Pages/ErrorPage.js

import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // React Router components

/**
 * Component: ErrorPage
 * 
 * A simple error page to display error messages for unauthorized access or invalid routes.
 * Provides a link to navigate back to the main page.
 */
const ErrorPage = () => {
  const location = useLocation(); // Access the current location and its state
  const errorMessage = location.state?.message || "An unexpected error occurred."; // Default error message

  return (
    <div className="error-page">
      <h1>Oops! il y a eu un soucis !</h1>

      {/* Display the error message */}
      <div className="error-message">
        <p>{errorMessage}</p>
      </div>

      {/* Link to navigate back to the main page */}
      <Link to="/" className="back-link">
        Retourner a la page d'acceuil
      </Link>
    </div>
  );
};

export default ErrorPage;
