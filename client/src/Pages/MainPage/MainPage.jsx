// src/Pages/MainPage.js

import React, { useState, useEffect } from 'react';
import TypingEffect from '../../components/TypingEffect'; // Component for typing animation
import Profile from '../../components/Profile'; // Profile section
import Projects from '../../components/Projects'; // Projects section
import Skills from '../../components/Skills'; // Skills section
import Contact from '../../components/Contact'; // Contact section

import '../../styles/Section.css'; // Styles for the sections

/**
 * Component: MainPage
 * 
 * The main landing page of the portfolio, displaying various sections like profile, skills, projects, and contact.
 * Features a typing effect introduction and dynamically loads projects from the backend.
 */
const MainPage = () => {
  const [projects, setProjects] = useState([]); // State to store fetched projects

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch project data from the backend
  const fetchProjects = () => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err)); // Log errors to the console
  };

  return (
    <>
      {/* Typing effect at the top of the page */}
      <article className="typing-container">
        <h1>
          <TypingEffect
            phrases={[
              "Bienvenue sur le Portfolio de Yoann Sousa", // Welcome message
              "Développeur web", // Profession
              "Passionné de programmation", // Passion
            ]}
            typingSpeed={80}  // Speed for typing animation
            deleteSpeed={50}  // Speed for deleting text
            pause={500}       // Pause between sentences
          />
        </h1>
      </article>

      {/* Profile Section */}
      <article id="profile" className="article-container">
        <Profile />
      </article>

      {/* Skills Section */}
      <article id="skills" className="article-container">
        <Skills />
      </article>

      {/* Projects Section */}
      <article id="projects" className="article-container">
        <Projects projects={projects} />
      </article>

      {/* Contact Section */}
      <article id="contact" className="article-container">
        <Contact />
      </article>
    </>
  );
};

export default MainPage;
