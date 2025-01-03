import React from 'react';

/**
 * Component: Modal
 * A reusable modal component for displaying content in an overlay.
 * 
 * Props:
 * - content: The content to display inside the modal.
 * - onClose: A callback function triggered when the modal is closed.
 */
function Modal({ content, onClose }) {
  // If no content is provided, do not render the modal
  if (!content) return null;

  return (
    // Modal overlay to create a dimmed background effect
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal content container */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button for the modal */}
        <button className="modal-close" onClick={onClose}>×</button>
        {/* Modal body to render the passed content */}
        <div className="modal-body">{content}</div>
      </div>
    </div>
  );
}

export default Modal;
