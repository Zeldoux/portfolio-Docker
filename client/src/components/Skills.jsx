// src/components/Skills.js

import React from 'react';
import skillsData from '../data/Skills.json'; // Importing skills data from a JSON file
import SkillPieChart from './SkillPieChart'; // Importing the SkillPieChart component

/**
 * Component: Skills
 * Displays a section showcasing skills categorized into different groups.
 * Each category is visualized using a pie chart.
 */
function Skills() {
  return (
    <section className="skills section-container right">
      <h2 className="title-banner">Compétences</h2> {/* Section title */}

      {/* Container for pie charts, dynamically rendering one chart per skill category */}
      <div className="pie-chart-container">
        {skillsData.map((category) => (
          <SkillPieChart 
            key={category.category} // Unique key for each category
            category={category} // Passing category data as a prop to SkillPieChart
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;
