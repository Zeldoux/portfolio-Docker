import React from 'react';

/**
 * Component: Card
 * Represents a single project card, displaying its image (if available) and title.
 * Allows clicking to trigger a callback with the project data.
 *
 * @param {Object} project - The project data to display (should include imageUrl and title).
 * @param {Function} onClick - The callback to execute when the card is clicked.
 */
function Card({ project, onClick }) {
  // Check if the project has an imageUrl and use the first one if available; otherwise, set to null
  const imageUrl = project.imageUrl && project.imageUrl.length > 0 ? project.imageUrl[0] : null;

  return (
    <div
      className="card"
      onClick={() => onClick(project)} // Trigger the onClick callback with the project data when the card is clicked
    >
      {/* Display the project image if available, otherwise show a placeholder message */}
      {imageUrl ? (
        <img
          src={imageUrl} // URL of the project's first image
          alt={project.title} // Accessible description using the project title
          className="card-image" // Styling class for the image
        />
      ) : (
        <div className="no-image">Pas d'image disponible</div> // Placeholder when no image is available
      )}
      {/* Display the project's title */}
      <h3 className="card-title">{project.title}</h3>
    </div>
  );
}

export default Card;