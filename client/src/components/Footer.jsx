// src/components/Footer.js
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Importing FontAwesome icons
import '../styles/Footer.css'; // Importing CSS for the Footer component

/**
 * Component: Footer
 * Displays a footer section with links to social media profiles and an email contact link.
 * Uses accessible attributes to ensure a better user experience.
 */
const Footer = () => {
  return (
    <footer className="footer">
      {/* Container for footer content */}
      <div className="footer-content">
        {/* LinkedIn profile link */}
        <a 
          href="https://www.linkedin.com/in/yoannsousa/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Visitez la page LinkedIn de Yoann Sousa"
        >
          <FaLinkedin /> {/* LinkedIn icon */}
        </a>

        {/* GitHub profile link */}
        <a 
          href="https://github.com/Zeldoux" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Visitez la page GitHub de Yoann Sousa"
        >
          <FaGithub /> {/* GitHub icon */}
        </a>

        {/* Email link */}
        <a 
          href="mailto:contacter-moi@ysportfolio.fr" 
          aria-label="Envoyer un email à Yoann Sousa"
        >
          <FaEnvelope /> {/* Email icon */}
        </a>
      </div>
    </footer>
  );
};

export default Footer;