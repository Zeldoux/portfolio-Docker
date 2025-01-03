// src/components/ProjectList.js
import React, { useState } from 'react';
import Card from './Card'; // Component for rendering individual project cards
import Modal from './Modal'; // Component for displaying a modal with detailed project information
import Gallery from './Gallery'; // Component for rendering an image gallery
import SkillData from '../data/Skills.json'; // Importing skills data for logo mapping

/**
 * Component: ProjectList
 * Displays a list of projects as cards. 
 * Each card can be clicked to display detailed information in a modal.
 * 
 * @param {Array} projects - Array of project objects to be displayed.
 */
function ProjectList({ projects }) {
  // State for managing the currently displayed modal content
  const [modalContent, setModalContent] = useState(null);

  /**
   * Function: getSkillLogo
   * Retrieves the logo URL for a given skill name by searching through SkillData.
   * 
   * @param {string} skillName - The name of the skill to search for.
   * @returns {string|null} - The URL of the skill's logo, or null if not found.
   */
  const getSkillLogo = (skillName) => {
    for (const category of SkillData) {
      const skill = category.skills.find((s) => s.name.toLowerCase() === skillName.toLowerCase());
      if (skill) return skill.logo;
    }
    return null;
  };

  /**
   * Function: handleCardClick
   * Handles clicks on project cards. Opens a modal with detailed project information.
   * 
   * @param {Object} project - The project object associated with the clicked card.
   */
  const handleCardClick = (project) => {
    setModalContent(
      <>
        {/* Detailed project information */}
        <div className="project-info">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Lien GitHub vers le Projet
            </a>
          )}
          <h2>{project.title}</h2>
          <p>{project.description}</p>

          {/* Problems encountered */}
          <h3>Problématiques rencontrées</h3>
          <ul>
            {project.problems.map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>

          {/* Solutions provided */}
          <h3>Solutions apportées</h3>
          <ul>
            {project.solutions.map((solution, index) => (
              <li key={index}>{solution}</li>
            ))}
          </ul>

          {/* Skills developed */}
          <h3>Compétences développées</h3>
          <div className="skills-icons">
            {project.skills.map((skill, index) => {
              const logo = getSkillLogo(skill); // Retrieve logo for the skill
              return logo ? (
                <img key={index} src={logo} alt={skill} title={skill} />
              ) : (
                <span key={index}>{skill}</span> // Display skill name if no logo is found
              );
            })}
          </div>
        </div>

        {/* Image gallery for project */}
        {project.imageUrl && project.imageUrl.length > 0 && (
          <Gallery images={project.imageUrl} />
        )}
      </>
    );
  };

  /**
   * Function: closeModal
   * Closes the modal by clearing its content.
   */
  const closeModal = () => setModalContent(null);

  return (
    <div className="project-list">
      {/* Render a card for each project */}
      {projects.map((project) => (
        <Card key={project._id} project={project} onClick={() => handleCardClick(project)} />
      ))}

      {/* Render the modal if there is content */}
      {modalContent && <Modal content={modalContent} onClose={closeModal} />}
    </div>
  );
}

export default ProjectList;
