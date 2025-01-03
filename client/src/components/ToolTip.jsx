// src/components/Tooltip.jsx

import React from 'react';

/**
 * Component: Tooltip
 * Displays a custom tooltip with skill details (logo, name, description) at a specified position.
 * The tooltip is only visible when `tooltipData.visible` is true.
 *
 * Props:
 * - `tooltipData` (object): Contains the visibility flag, position coordinates, and skill details.
 *   - `visible` (boolean): Determines if the tooltip should be displayed.
 *   - `x` (number): X-coordinate for positioning the tooltip.
 *   - `y` (number): Y-coordinate for positioning the tooltip.
 *   - `skill` (object): The skill data to display, including:
 *     - `logo` (string): URL of the skill's logo.
 *     - `name` (string): Name of the skill.
 *     - `description` (string): Description of the skill.
 */
function Tooltip({ tooltipData }) {
  // Return nothing if tooltipData is invalid or tooltip is not visible
  if (!tooltipData || !tooltipData.visible) {
    return null;
  }

  const { x, y, skill } = tooltipData; // Destructure necessary data from tooltipData

  return (
    // Tooltip container positioned absolutely based on the provided coordinates
    <div
      className="custom-tooltip"
      style={{
        position: 'absolute', // Tooltip is positioned absolutely
        left: x, // Horizontal position
        top: y, // Vertical position
        pointerEvents: 'none', // Prevent tooltip from interfering with pointer events
        transform: 'translate(-50%, -110%)', // Center the tooltip above the cursor
        zIndex: 9999, // Ensure the tooltip is above other elements
      }}
    >
      <div className="tooltip-content">
        {/* Display the skill's logo */}
        <img 
          src={skill.logo} 
          alt={skill.name} 
          className="tooltip-logo" 
        />
        <div>
          {/* Display the skill's name and description */}
          <strong>{skill.name}</strong>
          <p>{skill.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
