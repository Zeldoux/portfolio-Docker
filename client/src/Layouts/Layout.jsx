// src/components/Layout.jsx

import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext'; // Import authentication context
import ParticleBackground from '../components/ParticleBackground'; // Background particle animation
import Modal from '../components/Modal'; // Modal component
import Header from '../components/Header'; // Header component with navigation
import Footer from '../components/Footer'; // Footer component
import LoginForm from '../components/LoginForm'; // Login form for authentication
import '../styles/Layout.css'; // Import styles for layout
import MobileButton from '../components/MobileButton'; // mobile button for mobile scroll back to top button functionality
/**
 * Component: Layout
 * 
 * The main layout component that wraps the application with a consistent structure.
 * Includes the particle background, header, footer, and handles modal logic for user login.
 * 
 * Props:
 * - `children`: The child components to render within the layout (e.g., pages, sections).
 */
const Layout = ({ children }) => {
  // Access authentication context values
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  // State to manage the visibility of the login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  /**
   * Handles the login process by updating the token in context
   * and closing the login modal.
   * 
   * @param {string} newToken - The authentication token received on login.
   */
  const handleLogin = (newToken) => {
    login(newToken); // Update context with the new token
    setShowLoginModal(false); // Close the login modal
  };

  /**
   * Handles the logout process by clearing the authentication token in context.
   */
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Particle animation background */}
      <ParticleBackground />

      {/* Header with navigation links and login/logout actions */}
      <Header
        isLoggedIn={isLoggedIn} // Pass login status to the header
        onLoginClick={() => setShowLoginModal(true)} // Show login modal on click
        onLogoutClick={handleLogout} // Handle logout on click
      />

      {/* Main content area */}
      <main className="main-page">
        {children} {/* Render child components */}
      </main>
      {/* Mobile Button */}
      <MobileButton />
      {/* Footer section */}
      <Footer />

      {/* Conditional rendering of the login modal */}
      {showLoginModal && (
        <Modal
          content={<LoginForm onLogin={handleLogin} />} // Pass the login handler to the form
          onClose={() => setShowLoginModal(false)} // Close the modal on request
        />
      )}
    </>
  );
};

export default Layout;
