// src/components/Projects.js
import React from 'react';
import ProjectList from './ProjectsList'; // Importing the ProjectList component

/**
 * Component: Projects
 * Displays a section containing a list of projects. 
 * Delegates the rendering of the project list to the `ProjectList` component.
 * 
 * @param {Array} projects - Array of project objects to display.
 */
function Projects({ projects }) {
  return (
    <section className="section-container">
      {/* Section title */}
      <h2 className="title-banner">Mes Projets</h2>

      {/* Project list component for rendering projects */}
      <ProjectList projects={projects} />
    </section>
  );
}

export default Projects;
