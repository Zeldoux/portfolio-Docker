// src/components/Header.js
import React from 'react';
import '../styles/Header.css'; // Import styles for the Header component
import LogoSVG from '../Assets/LogoSVG'; // Import the SVG logo component

/**
 * Component: Header
 * Displays the navigation bar for the portfolio website.
 *
 * Props:
 * - isLoggedIn (boolean): Indicates if the user is logged in or not.
 * - onLoginClick (function): Callback function triggered when the login button is clicked.
 * - onLogoutClick (function): Callback function triggered when the logout button is clicked.
 */
const Header = ({ isLoggedIn, onLoginClick, onLogoutClick }) => (
  <header className="header">
    <nav>
      {/* Logo section */}
      <div className="header-logo-container">
        <LogoSVG className="header-logo" /> {/* Logo rendered using the imported SVG component */}
      </div>

      {/* Navigation links for different sections of the portfolio */}
      <ul className="nav-links">
        <li><a href="#profile">Profil</a></li>
        <li><a href="#skills">Compétences</a></li>
        <li><a href="#projects">Projets</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Uncomment the section below to add login/logout functionality */}
      {/* 
      <ul className="auth-links">
        {isLoggedIn ? (
          <li>
            <button onClick={onLogoutClick}>Logout</button>
          </li>
        ) : (
          <li>
            <button onClick={onLoginClick}>Login</button>
          </li>
        )}
      </ul>
      */}
    </nav>
  </header>
);

export default Header;
