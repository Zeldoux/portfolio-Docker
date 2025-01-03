// src/contexts/AuthContext.js

import React, { createContext, useState } from 'react';

// Create the authentication context
const AuthContext = createContext();

/**
 * AuthProvider: A context provider for managing authentication state.
 * 
 * Props:
 * - `children`: The components wrapped by this provider will have access to the authentication context.
 * 
 * Provides:
 * - `token`: The current authentication token (null if not authenticated).
 * - `login`: Function to set the token and save it in localStorage.
 * - `logout`: Function to remove the token from state and localStorage.
 * - `isLoggedIn`: Boolean indicating whether the user is logged in.
 */
export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState(() => {
    // Retrieve the token from localStorage if it exists
    return localStorage.getItem('token') || null;
  });

  /**
   * Logs in the user by saving the token to localStorage and state.
   * @param {string} newToken - The authentication token to store.
   */
  const login = (newToken) => {
    localStorage.setItem('token', newToken); // Save token to localStorage
    setToken(newToken); // Update state
  };

  /**
   * Logs out the user by clearing the token from localStorage and state.
   */
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Clear state
  };

  return (
    // Provide authentication context to all child components
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
