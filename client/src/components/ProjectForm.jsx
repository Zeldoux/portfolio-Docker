// src/components/AddProjectForm.js
import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext'; // Importing authentication context for user token

/**
 * Component: AddProjectForm
 * A form for authenticated users to add a new project to the portfolio.
 * Includes fields for project details, problems, solutions, technologies, and links.
 * very raw for fast add and access
 */
function AddProjectForm({ fetchProjects }) {
  const { token } = useContext(AuthContext); // Retrieve the authentication token from the AuthContext

  // State to manage the new project's details
  const [newProject, setNewProject] = useState({
    title: '',        // Project title
    description: '',  // Detailed project description
    problems: '',     // Challenges faced during the project (multiline input)
    solutions: '',    // Solutions implemented for the challenges (multiline input)
    skills: '',       // Technologies/skills used in the project (comma-separated)
    imageUrl: '',     // Image URLs for the project (comma-separated)
    link: '',         // External link to the project (e.g., GitHub or live demo)
  });

  /**
   * Function: handleAddProject
   * Handles the form submission to add a new project.
   * Transforms input strings into arrays for the backend and sends data via a POST request.
   */
  const handleAddProject = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Parse the input fields into arrays for backend compatibility
    const imageUrlArray = newProject.imageUrl.split(',').map((url) => url.trim());
    const problemsArray = newProject.problems.split('\n').map((item) => item.trim());
    const solutionsArray = newProject.solutions.split('\n').map((item) => item.trim());
    const skillsArray = newProject.skills.split(',').map((item) => item.trim());

    // Send the new project data to the backend
    fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicating JSON data format
        Authorization: `Bearer ${token}`,  // Adding the user's token for authentication
      },
      body: JSON.stringify({
        ...newProject,
        imageUrl: imageUrlArray,
        problems: problemsArray,
        solutions: solutionsArray,
        skills: skillsArray,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add project'); // Handle error responses
        return res.json();
      })
      .then(() => {
        fetchProjects(); // Refresh the project list after successfully adding a new project
        setNewProject({
          title: '',        // Resetting all fields to their initial state
          description: '',
          problems: '',
          solutions: '',
          skills: '',
          imageUrl: '',
          link: '',
        });
      })
      .catch((err) => console.error(err)); // Log any errors during the process
  };

  return (
    <form onSubmit={handleAddProject} className="add-project-form">
      <h3>Add New Project</h3>

      {/* Input field for project title */}
      <input
        type="text"
        placeholder="Title"
        value={newProject.title}
        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
        required
      />

      {/* Textarea for project description */}
      <textarea
        placeholder="Description"
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        required
      />

      {/* Textarea for project problems */}
      <textarea
        placeholder="Problems (one per line)"
        value={newProject.problems}
        onChange={(e) => setNewProject({ ...newProject, problems: e.target.value })}
      />

      {/* Textarea for project solutions */}
      <textarea
        placeholder="Solutions (one per line)"
        value={newProject.solutions}
        onChange={(e) => setNewProject({ ...newProject, solutions: e.target.value })}
      />

      {/* Input field for project technologies/skills */}
      <input
        type="text"
        placeholder="Technologies (comma-separated)"
        value={newProject.skills}
        onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
      />

      {/* Input field for project image URLs */}
      <input
        type="text"
        placeholder="Image URLs (comma-separated)"
        value={newProject.imageUrl}
        onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
      />

      {/* Input field for project external link */}
      <input
        type="text"
        placeholder="Link"
        value={newProject.link}
        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
      />

      {/* Submit button */}
      <button type="submit">Add Project</button>
    </form>
  );
}

export default AddProjectForm;
