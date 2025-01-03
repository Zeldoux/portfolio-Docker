// src/components/SkillPieChart.js

import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register all necessary components for Chart.js
ChartJS.register(...registerables);

/**
 * Component: SkillPieChart
 * Displays a pie chart for a skill category, with custom tooltips and skill logos drawn in each chart slice.
 * 
 * @param {Object} category - Skill category data containing skills and their associated details.
 */
function SkillPieChart({ category }) {
  // Reference for the chart instance
  const chartRef = useRef(null);

  // Cleanup effect to remove the tooltip element on component unmount
  useEffect(() => {
    return () => {
      const tooltipEl = document.getElementById('chartjs-tooltip');
      if (tooltipEl) {
        tooltipEl.remove();
      }
    };
  }, []);

  // Object to cache loaded skill logos
  const loadedImages = {};

  // Data configuration for the pie chart
  const pieData = {
    labels: category.skills.map((skill) => skill.name), // Labels are the skill names
    datasets: [
      {
        label: category.category, // Dataset label is the category name
        data: category.skills.map((skill) =>
          skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 75 : 50
        ), // Skill levels mapped to numerical values
        backgroundColor: category.skills.map(() => 'rgba(30, 30, 30, 0.3)'), // Background colors
        hoverBackgroundColor: category.skills.map(() => 'rgba(50, 50, 50, 0.8)'), // Hover colors
        borderColor: 'rgba(255, 255, 255, 0.8)', // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  /**
   * Function: externalTooltipHandler
   * Handles the rendering of custom tooltips for the pie chart.
   * 
   * @param {Object} context - The Chart.js context object containing chart and tooltip details.
   */
  function externalTooltipHandler(context) {
    const { chart, tooltip } = context;

    let tooltipEl = document.getElementById('chartjs-tooltip');

    // Create the tooltip element if it doesn't exist
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = '<div class="tooltip-content"></div>';
      document.body.appendChild(tooltipEl);
    }

    // Hide the tooltip if it's not visible
    if (!tooltip || tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set the tooltip content if data exists
    if (tooltip.body && tooltip.dataPoints && tooltip.dataPoints.length > 0) {
      const index = tooltip.dataPoints[0].dataIndex;

      if (category.skills && category.skills[index]) {
        const skill = category.skills[index];

        const tooltipContent = tooltipEl.querySelector('.tooltip-content');
        tooltipContent.innerHTML = `
          <img src="${skill.logo}" alt="${skill.name}" class="tooltip-logo">
          <div>
            <strong>${skill.name}</strong>
            <p>${skill.description}</p>
          </div>
        `;
      } else {
        tooltipEl.style.opacity = 0; // Hide if skill is not found
        return;
      }
    } else {
      tooltipEl.style.opacity = 0; // Hide if no tooltip data
      return;
    }

    // Position the tooltip
    const position = chart.canvas.getBoundingClientRect();
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = position.left + window.pageXOffset + tooltip.caretX + 'px';
    tooltipEl.style.top = position.top + window.pageYOffset + tooltip.caretY + 'px';
    tooltipEl.style.pointerEvents = 'none'; // Prevent interactions
  }

  // Configuration for the pie chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 15 },
    plugins: {
      legend: { display: false }, // Disable legend
      tooltip: {
        enabled: false, // Disable default tooltip
        external: externalTooltipHandler, // Use custom tooltip handler
      },
    },
    hoverOffset: 20, // Offset for hover effect
  };

  // Plugin to draw skill logos inside chart slices
  const drawLogosPlugin = {
    id: 'drawLogos',
    afterDatasetDraw(chart) {
      const { ctx } = chart;
      const dataset = chart.data.datasets[0];

      dataset.data.forEach((data, index) => {
        const meta = chart.getDatasetMeta(0).data[index];

        if (category.skills && category.skills[index]) {
          const skill = category.skills[index];

          // Load or retrieve cached image for skill logo
          let skillLogo = loadedImages[skill.logo];
          if (!skillLogo) {
            skillLogo = new Image();
            skillLogo.src = skill.logo;

            skillLogo.onload = () => {
              loadedImages[skill.logo] = skillLogo;
              if (chart && chart.ctx) {
                chart.update();
              }
            };
            loadedImages[skill.logo] = skillLogo; // Cache image
          }

          // Draw image if it's loaded
          if (skillLogo.complete) {
            const { x, y } = meta.tooltipPosition();
            const logoSize = 35;

            ctx.drawImage(
              skillLogo,
              x - logoSize / 2,
              y - logoSize / 2,
              logoSize,
              logoSize
            );
          }
        }
      });
    },
  };

  return (
    <div className="category-container">
      <h3 className="category-title">{category.category}</h3>
      <div className="pie-chart-wrapper" style={{ position: 'relative' }}>
        <Pie
          ref={chartRef}
          data={pieData}
          options={pieOptions}
          plugins={[drawLogosPlugin]}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}

export default SkillPieChart;
