// src/components/Gallery.js
import React, { useState } from 'react';

/**
 * Component: Gallery
 * Displays a carousel-like image gallery with navigation arrows and image indexing.
 * It allows users to cycle through multiple images.
 *
 * Props:
 * - images (array): Array of image URLs to be displayed in the gallery.
 */
function Gallery({ images }) {
  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Return nothing if there are no images to display
  if (!images || images.length === 0) return null;

  // Total number of images in the gallery
  const totalImages = images.length;

  /**
   * Navigate to the previous image.
   * Loops back to the last image if currently at the first image.
   */
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + totalImages) % totalImages
    );
  };

  /**
   * Navigate to the next image.
   * Loops back to the first image if currently at the last image.
   */
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % totalImages
    );
  };

  return (
    <div className="gallery">
      {/* Left navigation arrow (only displayed if there are multiple images) */}
      {totalImages > 1 && (
        <button className="arrow left-arrow" onClick={prevImage}>
          &#8592; {/* Unicode for left arrow */}
        </button>
      )}
      
      {/* Image display */}
      <div className="gallery-image-wrapper">
        <img
          src={images[currentImageIndex]} // Current image URL
          alt={`Présentation du projet ${currentImageIndex + 1}`} // Accessible alt text with index
          className="gallery-image"
        />
      </div>
      
      {/* Right navigation arrow (only displayed if there are multiple images) */}
      {totalImages > 1 && (
        <button className="arrow right-arrow" onClick={nextImage}>
          &#8594; {/* Unicode for right arrow */}
        </button>
      )}
      
      {/* Image index display (e.g., "1 / 5") */}
      {totalImages > 1 && (
        <div className="image-index">
          {currentImageIndex + 1} / {totalImages}
        </div>
      )}
    </div>
  );
}

export default Gallery;
