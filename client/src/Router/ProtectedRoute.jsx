// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom'; // React Router component for navigation

/**
 * Component: ProtectedRoute
 * 
 * A higher-order component that restricts access to routes based on authentication.
 * Redirects unauthorized users to the error page with a custom message.
 * 
 * Props:
 * - `children`: The content to render if access is allowed.
 * - `token`: The authentication token to validate access.
 * - `message`: A custom error message to display on the error page.
 */
const ProtectedRoute = ({ children, token, message }) => {
    return token 
        ? children // Render the children if the token is valid
        : <Navigate 
            to="/error" // Redirect to error page if not authorized
            replace // Replace the current history entry
            state={{ message }} // Pass the custom error message to the error page
          />;
};

export default ProtectedRoute;
